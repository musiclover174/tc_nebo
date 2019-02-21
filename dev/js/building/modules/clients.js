import { qs } from './helpers';

export default class Clients {
  constructor(clientsClass) {
    this.clientsClass = clientsClass;

    if (qs(clientsClass)) this.init();
  }

  init() {
    const clientsCarousel = new Swiper(this.clientsClass, {
      speed: 700,
      slidesPerView: 4,
      spaceBetween: 0,
      loop: true,
      navigation: {
        nextEl: `${this.clientsClass} ~ .swiper-buttons .swiper-button-next`,
        prevEl: `${this.clientsClass} ~ .swiper-buttons .swiper-button-prev`,
      },
      breakpoints: {
        650: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
      },
    });
  }
}
