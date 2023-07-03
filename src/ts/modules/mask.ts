const mask = (selector: string) => {
  let setCursorPosition = (pos: number, elem: any): void => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      const range = elem.createTextRange();

      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };

  const createMask = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const matrix = "+7 (___) ___ __ __";
    let i: number = 0;
    const def = matrix.replace(/\D/g, "");
    let val: string = input.value.replace(/\D/g, "");

    if (def.length >= val.length) {
      val = def;
    }

    input.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });

    if (event.type === "blur") {
      if (input.value.length == 2) {
        input.value = "";
      }
    } else {
      setCursorPosition(input.value.length, input);
    }
  };

  const inpits: NodeListOf<HTMLElement> = document.querySelectorAll(selector);

  inpits.forEach((input) => {
    input.addEventListener("input", createMask);
    input.addEventListener("focus", createMask);
    input.addEventListener("blur", createMask);
  });
};

export default mask;
