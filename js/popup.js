(function () {
    // If they already clicked through to WhatsApp, never show again
    if (localStorage.getItem('ps_popup_converted')) return;

    // Show at: 15s, 2min, 30min from page load
    var schedule = [15000, 120000, 1800000];

    var markup =
        '<div id="ps-popup-overlay">' +
            '<div id="ps-popup">' +
                '<button id="ps-popup-close" aria-label="Close">&times;</button>' +
                '<img src="assets/images/popup-offer.png" alt="Get a Free Brand Audit — Panda Studios">' +
                '<a href="https://wa.me/256772233050?text=Claiming%20the%20Brand%20Audit" target="_blank" rel="noopener noreferrer" id="ps-popup-btn">Claim it now</a>' +
            '</div>' +
        '</div>';

    function show() {
        var overlay = document.getElementById('ps-popup-overlay');
        if (overlay) overlay.classList.add('ps-active');
    }

    function close() {
        var overlay = document.getElementById('ps-popup-overlay');
        if (overlay) overlay.classList.remove('ps-active');
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.body.insertAdjacentHTML('beforeend', markup);

        // Fire all three scheduled appearances from page load
        schedule.forEach(function (delay) {
            setTimeout(show, delay);
        });

        // Close on × button
        document.getElementById('ps-popup-close').addEventListener('click', close);

        // WhatsApp click = converted — stop showing forever
        document.getElementById('ps-popup-btn').addEventListener('click', function () {
            localStorage.setItem('ps_popup_converted', '1');
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
