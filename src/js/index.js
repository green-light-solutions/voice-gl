(() => {
  $(document).ready(() => {
    const logo = $('#logo');
    // const footerLogos = $('.footer-logo');
    const btnReady = $('#btn-ready');
    const navbar = $('nav');
    const contactForm = $('#contact-form');
    const jDocument = $(document);
    const jWindow = $(window);

    $.get('/assets/img/logo.svg', response => {
      logo.html(jQuery(response).find('svg'));
    }, 'xml');

    // footerLogos.each((index, element) => {
    //   $.get(element.firstChild.src, res => {
    //     $(element).html(jQuery(res).find('svg'));
    //   });
    // }, 'xml');

    contactForm.submit(e => {
      e.preventDefault();
      window.gtag('event', 'submit', {'event_category': 'signup' });
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: window.config.apiUrl + '/marketing-data/contacts',
        data: JSON.stringify({
          email: contactForm.find('#input-email').val(),
          organizationName: contactForm.find('#input-company-name').val(),
          ownerName: contactForm.find('#input-name').val(),
          phoneNumber: contactForm.find('#input-phone').val(),
        }),
        dataType: 'json',
        success: () => {
          $('#output-message-heading').text('We appreciate your interest in Voice');
          $('#output-message').text('Our team will be in touch with you soon to schedule a demo.');
          $('#output-text').hide();
          contactForm.hide();
        },
        error: () => {
          $('#output-message-heading').text('Sorry');
          $('#output-message').text('We encountered some kind of error. Please try again later');
        },
      });
    });

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
