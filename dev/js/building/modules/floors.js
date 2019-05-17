import {
  qsAll,
  qs,
  fadeIn,
  fadeOut,
} from './helpers';

export default class Floor {
  constructor(floorEls, floorBtnsEls) {
    this.floorEls = floorEls;
    this.floorBtnsEls = floorBtnsEls;

    this.init();
  }

  init() {
    if (window.location.hash) {
      const hash = window.location.hash.substr(1);
      this.goToFloor(qs(`${this.floorBtnsEls}[data-to="${hash}"]`));
    }

    qsAll(this.floorBtnsEls).forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) this.goToFloor(btn);
      });
    });
  }

  goToFloor(btn) {
    qs(`${this.floorBtnsEls}.active`).classList.remove('active');
    fadeOut(qs(`${this.floorEls}.active`), 200, () => {
      qs(`${this.floorEls}.active`).classList.remove('active');
      btn.classList.add('active');
      fadeIn(qs(`${this.floorEls}[data-floor="${btn.getAttribute('data-to')}"]`), 200, () => {
        qs(`${this.floorEls}[data-floor="${btn.getAttribute('data-to')}"]`).classList.add('active');
      }, 'flex');
    });
  }
}
