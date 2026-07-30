// Email capture for the landing pages.
//
// Posts to the Beyond Normal Worker's public /v1/subscribe route rather than a
// third-party list service, so the address list lives in our own Cloudflare KV.
// Progressive: without JS the form still submits natively, which is why each
// <form> keeps a real action attribute pointing at the same endpoint.

(function () {
  var ENDPOINT = 'https://beyond-normal-worker.patcrouse.workers.dev/v1/subscribe';

  function setStatus(form, message, kind) {
    var el = form.parentNode.querySelector('.status');
    if (!el) return;
    el.textContent = message;
    el.className = 'status show ' + kind;
  }

  function handle(form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (form.classList.contains('busy')) return;

      var email = (form.querySelector('input[type=email]') || {}).value || '';
      var trap = (form.querySelector('input[name=company]') || {}).value || '';
      var source = form.getAttribute('data-source') || 'unknown';

      if (!email.trim()) {
        setStatus(form, 'Enter an email address first.', 'err');
        return;
      }

      form.classList.add('busy');
      setStatus(form, 'Adding you…', 'ok');

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email, source: source, company: trap })
      })
        .then(function (res) {
          return res.json().then(function (body) { return { status: res.status, body: body }; });
        })
        .then(function (result) {
          form.classList.remove('busy');
          if (result.status === 200) {
            form.reset();
            setStatus(
              form,
              result.body.alreadySubscribed
                ? "You're already on the list — nothing more to do."
                : "You're on the list. We'll be in touch when there's something worth saying.",
              'ok'
            );
          } else if (result.status === 422) {
            setStatus(form, "That doesn't look like an email address.", 'err');
          } else if (result.status === 429) {
            setStatus(form, 'Too many attempts just now. Give it a minute.', 'err');
          } else {
            setStatus(form, "Something went wrong on our end. Try again, or email patcrouse@gmail.com.", 'err');
          }
        })
        .catch(function () {
          form.classList.remove('busy');
          setStatus(form, "Couldn't reach the server. Check your connection and try again.", 'err');
        });
    });
  }

  var forms = document.querySelectorAll('.signup form');
  for (var i = 0; i < forms.length; i++) handle(forms[i]);
})();
