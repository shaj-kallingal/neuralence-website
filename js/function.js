(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	/* Preloader Effect */
	$window.on('load', function(){
		setHeaderHeight();
		$(".preloader").fadeOut(600);
	});
	
	/* Sticky Header */
	$window.on('resize', function(){
		setHeaderHeight();
	});

	function setHeaderHeight(){
		$("header.main-header").css("height", $('header .header-sticky').outerHeight());
	}	
	
	$(window).on("scroll", function() {
		var fromTop = $(window).scrollTop();
		setHeaderHeight();
		var headerHeight = $('header .header-sticky').outerHeight()
		$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
		$("header .header-sticky").toggleClass("active", (fromTop > 600));
	});

	/* Slick Menu JS */
	$('#menu').slicknav({
		label : '',
		prependTo : '.responsive-menu'
	});


	if($("a[href='#top']").length){
		$("a[href='#top']").click(function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				768:{
				  	slidesPerView: 2,
				},
				991:{
				  	slidesPerView: 3,
				}
			}
		});
	}

	/* Hero Slider JS */
	const hero_slider = new Swiper('.hero-slider .swiper', {
		slidesPerView : 1,
		speed: 1000,
		spaceBetween: 10,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation */
	if ($('.text-anime-style-1').length) {
		let staggerAmount 	= 0.05,
			translateXValue = 0,
			delayValue 		= 0.5,
		   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.words, {
				duration: 1,
				delay: delayValue,
				x: 20,
				autoAlpha: 0,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
				});
		});		
	}
	
	if ($('.text-anime-style-2').length) {				
		let	 staggerAmount 		= 0.05,
			 translateXValue	= 20,
			 delayValue 		= 0.5,
			 easeType 			= "power2.out",
			 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%"},
				});
		});		
	}
	
	if ($('.text-anime-style-3').length) {		
		let	animatedTextElements = document.querySelectorAll('.text-anime-style-3');
		 const faqsSection = document.querySelector('.service-faqs');
  if (faqsSection) {
    faqsSection.innerHTML = faqsSection.innerHTML.replace(
      /\bFrequently\s+asked\s+question(?!s)\b/gi,
      'Frequently <br> asked questions'
    );
  }

  

  // Run safely across the page



  // Select all service items
  document.querySelectorAll('.service-item').forEach(item => {
    const link = item.querySelector('a[href]');
    if (link) {
      const url = link.getAttribute('href');
      
      // Make entire div clickable
      item.style.cursor = 'pointer';
      item.addEventListener('click', (e) => {
        // Prevent double navigation if arrow is clicked
        if (!e.target.closest('a')) {
          window.location.href = url;
        }
      });
    }
  });
		
		 animatedTextElements.forEach((element) => {
			//Reset if needed
			if (element.animation) {
				element.animation.progress(1).kill();
				element.split.revert();
			}

			element.split = new SplitText(element, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});
			gsap.set(element, { perspective: 400 });

			gsap.set(element.split.chars, {
				opacity: 0,
				x: "50",
			});

			element.animation = gsap.to(element.split.chars, {
				scrollTrigger: { trigger: element,	start: "top 90%" },
				x: "0",
				y: "0",
				rotateX: "0",
				opacity: 1,
				duration: 1,
				ease: Back.easeOut,
				stagger: 0.02,
			});
		});		
	}

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	
document.addEventListener('DOMContentLoaded', function() {
  let currentPath = window.location.pathname.toLowerCase();

  // Handle root as index.html
  if (currentPath === '/' || currentPath === '') {
    currentPath = '/index.html';
  }

  const navLinks = document.querySelectorAll('.main-menu .navbar-nav .nav-item .nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href').toLowerCase();

    // Convert relative href to a comparable pattern
    const hrefName = href.replace('.html', '').replace('/', '');

    // Match logic:
    // 1. Exact filename match (index.html)
    // 2. Path starts with that section (e.g. /services/, /solutions/)
    const isActive =
      currentPath.endsWith(href) ||
      currentPath.includes(`/${hrefName}/`);

   if (isActive) {
  link.style.background = 'linear-gradient(140deg, #0C93FF 50%, #B153F0 97.74%)';
  link.style.webkitBackgroundClip = 'text';
  link.style.webkitTextFillColor = 'transparent';
  link.style.fontWeight = '600';
} else {
  link.style.background = '';
  link.style.webkitBackgroundClip = '';
  link.style.webkitTextFillColor = '';
  link.style.fontWeight = '';
  link.style.color = ''; link.style.fontWeight = '';
}

  });
});

