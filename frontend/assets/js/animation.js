document.addEventListener("DOMContentLoaded", function () {
  const hasVisited = sessionStorage.getItem("hasVisited");

  if (!hasVisited) {
      // First session: Show the animation
      const animationContainer = document.querySelector(".animation-container");
      animationContainer.style.display = "flex"; // Make it visible

      setTimeout(function () {
          animationContainer.style.display = "none"; // Hide animation
          document.querySelector(".main-content").style.display = "block"; // Show main content
      }, 1750); // Match animation duration

      // Store a flag in sessionStorage
      sessionStorage.setItem("hasVisited", "true");
  } else {
      // Returning session: Skip animation and show main content immediately
      document.querySelector(".main-content").style.display = "block";
  }
});