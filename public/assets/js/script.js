

const clientSwiper = new Swiper('.clientSwiper', {
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
     
    },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
   paginationClickable: true,

  // Navigation arrows
});




const testimonialSwiper = new Swiper('.testimonialSwiper', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 1,
  pagination: {
    el: '.testimonial-pagination',
  },
   paginationClickable: true,
    navigation: {
    nextEl: '.testimonial-swiper-prev',
    prevEl: '.testimonial-swiper-next',
  },

  // Navigation arrows
});








