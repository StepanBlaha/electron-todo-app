const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    
    // Enable pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    
    // Enable navigation
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});