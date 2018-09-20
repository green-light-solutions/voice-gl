(() => {
  $(document).ready(() => {
    const logo = $('#logo');
    const footerLogos = $('.footer-logo');
    const btnReady = $('#btn-ready');
    const navbar = $('nav');
    const jDocument = $(document);
    const jWindow = $(window);

    $.get('/assets/img/logo.svg', response => {
      logo.html(jQuery(response).find('svg'));
    }, 'xml');

    footerLogos.each((index, element) => {
      $.get(element.firstChild.src, res => {
        $(element).html(jQuery(res).find('svg'));
      });
    }, 'xml');

    let lastScrollTop = 0;

    $(window).scroll(() => {
      const el = document.documentElement;
      const scrollTop = (window.pageYOffset || el.scrollTop) - (el.clientTop || 0);

      if ((lastScrollTop >= scrollTop || scrollTop < 10)
        && scrollTop < jDocument.height() - jWindow.height() - 100) {
        navbar.removeClass('hidden');
      } else {
        navbar.addClass('hidden');
      }

      lastScrollTop = scrollTop;
    });

    $('#fullpage').fullpage({
      anchors: [
        'introduction',
        'what-is-voice',
        'info',
        'how-it-works',
        'why-voice',
        'contact',
      ],
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      controlArrows: false,
      paddingTop: '55px',
      responsiveWidth: 768,
      onLeave: (index, nextIndex) => {
        logo.removeClass();
        btnReady.removeClass();
        navbar.removeClass();

        if (nextIndex > index) {
          logo.addClass('delay');
          btnReady.addClass('delay');
        }

        if (nextIndex === 1) {
          navbar.addClass('transparent');
        } else {
          navbar.removeClass();
        }

        if (nextIndex === 2 || nextIndex === 4 || nextIndex === 5) {
          btnReady.addClass('btn-primary');
          logo.addClass('black');
        } else if (nextIndex === 4) {
          logo.addClass('white');
          window.gtag('event', 'video', {'event_category': 'play' });
        } else if (nextIndex > 5) {
          btnReady.addClass('hidden');
        }
      },
    });
  });
})();
