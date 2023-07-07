const calc = (size: string, material: string, options: string, promocode: string, result: string) => {
  const sizeBlock: HTMLInputElement | null = document.querySelector(size);
  const materialBlock: HTMLInputElement | null = document.querySelector(material);
  const optionsBlock: HTMLInputElement | null = document.querySelector(options);
  const promocodeBlock: HTMLInputElement | null = document.querySelector(promocode);
  const resultBlock: HTMLInputElement | null = document.querySelector(result);

  let sum: number = 0;

  const calcFunc = () => {
    if (sizeBlock && materialBlock && resultBlock && promocodeBlock) {
      sum = Math.round((+sizeBlock!.value) * (+materialBlock!.value) + (+optionsBlock!.value));

      if (sizeBlock.value == "" || materialBlock.value == "") {
        resultBlock.textContent =
          "Пожалуйста, выберите размер и материал картины";
      } else if (promocodeBlock.value === "IWANTPOPART") {
        resultBlock.textContent = (`${Math.round(sum * 0.7)}`);
      } else {
        resultBlock.textContent = (`${sum}`);
      }
    }
  };

  sizeBlock!.addEventListener("change",  calcFunc); 
  materialBlock!.addEventListener("change",  calcFunc); 
  optionsBlock!.addEventListener("change",  calcFunc); 
  promocodeBlock!.addEventListener("input", calcFunc);
};

export default calc;
