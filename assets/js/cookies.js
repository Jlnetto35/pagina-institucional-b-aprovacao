/* ============================================================
   V3 PARTNERS — Banner de Consentimento LGPD
   Exibe banner na primeira visita. Salva preferência por 12 meses.
   ============================================================ */

(function () {
  const CONSENT_KEY = 'v3_lgpd_consent';
  const CONSENT_EXPIRY_DAYS = 365;

  /* Verifica se já existe consentimento salvo */
  function getConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() > data.expiry) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  }

  /* Salva consentimento */
  function saveConsent(analytics) {
    const expiry = Date.now() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics, expiry }));
  }

  /* Remove o banner */
  function removeBanner() {
    const banner = document.getElementById('v3-cookie-banner');
    if (banner) {
      banner.style.transform = 'translateY(100%)';
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 400);
    }
  }

  /* Cria e injeta o banner */
  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'v3-cookie-banner';
    banner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 0; left: 0; right: 0;
        z-index: 9999;
        background: #162744;
        border-top: 1px solid rgba(201,168,76,0.2);
        padding: 20px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        flex-wrap: wrap;
        font-family: 'DM Sans', sans-serif;
        transition: transform 0.4s ease, opacity 0.4s ease;
      ">
        <div style="flex: 1; min-width: 260px;">
          <p style="
            font-size: 8px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: #C9A84C;
            margin-bottom: 6px;
          ">Privacidade & LGPD</p>
          <p style="font-size: 13px; color: #7A8FA8; line-height: 1.6; margin: 0;">
            Utilizamos cookies essenciais para o funcionamento da plataforma e, com seu consentimento,
            cookies analíticos para melhorar sua experiência.
            <a href="politica-de-cookies.html" style="color: #C9A84C; text-decoration: none;">Saiba mais</a>
          </p>
        </div>
        <div style="display: flex; gap: 12px; flex-shrink: 0;">
          <button id="v3-cookie-reject" style="
            font-family: 'DM Sans', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #7A8FA8;
            background: transparent;
            border: 1px solid rgba(240,236,228,0.15);
            border-radius: 6px;
            padding: 9px 18px;
            cursor: pointer;
            transition: all 0.2s;
          ">Somente essenciais</button>
          <button id="v3-cookie-accept" style="
            font-family: 'DM Sans', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #09081A;
            background: #C9A84C;
            border: none;
            border-radius: 6px;
            padding: 9px 18px;
            cursor: pointer;
            transition: background 0.2s;
          ">Aceitar todos</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('v3-cookie-accept').addEventListener('click', function () {
      saveConsent(true);
      removeBanner();
      /* Aqui você ativaria o Google Analytics se analytics = true */
    });

    document.getElementById('v3-cookie-reject').addEventListener('click', function () {
      saveConsent(false);
      removeBanner();
    });
  }

  /* Inicializa */
  function init() {
    if (getConsent() !== null) return; /* Já consentiu antes */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createBanner);
    } else {
      createBanner();
    }
  }

  init();
})();
