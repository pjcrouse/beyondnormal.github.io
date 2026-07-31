// Reports outbound App Store clicks to our own Worker.
//
// Cloudflare Web Analytics cannot see a click that leaves the domain. Routing
// clicks through a redirect page on our own domain was tried and did not work:
// the redirect consistently beat Cloudflare's beacon, so the pageview never
// sent. Raising the delay would have traded a silent failure for visible
// friction on the most important tap on the site.
//
// navigator.sendBeacon exists for precisely this. The browser guarantees the
// request is dispatched even as the page unloads, so the link can point
// straight at Apple with nothing in between.

(function () {
  var ENDPOINT = 'https://beyond-normal-worker.patcrouse.workers.dev/v1/click';

  // Which page the click came from. Set per page so the Worker can tell a
  // bar-path conversion from a homepage one.
  function source() {
    var el = document.querySelector('meta[name="bn-page"]');
    return (el && el.getAttribute('content')) || 'unknown';
  }

  function report() {
    var body = JSON.stringify({ source: source() });
    // sendBeacon survives unload; fetch does not, reliably. Fall back only if
    // the browser is old enough to lack it.
    if (navigator.sendBeacon) {
      // text/plain, NOT application/json. application/json is not a
      // CORS-safelisted content type, so it forces a preflight -- and
      // sendBeacon cannot preflight. The browser drops the request while
      // sendBeacon() still returns true, because that only reports whether it
      // was queued. Verified: the JSON-typed beacon never reached the Worker.
      // The body is still JSON; the Worker reads the raw text and parses it
      // itself, so the declared type is irrelevant to it.
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }));
      return;
    }
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: body,
        keepalive: true
      });
    } catch (e) { /* never block the navigation */ }
  }


  // TEMPORARY DIAGNOSTIC -- remove once click tracking is confirmed.
  // Fires on page load rather than on click. If this arrives from a phone but
  // click reports do not, the cross-origin request is fine and the problem is
  // timing at unload. If neither arrives, Safari is blocking the cross-origin
  // request itself and the endpoint needs to move to a first-party subdomain.
  try {
    navigator.sendBeacon(ENDPOINT, new Blob([JSON.stringify({ source: 'unknown' })], { type: 'text/plain' }));
  } catch (e) { /* diagnostic only */ }

  // Delegated, so links added later are covered and each page needs no wiring.
  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest
      ? event.target.closest('a[href*="apps.apple.com/app/"]')
      : null;
    if (link) report();
  }, true);
})();
