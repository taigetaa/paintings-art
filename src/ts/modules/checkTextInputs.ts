const checkTextInputs = (selector: string) => {
  const txtInputs: NodeListOf<HTMLElement> =
    document.querySelectorAll(selector);

  txtInputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key.match(/[^а-яё 0-9]/)) {
        e.preventDefault();
      }
    });
  });
};

export default checkTextInputs;
