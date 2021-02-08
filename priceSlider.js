let sliderShown = false;

// from https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function priceToggle() {
    const slider = document.getElementById('priceSliderGroup');
    if (!sliderShown) {
        slider.style.display = 'block';
    } else {
        slider.style.display = 'none';
    }
    sliderShown = !sliderShown;
}

window.addEventListener('load', () => {
    const slider = document.getElementById("priceSlider");
    const output = document.getElementById("priceLabel");

    slider.oninput = function () {
        const price = slider.value;
        output.innerHTML = price + 'L per Baleada';

        // set price var
        BALEADAS_PRICE = price;

        // re calculate after debounced 300ms
        const debouncedCalc = debounce(() => calculate(), 750);
        debouncedCalc();
    }
});
