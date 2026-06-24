/**
 * Artful Creations - Client-Side Code Protection Script
 * Prevents casual code theft, page saving, printing, and inspecting.
 */

(function () {
  // 1. Frame-Busting: Prevent loading inside an iframe
  try {
    if (window.self !== window.top) {
      window.top.location = window.self.location;
    }
  } catch (e) {
    window.top.location = window.self.location;
  }

  // 2. Dynamic CSS Injection: Disable text selection and image dragging
  const style = document.createElement('style');
  style.innerHTML = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-user-drag: none !important;
      user-drag: none !important;
    }
    input, textarea, [contenteditable="true"] {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
    img {
      pointer-events: none !important;
      -webkit-user-drag: none !important;
      user-drag: none !important;
    }
  `;
  document.head.appendChild(style);

  // 3. Disable selection and drag start events via JS
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
    return false;
  });
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  });

  // 4. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  // 5. Block Keyboard Shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+A)
  document.addEventListener('keydown', function (e) {
    // F12 (123)
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I (73), Ctrl+Shift+J (74), Ctrl+Shift+C (67), Ctrl+Shift+K (75)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67 || e.keyCode === 75)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+U (85) - View Source
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }

    // Ctrl+S (83) - Save
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }

    // Ctrl+P (80) - Print
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
      return false;
    }

    // Ctrl+A (65) - Select All (to prevent copying via select-all)
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
      return false;
    }
  });

  // 6. Disable Console Output and Clear Console Logs
  const noop = function () {};
  const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'clear'];
  methods.forEach(method => {
    try {
      console[method] = noop;
    } catch (e) {}
  });

  setInterval(function () {
    try {
      console.clear();
    } catch (e) {}
  }, 100);

  // 7. DevTools Debugger Trap
  // When DevTools is opened, this loop executes 'debugger;' and freezes the page execution.
  const debugTrap = function () {
    function trap() {
      (function () {
        return false;
      })
      .constructor("debugger")
      .call();
    }
    setInterval(trap, 50);
  };

  try {
    debugTrap();
  } catch (e) {}
})();
