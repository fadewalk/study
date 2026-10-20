/* Study 站主题切换：浅色/深色，持久化 + giscus 同步 */
(function () {
  function apply(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('study_theme', t); } catch (e) {}
    var btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
    var frame = document.querySelector('iframe.giscus-frame');
    if (frame) frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: t === 'dark' ? 'dark' : 'light' } } },
      'https://giscus.app');
  }
  function current() {
    return document.documentElement.dataset.theme ||
      (function () { try { return localStorage.getItem('study_theme') || 'light'; } catch (e) { return 'light'; } })();
  }
  function boot() {
    apply(current());
    var btn = document.createElement('button');
    btn.id = 'themeToggle';
    btn.title = '浅色 / 深色主题切换';
    btn.onclick = function () { apply(current() === 'dark' ? 'light' : 'dark'); };
    document.body.appendChild(btn);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.__studyApplyTheme = apply;
})();
