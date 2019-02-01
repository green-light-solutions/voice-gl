(() => {
  $(document).ready(() => {
    const mainContent = $('body');
    const logo = $('#logo');
    const navbar = $('nav');
    const contactForm = $('#contact-form');
    const jDocument = $(document);
    const jWindow = $(window);
    let currentPage;

    if (window.location.href.match(/\/demo$/i)) {
      window.location.href = window.config.hockeyappUrl;
    }

    // add HubSpot tracking script
    if (window.config.env === 'prod') {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.id = 'hs-script-loader';
      script.src = '//js.hs-scripts.com/4454733.js';
      document.body.appendChild(script);
    }

    $.get('/assets/img/logo.svg', response => {
      logo.html(jQuery(response).find('svg'));
    }, 'xml');

    checkCurrentSection();

    // Init smooth scrolling
    $('a[href^="#"]').each((k, linkElement) => {
      linkElement.addEventListener('click', e => {
        const hashVal = linkElement.getAttribute('href');

        $('html, body').animate({
          scrollTop: $(hashVal).offset().top,
        }, 1200);

        history.pushState(null, null, hashVal);
        e.preventDefault();
      });
    });

    contactForm.submit(e => {
      e.preventDefault();
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
          // window.gtag('event', 'submit', {'event_category': 'signup' });
        },
        error: () => {
          $('#output-message-heading').text('Sorry');
          $('#output-message').text('We encountered some kind of error. Please try again later');
        },
      });
    });

    let lastScrollTop = 0;

    $(window).scroll(() => {
      checkCurrentSection();
      checkNavbarMobile();
    });

    $(window).resize(() => {
      checkCurrentSection();
    });

    function checkCurrentSection() {
      $('.section').each((k, e) => {
        const currElement = $(e);
        if (window.scrollY >= currElement.offset().top &&
          window.scrollY < currElement.offset().top + currElement.height()) {
          if (currentPage !== e.id) {
            const url = e.id === 'introduction-section' ? '' : `#${e.id}`;
            history.replaceState(null, null, url);
            mainContent.removeClass().addClass(e.id);
            e.classList.add('active');
            currentPage = e.id;
          }
        } else {
          e.classList.remove('active');
        }
      });
    }

    function checkNavbarMobile() {
      const el = document.documentElement;
      const scrollTop = (window.pageYOffset || el.scrollTop) - (el.clientTop || 0);

      if ((lastScrollTop >= scrollTop || scrollTop < 10)
        && scrollTop < jDocument.height() - jWindow.height() - 100) {
        navbar.removeClass('hidden');
      } else {
        navbar.addClass('hidden');
      }

      lastScrollTop = scrollTop;
    }
  });
})();
