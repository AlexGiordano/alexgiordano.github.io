const AlexModule = (function AlexModule() {
  const addEventHandler = ($elArg, type, fn) => {
    const $el = $elArg;
    if ($el.attachEvent) {
      // ie
      $el[`e${type}${fn}`] = fn;
      $el[`${type}${fn}`] = () => $el[`e${type}${fn}`](window.event);
      $el.attachEvent(`on${type}`, $el[`${type}${fn}`]);
    } else {
      // modern browsers
      $el.addEventListener(type, fn, false);
    }
  };

  function stopVideo(modal) {
    const currentIframe = modal.querySelector('.modal-content > iframe');
    currentIframe.src = currentIframe.src;
  }

  const getElementArray = (className) => {
    const modals = document.getElementsByClassName(className);
    return Array.from(modals);
  };

  function closeClickHander() {
    const parent = this.closest('.w3-modal');
    parent.style.display = 'none';
    stopVideo(parent);
  }

  function openClickHander() {
    const modalId = this.dataset.modalId;
    const modal = document.getElementById(modalId)
    modal.style.display = 'block';
  }

  const addOpenClickHandlers = () => {
    const aEls = getElementArray('open');
    aEls.forEach((el) => {
      addEventHandler(el, 'click', openClickHander);
    });
  };

  const addCloseClickHandlers = () => {
    const spanEls = getElementArray('close');
    spanEls.forEach((el) => {
      addEventHandler(el, 'click', closeClickHander);
    });
  };

  const modalEls = getElementArray('w3-modal');

  function closeModalClickHander(event) {
    modalEls.forEach((elArg) => {
      const el = elArg;
      if (event.target === el) {
        el.style.display = 'none';
        stopVideo(el);
      }
    });
  }

  addEventHandler(window, 'click', closeModalClickHander);

  return {
    addCloseClickHandlers,
    addOpenClickHandlers,
  };
}());

AlexModule.addCloseClickHandlers();
AlexModule.addOpenClickHandlers();
