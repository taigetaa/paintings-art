const modals = (): void => {
  const bindModal = (
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true
  ): void => {
    const triggers: NodeListOf<Element> =
      document.querySelectorAll(triggerSelector);
    const modal: HTMLElement | null = document.querySelector(modalSelector);
    const close: Element | null = document.querySelector(closeSelector);
    const windows: NodeListOf<HTMLElement> = document.querySelectorAll("[data-modal]");

    if (!modal) {
      return;
    }

    const closeModal = (): void => {
      modal!.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = "0px";
    };

    triggers.forEach((btns) => {
      btns.addEventListener("click", (e: Event) => {
        if (e.target) {
          e.preventDefault();
        }

        windows.forEach((window) => {
          window.style.display = "none";
        });

        modal!.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    close!.addEventListener("click", () => {
      windows.forEach((window) => {
        window.style.display = "none";
      });

      closeModal();
    });

    modal!.addEventListener("click", (e: Event) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach((window) => {
          window.style.display = "none";
        });

        closeModal();
      }
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        closeModal();
      }
    });
  };

  const showModalByTime = (selector: string, time: number): void => {
    setTimeout(function () {
      let display: string = "";

      document.querySelectorAll("[data-modal]").forEach((window: Element) => {
        if (getComputedStyle(window).display !== "none") {
          display = "block";
        }
      });

      if (!display) {
        document.querySelector<HTMLElement>(selector)!.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }, time);
  };

  bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModal(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");

  showModalByTime(".popup-consultation", 5000);
};

export { modals };
