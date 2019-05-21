import {
  resizeWatcher,
  elemVisCheck,
  qs,
  qsAll,
  scrollToInit,
} from './modules/helpers';
import Index from './modules/index';
import Clients from './modules/clients';
import Popup from './modules/popup';
import Forms from './modules/forms';
import Burger from './modules/burger';
import Contacts from './modules/contacts';
import News from './modules/news';
import Floors from './modules/floors';

window.onload = () => {
  const burger = new Burger();

  if (qs('.js-banner')) {
    const index = new Index(
      {
        bannerClass: '.js-banner',
        postersClass: '.js-posters',
        posterDscClass: '.js-poster-dsc',
        galleryClass: '.js-gallery',
      },
    );
  }

  if (qs('.js-clients')) {
    const clients = new Clients('.js-clients');
  }

  resizeWatcher();

  if (qsAll('.h-anim').length) elemVisCheck();

  if (qs('.js-contacts-map')) {
    const contacts = new Contacts('.js-contacts-map');
  }

  if (qs('[data-popup]')) {
    window.popup = new Popup('[data-popup]');
  }

  if (qs('.js-news-car')) {
    const news = new News('.js-news-car', '.js-news-thumbs');
  }

  if (qs('form')) {
    const forms = new Forms();
  }

  if (qs('.js-floor-change')) {
    const floors = new Floors('.js-floor', '.js-floor-change');
  }

  if (qs('.glightbox')) {
    const lightBox = GLightbox({
      selector: 'glightbox',
    });
  }

  if (qs('.js-gallery-thumbs')) {
    lightGallery(qs('.js-gallery-thumbs'), {
      thumbnail: true,
    });
  }

  if (qs('.js-scrollTo')) {
    scrollToInit();
  }

  let eventScroll;
  try {
    eventScroll = new Event('scroll');
  } catch (e) {
    eventScroll = document.createEvent('Event');
    eventScroll.initEvent('scroll', false, false);
  }
  window.dispatchEvent(eventScroll);
};
