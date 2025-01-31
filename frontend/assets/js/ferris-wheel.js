// Check view width and initialize only if conditions are met
function initializeFerrisWheel() {
  if (window.innerWidth >= 768) {
      const radius = window.innerWidth >= 2500 ? 325 : 250; // Adjust radius based on screen width
      const items = document.querySelectorAll('.technology-item');
      const scrollBar = document.querySelector('.scroll-bar');
      const thumb = document.querySelector('.scroll-bar-thumb');
      const totalRotation = 330; // Total degrees of rotation
      const totalSteps = 11; // Number of intervals between items
      const stepSize = 30; // Degrees per step
      let currentRotation = 0; // Current rotation in degrees
      let isDragging = false;
      let startY, startTop;

      // Function to update positions based on rotation
      function updatePositions(rotation) {
          items.forEach((item, index) => {
              const angle = (index * stepSize + rotation - 90) % 360; // Align items on the circle
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              item.style.transform = `translate(${x}px, ${y}px)`;
          });
      }

      // Function to snap to the nearest item
      function snapToNearest() {
          const nearestStep = Math.round(currentRotation / stepSize); // Snap to the nearest step
          currentRotation = Math.max(0, Math.min(nearestStep * stepSize, totalRotation)); // Clamp rotation

          let focusedIndex = 12 - (nearestStep % items.length);

          // Ensure React is selected as the initial position (handle 0 rotation correctly)
          if (currentRotation === 0) {
              focusedIndex = 0; // React should always be selected at rotation 0
          }

          items.forEach((item, index) => {
              const descriptionElement = document.getElementById('focused-description');
              if (index === focusedIndex) {
                  item.classList.add('selected');
                  document.querySelector('.focused-technology img').src = item.querySelector('img').src;
                  descriptionElement.textContent = item.querySelector('.description').textContent; // Update the description dynamically
              } else {
                  item.classList.remove('selected');
              }
          });

          updatePositions(currentRotation);
          updateScrollBar();
      }

      // Update scroll bar thumb position based on rotation
      function updateScrollBar() {
          const thumbPosition = (currentRotation / totalRotation) * (scrollBar.offsetHeight - thumb.offsetHeight); // Adjust thumb position vertically
          thumb.style.top = `${thumbPosition}px`;
      }

      // Handle vertical drag movement
      function handleDrag(clientY) {
          const scrollBarRect = scrollBar.getBoundingClientRect();
          const maxTop = scrollBarRect.height - thumb.offsetHeight;
          let newTop = clientY - scrollBarRect.top;

          // Constrain thumb within the scroll bar
          newTop = Math.max(0, Math.min(newTop, maxTop));

          // Calculate rotation based on thumb position
          const newRotation = (newTop / maxTop) * totalRotation;
          currentRotation = newRotation;

          updatePositions(currentRotation);
          updateScrollBar();
      }

      // Mouse events for the scroll bar thumb
      thumb.addEventListener('mousedown', (e) => {
          isDragging = true;
          startY = e.clientY;
          startTop = parseInt(window.getComputedStyle(thumb).top, 10);
          e.preventDefault();
      });

      document.addEventListener('mouseup', () => {
          if (isDragging) {
              isDragging = false;
              snapToNearest(); // Snap to the nearest item
          }
      });

      document.addEventListener('mousemove', (e) => {
          if (isDragging) {
              handleDrag(e.clientY);
          }
      });

      // Touch events for the scroll bar thumb
      thumb.addEventListener('touchstart', (e) => {
          isDragging = true;
          startY = e.touches[0].clientY;
          startTop = parseInt(window.getComputedStyle(thumb).top, 10);
          e.preventDefault();
      });

      document.addEventListener('touchend', () => {
          if (isDragging) {
              isDragging = false;
              snapToNearest(); // Snap to the nearest item
          }
      });

      document.addEventListener('touchmove', (e) => {
          if (isDragging) {
              handleDrag(e.touches[0].clientY);
          }
      });

      // Initialize positions
      updatePositions(currentRotation);
      updateScrollBar();
  }
}

// Initialize ferris wheel if the view width is greater than 768px
if (window.innerWidth >= 768) {
  initializeFerrisWheel();
}

// Recheck on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
      initializeFerrisWheel();
  }
});
