const swiper = new Swiper('.clientSwiper', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 6,
  breakpoints: {
      "@0.00": {
        slidesPerView: 4,
      },
      "@0.75": {
        slidesPerView: 4,
      },
      "@1.00": {
        slidesPerView: 6,
      },
      "@1.50": {
        slidesPerView: 8,
      },
    },
  loop: true,
    autoplay: {
        delay: 3000, // Autoplay interval
        disableOnInteraction: false, // Autoplay continues after user interaction
    },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
   paginationClickable: true,

  // Navigation arrows
});

// Pause autoplay on mouse enter
$(".swiper-container").mouseenter(function(){
    clientSwiper.autoplay.stop();
});

// Resume autoplay on mouse leave
$(".swiper-container").mouseleave(function(){
    clientSwiper.autoplay.start();
});