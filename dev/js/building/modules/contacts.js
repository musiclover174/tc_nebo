import { qs } from './helpers';

export default class Contacts {
  constructor(mapElem) {
    this.el = qs(mapElem);

    ymaps.ready(this.init.bind(this));
  }

  init() {
    const pinCoord = this.el.getAttribute('data-coords').split(', ');
    const pinSrc = this.el.getAttribute('data-pin');

    const myMap = new ymaps.Map(this.el, {
      center: [parseFloat(pinCoord[0]), parseFloat(pinCoord[1])],
      zoom: window.innerWidth <= 1000 ? 15 : 17,
      controls: ['smallMapDefaultSet'],
    });

    const PMitem = new ymaps.Placemark([parseFloat(pinCoord[0]), parseFloat(pinCoord[1])], {}, {
      iconLayout: 'default#image',
      iconImageSize: [54, 67],
      iconImageHref: pinSrc,
      iconImageOffset: [-32, -42],
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(PMitem);
  }
}
