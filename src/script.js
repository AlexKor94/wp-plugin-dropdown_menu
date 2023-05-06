// Menu.
document.addEventListener("DOMContentLoaded", () => {
  var menu = document.querySelector('#menu');
  var menuOpeners = menu.querySelectorAll('span.opener');

  // Openers.
  menuOpeners.forEach(function (opener) {

    opener.addEventListener('click', function (event) {

      // Prevent default.
      event.preventDefault();

      // Toggle.
      menuOpeners.forEach(function (otherOpener) {
        if (otherOpener !== opener) {
          otherOpener.classList.remove('active');
        }
      });
      opener.classList.toggle('active');

      // Trigger resize (sidebar lock).
      window.dispatchEvent(new Event('resize.sidebar-lock'));

    });

  });

});
