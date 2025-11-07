document.addEventListener("DOMContentLoaded", () => {
    // Create modal HTML and insert into body
    const modalHTML = `
    <div id="modalOverlay"
         onclick="overlayClick(event)"
         style="
           position: fixed;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           background: rgba(0, 0, 0, 0.5);
           opacity: 0;
           visibility: hidden;
           justify-content: center;
           align-items: center;
           z-index: 1000;
           overflow: hidden;
           transition: opacity 0.3s ease;
         ">
      <div id="modalContent"
           onclick="event.stopPropagation()"
           style="
             width: 80%;
             height: 90%;
             border-radius: 25px;
             overflow: visible;
             box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
             background-color: white;
             position: relative;
             z-index: 2;
             display: flex;
             flex-direction: column;
           ">
        <button class="closeBtn"
                onclick="closeModal()"
                style="
                  position: absolute;
                  top: -30px;
                  right: -30px;
                  font-size: 20px;
                  background: white;
                  color: red;
                  border: none;
                  border-radius: 50%;
                  width: 35px;
                  height: 35px;
                  cursor: pointer;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                  z-index: 3;
                ">×</button>
        <iframe src=""
                style="
                  width: 100%;
                  height: 100%;
                  border: none;
                  border-radius: 3%;
                  flex-grow: 1;
                "></iframe>
      </div>
    </div>
  `;
  
  
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const styleTag = document.createElement('style');
styleTag.textContent = `
#modalOverlay.show {
    opacity: 1 !important;
    visibility: visible !important;
  }
  @media (max-width: 600px) {
    #modalContent {
      width: 95% !important;
      height: 90% !important;
      border-radius: 15px !important;
    }

    #modalContent iframe {
      border-radius: 10px !important;
    }

    .closeBtn {
      top: -10px !important;
      right: -10px !important;
      width: 30px !important;
      height: 30px !important;
      font-size: 16px !important;
    }
      #modalOverlay.show {
    opacity: 1 !important;
    visibility: visible !important;
  }
  }
`;
document.head.appendChild(styleTag);

  });
  
  // Modal control functions
  function openModal() {
    const iframe = document.querySelector('#modalContent iframe');
    const overlay = document.getElementById('modalOverlay');
    if (iframe) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const timestamp = new Date().getTime();
      
        if (isMobile) {
          // Load mobile-specific HTML file
          iframe.src = `./mobile-co.html?t=${timestamp}`;
        } else {
          // Load desktop-specific HTML file
          iframe.src = `./consultation.html?t=${timestamp}`;
        }
      }
    document.getElementById('modalOverlay').style.display = 'flex';
    overlay.classList.add('show');
  }
  
  function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('show');
  }
  
  function overlayClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
  // Optional: Expose to global scope
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.overlayClick = overlayClick;
  