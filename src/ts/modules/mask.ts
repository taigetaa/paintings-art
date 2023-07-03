const mask: any = (selector: string) => {

    let setCursorPosition = (pos: any, elem: any): void => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos)
        } else if (elem.createTextRange) {
            const range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    const createMask = (event: any): void => {
        const matrix = '+7 ( ) ___ __ __';
        let i: number = 0;
        const def = matrix.replace(/\D/g, '');
        let val: string = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.val.length == 2) {
                this.value = '';
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    }

    const inpits: NodeListOf<HTMLElement> = document.querySelectorAll(selector);

    inpits.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;