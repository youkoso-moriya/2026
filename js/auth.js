(function () {
  var SESSION_KEY = 'youkoso2026-authed';
  var CORRECT_HASH = '8304e841527c1a2f2dbd4fba16b9078ca5c9ab6e1d03ddd3961d68e3896236f7';

  var gate = document.getElementById('auth-gate');
  var content = document.getElementById('site-content');
  var form = document.getElementById('auth-form');
  var idInput = document.getElementById('auth-id');
  var pwInput = document.getElementById('auth-pw');
  var errorMsg = document.getElementById('auth-error');

  function unlock() {
    gate.hidden = true;
    content.hidden = false;
  }

  function sha256Hex(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', data).then(function (buf) {
      return Array.prototype.map
        .call(new Uint8Array(buf), function (b) {
          return b.toString(16).padStart(2, '0');
        })
        .join('');
    });
  }

  if (sessionStorage.getItem(SESSION_KEY) === '1') {
    unlock();
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var combined = idInput.value + ':' + pwInput.value;
    sha256Hex(combined).then(function (hash) {
      if (hash === CORRECT_HASH) {
        sessionStorage.setItem(SESSION_KEY, '1');
        unlock();
      } else {
        errorMsg.hidden = false;
        pwInput.value = '';
      }
    });
  });
})();
