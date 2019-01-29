export default class News {
  constructor(galleryEl, thumbsEl) {
    this.galleryEl = galleryEl;
    this.thumbsEl = thumbsEl;

    this.init();
  }

  init() {
    const galleryThumbs = new Swiper(this.thumbsEl, {
      spaceBetween: 18,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
      },
    });
    const galleryTop = new Swiper(this.galleryEl, {
      spaceBetween: 10,
      slidesPerView: 1,
      navigation: {
        nextEl: '.js-news-next',
        prevEl: '.js-news-prev',
      },
      thumbs: {
        swiper: galleryThumbs,
      },
    });
  }
}
