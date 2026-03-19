(function () {
    // Show once per browser session
    if (sessionStorage.getItem('ps_popup_shown')) return;

    var DELAY = 30000; // 30 seconds

    var markup =
        '<div id="ps-popup-overlay">' +
            '<div id="ps-popup">' +
                '<button id="ps-popup-close" aria-label="Close">&times;</button>' +
                '<img src="assets/images/popup-offer.png" alt="Get a Free Brand Audit — Panda Studios">' +
                '<a href="https://api.whatsapp.com/send/?phone=256772233050&text=Claiming+the+Brand+Audit&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" id="ps-popup-btn">Claim it on WhatsApp</a>' +
            '</div>' +
        '</div>';

    function show() {
        var overlay = document.getElementById('ps-popup-overlay');
        if (!overlay) return;
        overlay.classList.add('ps-active');
        sessionStorage.setItem('ps_popup_shown', '1');
    }

    function close() {
        var overlay = document.getElementById('ps-popup-overlay');
        if (overlay) overlay.classList.remove('ps-active');
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.body.insertAdjacentHTML('beforeend', markup);

        // Trigger after 30 seconds
        setTimeout(show, DELAY);

        // Close on × button
        document.getElementById('ps-popup-close').addEventListener('click', close);

        // Close on overlay click (outside the card)
        document.getElementById('ps-popup-overlay').addEventListener('click', function (e) {
            if (e.target === this) close();
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });
    });
})();