document.addEventListener("DOMContentLoaded", function() {
  // === Update description ===
  const descElement = document.querySelector('.ask-question-content p');
  if (descElement) {
    descElement.textContent = "Feel free to contact our sales team anytime — we’ll be happy to assist you with your project or partnership queries.";
  }

  // === Update phone ===
  const phoneAnchor = [...document.querySelectorAll('.ask-contact-list a')]
    .find(a => a.textContent.includes('Phone:'));
  if (phoneAnchor) {
    phoneAnchor.innerHTML = `<span>Phone:</span> (+971) 52 313 2916`;
    phoneAnchor.href = 'tel:+971523132916';
  }

  // === Update email ===
  const emailAnchor = [...document.querySelectorAll('.ask-contact-list a')]
    .find(a => a.textContent.includes('Email:'));
  if (emailAnchor) {
    emailAnchor.innerHTML = `<span>Email:</span> sales@neuralence.ai`;
    emailAnchor.href = 'mailto:sales@neuralence.ai';
  }
});

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
  if (!iframe) return;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const timestamp = new Date().getTime();

  // Detect if current page URL includes '/services/'
const isInServices =
  window.location.pathname.includes('/services/') ||
  window.location.pathname.includes('/solutions/');

  // Set correct relative path based on current folder
  const basePath = isInServices ? '../' : './';

  // Load correct HTML file
  iframe.src = isMobile
    ? `${basePath}mobile-co.html?t=${timestamp}`
    : `${basePath}consultation.html?t=${timestamp}`;

  // Show overlay
  overlay.style.display = 'flex';
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

document.addEventListener("DOMContentLoaded", function() {
  const footer = document.querySelector(".main-footer");
  if (footer) {
    fetch("/includes/footer.html")
      .then(response => response.text())
      .then(data => {
        footer.outerHTML = data;
      })
      .catch(error => console.error("Footer load failed:", error));
  }
});


	function submitForm(){
		/* Initiate Variables With Form Content*/
		var fname = $("#fname").val();
		var lname = $("#lname").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		var subject = $("#subject").val();
		var message = $("#msg").val();

		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: "fname=" + fname + "&lname=" + lname + "&email=" + email + "&phone=" + phone + "&subject=" + subject + "&message=" + message,
			success : function(text){
				if (text == "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-success";
		} else {
			var msgClasses = "h3 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */


	/* Animated Wow Js */	
	new WOW().init();

	/* Zoom Gallery screenshot */
	$('.project-gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
			  return element.find('img');
			}
		}
	});

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	}

	/* Projects (filtering) */
	$window.on( "load", function(){
		if( $(".project-item-boxes").length ) {
				
			/* Init Isotope */
			var $menuitem = $(".project-item-boxes").isotope({
				itemSelector: ".project-item-box",
				layoutMode: "masonry",
				masonry: {
					// use outer width of grid-sizer for columnWidth
					columnWidth: 1,
				}
			});
				
			/* Filter items on click */
			var $menudisesnav=$(".our-projects-nav li a");
				$menudisesnav.on('click', function (e) { 
			
				var filterValue = $(this).attr('data-filter');
				$menuitem.isotope({
					filter: filterValue
				}); 
				
				$menudisesnav.removeClass("active-btn"); 
				$(this).addClass("active-btn");
				e.preventDefault();
			});
		
			$menuitem.isotope({ filter: "*" });
		}
			
	});
	
})(jQuery);