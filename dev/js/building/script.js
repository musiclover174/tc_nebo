import {
  resizeWatcher,
  elemVisCheck,
  qs,
  qsAll,
} from './modules/helpers';
import Index from './modules/index';
import Popup from './modules/popup';
import Forms from './modules/forms';
// import Burger from './modules/burger';
import Contacts from './modules/contacts';

document.addEventListener('DOMContentLoaded', () => {
  // const burger = new Burger();

  if (qs('.js-banner')) {
    const index = new Index(
      {
        bannerClass: '.js-banner',
        clientsClass: '.js-clients',
        postersClass: '.js-posters',
        galleryClass: '.js-gallery',
      },
    );
  }

  resizeWatcher();

  if (qsAll('.h-anim').length) elemVisCheck();

  if (qs('.js-contacts-map')) {
    const contacts = new Contacts('.js-contacts-map');
  }

  if (qs('[data-popup]')) {
    window.popup = new Popup('[data-popup]');
  }

  if (qs('form')) {
    const forms = new Forms();
  }

  let eventScroll;
  try {
    eventScroll = new Event('scroll');
  } catch (e) {
    eventScroll = document.createEvent('Event');
    eventScroll.initEvent('scroll', false, false);
  }
  window.dispatchEvent(eventScroll);
});
