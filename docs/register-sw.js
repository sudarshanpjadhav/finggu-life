// finggu-life — PWA registration
// Add this script tag to index.html before </body>:
// <script src="register-sw.js"></script>

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('[finggu-life] Service Worker registered:', reg.scope);

        // Check for updates every 60 minutes
        setInterval(() => reg.update(), 60 * 60 * 1000);

        // Notify user on new version available
        reg.addEventListener('updatefound', () => {
          const FINGGU_newWorker = reg.installing;
          FINGGU_newWorker.addEventListener('statechange', () => {
            if (FINGGU_newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              fingguFn_showUpdateBanner();
            }
          });
        });
      })
      .catch((err) => console.warn('[finggu-life] SW registration failed:', err));
  });
}

// ── Install prompt (Add to Home Screen) ──────────────────────────────────────
let FINGGU_deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  FINGGU_deferredPrompt = e;
  fingguFn_showInstallBanner();
});

const fingguFn_showInstallBanner = () => {
  // Only show if not already installed
  if (window.matchMedia('(display-mode: standalone)').matches) return;

  const FINGGU_banner = document.createElement('div');
  FINGGU_banner.id = 'finggu-install-banner';
  FINGGU_banner.style.cssText = `
    position:fixed;bottom:80px;left:16px;right:16px;
    background:#21262d;border:1px solid #30363d;border-radius:12px;
    padding:14px 16px;display:flex;align-items:center;gap:12px;
    z-index:1000;box-shadow:0 4px 24px rgba(0,0,0,.5);
    animation:fingguFadeIn .3s ease;
  `;
  FINGGU_banner.innerHTML = `
    <span style="font-size:28px">📱</span>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:700">Install finggu-life</div>
      <div style="font-size:11px;color:#7d8590">Works offline · No signup · Free forever</div>
    </div>
    <button onclick="fingguFn_installApp()" style="background:#f78166;color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">Install</button>
    <button onclick="document.getElementById('finggu-install-banner').remove()" style="background:none;border:none;color:#7d8590;cursor:pointer;font-size:18px">✕</button>
  `;
  document.body.appendChild(FINGGU_banner);
};

const fingguFn_installApp = async () => {
  if (!FINGGU_deferredPrompt) return;
  FINGGU_deferredPrompt.prompt();
  const { outcome } = await FINGGU_deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    document.getElementById('finggu-install-banner')?.remove();
  }
  FINGGU_deferredPrompt = null;
};

const fingguFn_showUpdateBanner = () => {
  const FINGGU_banner = document.createElement('div');
  FINGGU_banner.style.cssText = `
    position:fixed;top:70px;left:16px;right:16px;
    background:#21262d;border:1px solid #3fb950;border-radius:12px;
    padding:12px 16px;display:flex;align-items:center;gap:12px;
    z-index:1000;box-shadow:0 4px 24px rgba(0,0,0,.5);
  `;
  FINGGU_banner.innerHTML = `
    <span>🆕</span>
    <div style="flex:1;font-size:13px">New version available!</div>
    <button onclick="window.location.reload()" style="background:#3fb950;color:#fff;border:none;border-radius:6px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer">Update</button>
  `;
  document.body.appendChild(FINGGU_banner);
};
