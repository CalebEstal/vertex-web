const express = require('express');
const router = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const brevo = require('@getbrevo/brevo'); // Import Brevo SDK

const client = new SecretManagerServiceClient();
let defaultClient = brevo.ApiClient.instance;
let apiInstance = new brevo.TransactionalEmailsApi();

// Function to retrieve API key from Google Cloud Secret Manager
async function getBrevoApiKey() {
    try {
        const [version] = await client.accessSecretVersion({
            name: 'projects/vertex-coding-website/secrets/brevo-api/versions/latest',
        });

        const apiKey = version.payload.data.toString('utf8');

        // Assign API key using `ApiClient.instance`
        let apiKeyInstance = defaultClient.authentications['api-key'];
        apiKeyInstance.apiKey = apiKey;
        
        console.log("Brevo API key retrieved successfully.");
    } catch (error) {
        console.error("Error retrieving Brevo API key:", error);
    }
}

// Fetch the API key **before handling any requests**
getBrevoApiKey();

// Contact Form Route
router.post('/', async (req, res) => {
    try {
        // Extract and validate form data
        const { name, phone, email, message } = req.body;

        if (!name || !phone || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Prepare email parameters
        const params = {
            name,
            phone,
            email,
            message
        };

        let sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.subject = "You have recieved a new contact form submission!";
        sendSmtpEmail.sender = { name: "Vertex Coding", email: "contact@vertexcoding.com" };
        sendSmtpEmail.to = [{ email: "elevate@vertexcoding.com", name: "Vertex Coding" }];
        sendSmtpEmail.replyTo = { email, name };
        sendSmtpEmail.templateId = 7; // Ensure this ID matches your Brevo template
        sendSmtpEmail.params = params;

        // Send the email via Brevo
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully:', data);
        res.status(201).json({ success: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

module.exports = router;