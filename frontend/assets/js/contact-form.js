document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const responseMessage = document.createElement("p");
    responseMessage.style.marginTop = "10px";
    form.appendChild(responseMessage);
  
    let formChanged = false;

    // Detect form changes
    form.addEventListener("input", () => {
        formChanged = true;
    });

    // Confirm before leaving if the form is not submitted
    window.addEventListener("beforeunload", (event) => {
        if (formChanged) {
            const message = "You have not yet submitted the form! Are you sure you want to leave?";
            event.preventDefault();
            event.returnValue = message;
            return message;
        }
    });

    // Format phone number as user types
    document.getElementById("contact-phone").addEventListener("input", function () {
        formatPhoneNumber(this);
    });

    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, ""); // Remove all non-numeric characters

        if (value.length > 6) {
            input.value = value.replace(/(\\d{3})(\\d{3})(\\d{0,4})/, "$1-$2-$3").trim();
        } else if (value.length > 3) {
            input.value = value.replace(/(\\d{3})(\\d{0,3})/, "$1-$2").trim();
        } else {
            input.value = value; // Show numbers as entered
        }
    }

    // Handle form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById("contact-name").value.trim();
        const phone = document.getElementById("contact-phone").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        // Validate inputs
        if (!name || !phone || !email || !message) {
            responseMessage.textContent = "Please fill in all fields.";
            responseMessage.style.color = "red";
            return;
        }

        try {
            const response = await fetch("https://vertexcoding.com/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, email, message }),
            });

            const result = await response.json();
            responseMessage.textContent = result.success || result.error;
            responseMessage.style.color = response.ok ? "green" : "red";

            if (response.ok) {
                form.reset();
                formChanged = false;
            }
        } catch (error) {
            responseMessage.textContent = "Error sending message. Please try again.";
            responseMessage.style.color = "red";
        }
    });
});
