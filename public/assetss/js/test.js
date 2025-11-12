// // const header = document.querySelector(".header-section");
// // window.addEventListener("scroll", () => {
// //     window.scrollY > 0 ? header.classList.add("sticky") : header.classList.remove("sticky")
// // }), document.querySelectorAll("#myTab a").forEach(function(e) {
// //     var t = new bootstrap.Tab(e);
// //     e.addEventListener("mouseenter", function() {
// //         t.show()
// //     })
// // });



// const whyUsItems = document.querySelectorAll(".why-us-items");
// whyUsItems.forEach(e => {
//     e.addEventListener("mouseover", () => {
//         whyUsItems.forEach(e => e.classList.remove("active")), e.classList.add("active")
//     })
// });
// const multipleItemCarousel = document.querySelector("#testimonialCarousel"),
//     carousel = new bootstrap.Carousel(multipleItemCarousel, {
//         interval: !1
//     });

    
// var carouselWidth = $(".carousel-inner")[0].scrollWidth,
//     cardWidth = $(".carousel-item").width(),
//     scrollPosition = 0;

// function autoplay() {
//     $(".carousel-control-next").trigger("click"), setTimeout(autoplay, 3e3)
// }
// $(".carousel-control-next").on("click", function() {
//     scrollPosition < carouselWidth - 3 * cardWidth ? (console.log("next"), scrollPosition += cardWidth, $(".carousel-inner").animate({
//         scrollLeft: scrollPosition
//     }, 800)) : (scrollPosition = 0, $(".carousel-inner").animate({
//         scrollLeft: 0
//     }, 800))
// }), $(".carousel-control-prev").on("click", function() {
//     scrollPosition > 0 ? (scrollPosition -= cardWidth, $(".carousel-inner").animate({
//         scrollLeft: scrollPosition
//     }, 800)) : (scrollPosition = carouselWidth - 3 * cardWidth, $(".carousel-inner").animate({
//         scrollLeft: scrollPosition
//     }, 800))
// }), autoplay(), window.matchMedia("(max-width:575px)").matches && $(".carousel-control-next, .carousel-control-prev").hide();
// const inputs = document.querySelectorAll(".input");

// function focusFunc() {
//     this.parentNode.classList.add("focus")
// }

// function blurFunc() {
//     let e = this.parentNode;
//     "" == this.value && e.classList.remove("focus")
// }
// inputs.forEach(e => {
//     e.addEventListener("focus", focusFunc), e.addEventListener("blur", blurFunc)
// }), $(window).on("load", function() {
//     setTimeout(function() {
//         $("#exampleModalCenter").modal("show")
//     }, 2e3)
// });


// const textArray = ["Clicks", "Leads", "Engagement", "Visibility", "Traffic", "ROI", "Followers"];
// let currentIndex = 0;

// function animateText() {
//     let e = document.getElementById("animated-text-inner");
//     e.textContent = "";
//     let t = textArray[currentIndex],
//         o = 0,
//         r = setInterval(() => {
//             e.textContent += t[o], ++o >= t.length && (clearInterval(r), setTimeout(() => {
//                 currentIndex = (currentIndex + 1) % textArray.length, animateText()
//             }, 2e3))
//         }, 50)
// }
// animateText(), setTimeout(function() {
//     // function isMobile() {
//     //     return window.innerWidth <= 768; // Adjust this breakpoint as needed
//     // }
    
//     // function setupIframes() {
//     //     document.querySelectorAll(".lazy-iframe").forEach(function(e) {
//     //         var iframe = document.createElement("iframe");
//     //         iframe.allowFullscreen = true;
    
//     //         if (isMobile()) {
//     //             iframe.src = "https://player.vimeo.com/video/1001508987?h=aab4444ace&controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&badge=0&muted=1";
//     //         } else {
//     //             iframe.src = "https://player.vimeo.com/video/1001511306?h=852012b993&controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&badge=0&muted=1";
//     //         }
    
//     //         e.innerHTML = "";
//     //         e.appendChild(iframe);
//     //     });
//     // }
    
//     // setTimeout(setupIframes, 0);
    
//     function isMobile() {
//         return window.innerWidth <= 768; // Adjust this breakpoint as needed
//     }
    
//     function setupIframes() {
//         document.querySelectorAll(".lazy-iframe").forEach(function(e) {
//             var iframe = document.createElement("iframe");
//             iframe.allowFullscreen = true;
//             iframe.playsInline = true;
//             iframe.webkitAllowsFullscreen = true; // Add this attribute
//             iframe.webkitPlaysInline = true; // Add this attribute
    
//             if (isMobile()) {
//                 iframe.src = "https://www.youtube.com/embed/pGtBPQqZmnU?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&rel=0&playlist=pGtBPQqZmnU";
//             } else {
//                 iframe.src = "https://player.vimeo.com/video/1001511306?h=852012b993&controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&badge=0&muted=1" ;
//             }
    
//             e.innerHTML = "";
//             e.appendChild(iframe);
//     // 
//             // Add a fallback for iOS devices
//             if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
//                 iframe.addEventListener('webkitEnterFullscreen', function() {
//                     iframe.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
//                 });
//             }
//         });
//     }
    
//     setTimeout(setupIframes, 2000);
    
  
// }, 2000);

// // https://player.vimeo.com/video/1001508987?h=aab4444ace&controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&badge=0&muted=1