import { qsAll } from './helpers';

export default class Form {
  constructor() {
    this.inputs = qsAll('.common__input, .common__textarea');
    this.forms = qsAll('form');
    this.digitsInput = qsAll('.js-digits');

    window.checkForm = this.constructor.checkForm();

    this.eventBinder();
  }

  eventBinder() {
    this.forms.forEach((form) => {
      form.addEventListener('submit', e => !this.constructor.checkForm(form) && e.preventDefault() && e.stopPropagation());
    });

    // $('.js-phone').mask('+7(999) 999-9999');

    this.digitsInput.forEach((digitInput) => {
      digitInput.addEventListener('keydown', (e) => {
        let validArr = [46, 8, 9, 27, 13, 110, 190];
        if (validArr.indexOf(e.keyCode) !== -1
          || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))
          || (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true))
          || (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true))
          || (e.keyCode >= 35 && e.keyCode <= 39)) {
          return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
          && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
      });
    });
  }

  static checkForm(form) {
    if (form) {
      let checkResult = true;
      let re = '';
      const warningElems = qsAll('.warning');

      if (warningElems.length) {
        warningElems.forEach(el => el.classList.remove('warning'));
      }

      qsAll('input, textarea, select', form).forEach((elem) => {
        if (elem.getAttribute('data-req')) {
          switch (elem.getAttribute('data-type')) {
            case 'tel':
              re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test(elem.value)) {
                elem.classList.add('warning');
                checkResult = false;
              }
              break;
            case 'email':
              re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test(elem.value)) {
                elem.classList.add('warning');
                checkResult = false;
              }
              break;
            case 'file':
              if (elem.value.trim() === '') {
                elem.parentNode.classList.add('warning');
                checkResult = false;
              }
              break;
            default:
              if (elem.value.trim() === '') {
                elem.classList.add('warning');
                checkResult = false;
              }
              break;
          }
        }
      });

      qsAll('input[name^=agreement]', form).forEach((item) => {
        if (!item.checked) {
          item.classList.add('warning');
          checkResult = false;
        }
      });

      return checkResult;
    }
  }
}
