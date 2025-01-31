document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");
    let hasScrolled = false; // Tracks if initial scroll occurred
  
    const handleScroll = () => {
      const scrollTop = window.scrollY;
  
      // Reset to the loaded style when back at the very top
      if (scrollTop === 0) {
        hasScrolled = false; // Reset scroll tracking
        header.classList.remove("scrolled", "dark", "light");
      }
  
      // Handle the first scroll transition
      if (scrollTop > 0 && !hasScrolled) {
        hasScrolled = true;
        header.classList.add("scrolled", "dark");
      }
  
      // Transition from dark to light after initial scroll
      if (hasScrolled && scrollTop > 50) {
        header.classList.remove("dark");
        header.classList.add("light");
      }
    };
  
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
  });
  
const menuBtn = document.getElementById('menu-btn');
const menuModal = document.getElementById('menu-modal');
const closeBtn = document.getElementById('close-btn');

// Select all links from both the modal and header navigation
const menuLinks = document.querySelectorAll('.modal-nav ul li a, .nav ul li a, .cta-button');

// Open modal on menu button click
menuBtn.addEventListener('click', () => {
    menuModal.classList.add('open');
});

// Close modal on close button click
closeBtn.addEventListener('click', () => {
    menuModal.classList.remove('open');
});

// Smooth scrolling for all internal links
menuLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor jump

        const targetId = this.getAttribute('href')?.substring(1); // Extract target section ID safely
        const targetElement = document.getElementById(targetId);
        const headerHeight = document.querySelector('.header').offsetHeight; // Get sticky header height
        const offset = headerHeight + 20; // Adjusted offset (header height + 20px extra spacing)

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: targetPosition - offset, // Scroll to adjusted position
                behavior: 'smooth' // Smooth scrolling effect
            });

            // Close the modal if the link is inside it
            if (menuModal.classList.contains('open')) {
                menuModal.classList.remove('open');
            }
        }
    });
});