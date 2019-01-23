import { qs, qsAll } from './helpers';

export default class Index {
  constructor({
    bannerClass,
    clientsClass,
    postersClass,
    galleryClass,
  }) {
    this.bannerClass = bannerClass;
    this.clientsClass = clientsClass;
    this.postersClass = postersClass;
    this.galleryClass = galleryClass;

    if (qs(bannerClass)) this.bannerInit();
    if (qs(clientsClass)) this.clientsInit();
    if (qs(postersClass)) this.postersInit();
    if (qs(galleryClass)) this.galleryInit();
  }

  bannerInit() {
    const bannerCarousel = new Swiper(this.bannerClass, {
      speed: 1500,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      navigation: {
        nextEl: `${this.bannerClass} .swiper-button-next`,
        prevEl: `${this.bannerClass} .swiper-button-prev`,
      },
      pagination: {
        el: `${this.bannerClass} .swiper-pagination`,
        type: 'bullets',
        clickable: true,
      },
      autoplay: {
        delay: 8000,
      },
    });
  }

  clientsInit() {
    const clientsCarousel = new Swiper(this.clientsClass, {
      speed: 700,
      slidesPerView: 4,
      spaceBetween: 0,
      loop: true,
      navigation: {
        nextEl: `${this.clientsClass} ~ .swiper-buttons .swiper-button-next`,
        prevEl: `${this.clientsClass} ~ .swiper-buttons .swiper-button-prev`,
      },
    });
  }

  postersInit() {
    const posterCarousel = new Swiper(this.postersClass, {
      speed: 700,
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: `${this.postersClass} ~ .swiper-buttons .swiper-button-next`,
        prevEl: `${this.postersClass} ~ .swiper-buttons .swiper-button-prev`,
      },
      breakpoints: {
        1270: {
          slidesPerView: 2,
          spaceBetween: 20,
        }
      },
    });
  }

  galleryInit() {
    const galleryCarousel = new Swiper(this.galleryClass, {
      speed: 700,
      slidesPerView: 'auto',
      spaceBetween: -30,
      loop: true,
      loopedSlides: qsAll(`${this.galleryClass} .swiper-slide`).length,
    });
  }
}
