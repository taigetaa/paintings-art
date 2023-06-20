import { modals } from "./modules/modals";
import sliders from "./modules/sliders";

window.addEventListener('DOMContentLoaded', () : void => {
    modals();
    sliders(".feedback-slider-item", "horizontal", ".main-prev-btn", ".main-next-btn");
    sliders(".main-slider-item", "vertical", "", "");
});