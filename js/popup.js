(function () {
    // Version key — bump this string to reset all visitors (e.g. new offer image)
    var VERSION = 'v2';
    var CONVERTED_KEY = 'ps_popup_converted_' + VERSION;

    // If they already clicked through to WhatsApp on this version, never show again
    if (localStorage.getItem(CONVERTED_KEY)) return;

    var INTERVAL = 3 * 60 * 1000; // 3 minutes
    var FIRST_DELAY = 15000;       // 15s before first appearance

    var markup =
        '<div id="ps-popup-overlay">' +
            '<div id="ps-popup">' +
                '<button id="ps-popup-close" aria-label="Close">&times;</button>' +
                '<img src="assets/images/popup-offer.png" alt="Get a Free Brand Audit — Panda Studios">' +
                '<a href="https://wa.me/+256772233050?text=Claiming+the+Brand+Audit" target="_blank" rel="noopener noreferrer" id="ps-popup-btn">Get My Free Audit</a>' +
            '</div>' +
        '</div>';

    var timer;

    function show() {
        if (localStorage.getItem(CONVERTED_KEY)) return;
        var overlay = document.getElementById('ps-popup-overlay');
        if (overlay) overlay.classList.add('ps-active');
    }

    function close() {
        var overlay = document.getElementById('ps-popup-overlay');
        if (overlay) overlay.classList.remove('ps-active');
        // Schedule next appearance 3 minutes after closing
        clearTimeout(timer);
        timer = setTimeout(show, INTERVAL);
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.body.insertAdjacentHTML('beforeend', markup);

        // First appearance after 15s, then repeats every 3min after each close
        timer = setTimeout(show, FIRST_DELAY);

        // Close on × button
        document.getElementById('ps-popup-close').addEventListener('click', close);

        // WhatsApp click = converted — stop showing forever (for this version)
        document.getElementById('ps-popup-btn').addEventListener('click', function () {
            localStorage.setItem(CONVERTED_KEY, '1');
            clearTimeout(timer);
        });

        // Close on overlay backdrop click
        document.getElementById('ps-popup-overlay').addEventListener('click', function (e) {
            if (e.target === this) close();
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });
    });
})();
