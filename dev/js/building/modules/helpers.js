function qs(query, root = document) {
  return root.querySelector(query);
}

function qsAll(query, root = document) {
  return root.querySelectorAll(query);
}

function fadeIn(elem, ms, cb, d = 'block') {
  if (!elem) return;

  elem.style.opacity = 0;
  elem.style.display = d;

  if (ms) {
    let opacity = 0;
    const timer = setInterval(() => {
      opacity += 50 / ms;
      if (opacity >= 1) {
        clearInterval(timer);
        opacity = 1;
        if (cb) cb()
      }
      elem.style.opacity = opacity;
    }, 50);
  } else {
    elem.style.opacity = 1;
    if (cb) cb();
  }
}

function fadeOut(elem, ms, cb) {
  if (!elem) return;

  elem.style.opacity = 1;

  if (ms) {
    let opacity = 1;
    const timer = setInterval(() => {
      opacity -= 50 / ms;
      if (opacity <= 0) {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = 'none';
        if (cb) cb();
      }
      elem.style.opacity = opacity;
    }, 50);
  } else {
    elem.style.opacity = 0;
    elem.style.display = 'none';
    if (cb) cb();
  }
}

function scrollIt(destination, duration = 1500, callback) {
  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - 20;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timingFunction = time * (2 - time);
    window.scroll(0, Math.ceil((timingFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

function visChecker(el) {
  const rect = el.getBoundingClientRect();
  const wHeight = window.innerHeight || document.documentElement.clientHeight;
  return (
    rect.top <= wHeight * 0.85
  );
}

function resizeWatcher() {
  const tableSel = document.querySelectorAll('table');
  const scrollArray = [];
  if (tableSel.length) {
    tableSel.forEach((item, i) => {
      const orgHtml = item.outerHTML;

      item.outerHTML = `<div class='table-scroller${i}'>${orgHtml}</div>`;
      const ps = new PerfectScrollbar(`.table-scroller${i}`, {
        wheelPropagation: true,
      });

      scrollArray.push(ps);
    });

    window.addEventListener('resize', () => {
      if (scrollArray.length) {
        scrollArray.forEach((item) => {
          item.update();
        });
      }
    });
  }
}

function elemVisCheck() {
  window.addEventListener('scroll', () => {
    qsAll('.h-anim').forEach((elem) => {
      if (visChecker(elem)) elem.setAttribute('visible', true);
    });
  });
}

function scrollToInit() {
  qsAll('.js-scrollTo').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const duration = elem.getAttribute('data-duration') || 1000;
      scrollIt(qs(`[data-scrollId="${elem.getAttribute('data-to')}"]`), duration);
      e.preventDefault();
    });
  });
}

export {
  fadeIn,
  fadeOut,
  scrollTo,
  visChecker,
  resizeWatcher,
  elemVisCheck,
  scrollToInit,
  qs,
  qsAll,
};
