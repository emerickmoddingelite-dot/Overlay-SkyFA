/**
 * SkyFA FiveM Stream Overlay — Utilitaires Partagés v2
 * Support complet des paramètres URL pour tout modifier
 */

(function () {

  // ── MERGE URL PARAMS OVER CONFIG ──────────────────────────
  function applyUrlParams(cfg) {
    const p = new URLSearchParams(window.location.search);
    if (!p.toString()) return cfg;

    const map = {
      pseudo:             ['streamer','pseudo'],
      organisation:       ['streamer','organisation'],
      serveur:            ['streamer','serveur'],
      role:               ['streamer','role'],
      contenu:            ['streamer','contenu'],
      twitch:             ['socials','twitch'],
      discord:            ['socials','discord'],
      twitter:            ['socials','twitter'],
      youtube:            ['socials','youtube'],
      tiktok:             ['socials','tiktok'],
      debut_titre:        ['overlays','debut','titre'],
      debut_sousTitre:    ['overlays','debut','sousTitre'],
      debut_tagline:      ['overlays','debut','tagline'],
      debut_badge:        ['overlays','debut','badge'],
      enjeu_obj_titre:    ['overlays','enjeu','objectifTitre'],
      enjeu_obj1:         ['overlays','enjeu','objectifLigne1'],
      enjeu_obj2:         ['overlays','enjeu','objectifLigne2'],
      enjeu_cmd1:         ['overlays','enjeu','commandes',0],
      enjeu_cmd2:         ['overlays','enjeu','commandes',1],
      enjeu_cmd3:         ['overlays','enjeu','commandes',2],
      enjeu_cmd4:         ['overlays','enjeu','commandes',3],
      pause_titre:        ['overlays','pause','titre'],
      pause_sousTitre:    ['overlays','pause','sousTitre'],
      pause_message:      ['overlays','pause','message'],
      pause_contenu:      ['overlays','pause','contenuCarte'],
      fin_titre:          ['overlays','fin','titre'],
      fin_sousTitre:      ['overlays','fin','sousTitre'],
      fin_message:        ['overlays','fin','message'],
      fin_cta:            ['overlays','fin','cta'],
      // Theme
      t_cyan:             ['theme','cyan'],
      t_cyanBright:       ['theme','cyanBright'],
      t_cyanDark:         ['theme','cyanDark'],
      t_cyanDim:          ['theme','cyanDim'],
      t_particles:        ['theme','particles'],
      t_particleCount:    ['theme','particleCount'],
      t_fontDisplay:      ['theme','fontDisplay'],
      t_fontSize:         ['theme','fontSize'],
      t_borderOpacity:    ['theme','borderOpacity'],
      t_glowIntensity:    ['theme','glowIntensity'],
      t_bgOpacity:        ['theme','bgOpacity'],
      t_gridVisible:      ['theme','gridVisible'],
      t_scanlineSpeed:    ['theme','scanlineSpeed'],
      t_animSpeed:        ['theme','animSpeed'],
    };

    for (const [param, path] of Object.entries(map)) {
      const val = p.get(param);
      if (val === null) continue;
      let ref = cfg;
      for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]];
      const lastKey = path[path.length - 1];
      // Type coercion
      if (val === 'true') ref[lastKey] = true;
      else if (val === 'false') ref[lastKey] = false;
      else if (!isNaN(val) && val !== '') ref[lastKey] = Number(val);
      else ref[lastKey] = val;
    }
    return cfg;
  }

  // ── APPLY CONFIG TO DOM ────────────────────────────────────
  function applyConfig(cfg) {
    const root = document.documentElement;
    const t = cfg.theme;

    // Base colors
    if (t.cyan)       root.style.setProperty('--cyan', t.cyan);
    if (t.cyanBright) root.style.setProperty('--cyan-bright', t.cyanBright);
    if (t.cyanDark)   root.style.setProperty('--cyan-dark', t.cyanDark);
    if (t.cyanDim)    root.style.setProperty('--cyan-dim', t.cyanDim);

    // Derived colors
    if (t.cyan) {
      const rgb = hexToRgb(t.cyan);
      if (rgb) {
        const gi = t.glowIntensity !== undefined ? t.glowIntensity : 0.55;
        const bo = t.borderOpacity !== undefined ? t.borderOpacity : 1;
        root.style.setProperty('--cyan-glow',  `rgba(${rgb.r},${rgb.g},${rgb.b},${gi})`);
        root.style.setProperty('--cyan-faint', `rgba(${rgb.r},${rgb.g},${rgb.b},0.08)`);
        root.style.setProperty('--border',     `rgba(${rgb.r},${rgb.g},${rgb.b},${(0.18 * bo).toFixed(2)})`);
        root.style.setProperty('--border-mid', `rgba(${rgb.r},${rgb.g},${rgb.b},${(0.42 * bo).toFixed(2)})`);
        root.style.setProperty('--border-hi',  `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(0.95, 0.8 * bo).toFixed(2)})`);
        // Text derived from cyan
        root.style.setProperty('--text-cyan',   `rgba(${Math.min(255,rgb.r+60)},${Math.min(255,rgb.g+40)},${Math.min(255,rgb.b+10)},0.9)`);
        root.style.setProperty('--text-dim',    `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`);
        root.style.setProperty('--text-bright', `rgba(${Math.min(255,rgb.r+100)},${Math.min(255,rgb.g+80)},${Math.min(255,rgb.b+30)},0.95)`);
        root.style.setProperty('--accent', t.cyanBright || t.cyan);
        root.style.setProperty('--accent-dim', `rgba(${rgb.r},${rgb.g},${rgb.b},0.15)`);
      }
    }

    // Background opacity
    if (t.bgOpacity !== undefined) {
      root.style.setProperty('--bg-opacity', t.bgOpacity);
    }

    // Font
    if (t.fontDisplay) {
      root.style.setProperty('--font-display', `'${t.fontDisplay}', sans-serif`);
    }
    if (t.fontSize) {
      root.style.setProperty('--font-scale', t.fontSize);
    }

    // Grid visibility
    const grid = document.querySelector('.bg-grid');
    if (grid && t.gridVisible === false) grid.style.display = 'none';
    else if (grid && t.gridVisible === true) grid.style.display = 'block';

    // Scanline speed
    if (t.scanlineSpeed) {
      const sl = document.querySelector('.scanline');
      if (sl) sl.style.animationDuration = `${t.scanlineSpeed}s`;
    }

    // Animation speed multiplier
    if (t.animSpeed) {
      root.style.setProperty('--anim-speed', t.animSpeed);
    }

    // Particles
    if (t.particles !== false) spawnParticles(t.particleCount || 50);

    // Text bindings
    document.querySelectorAll('[data-cfg]').forEach(el => {
      const val = resolvePath(cfg, el.getAttribute('data-cfg'));
      if (val !== undefined && val !== null && val !== '') {
        if (el.tagName === 'INPUT') el.value = val;
        else el.textContent = val;
      }
    });

    document.querySelectorAll('[data-cfg-html]').forEach(el => {
      const val = resolvePath(cfg, el.getAttribute('data-cfg-html'));
      if (val !== undefined && val !== '') el.innerHTML = val;
    });

    document.querySelectorAll('[data-cfg-show]').forEach(el => {
      const val = resolvePath(cfg, el.getAttribute('data-cfg-show'));
      if (!val) el.style.display = 'none';
    });

    document.dispatchEvent(new CustomEvent('configReady', { detail: cfg }));
  }

  function hexToRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? { r: parseInt(r[1],16), g: parseInt(r[2],16), b: parseInt(r[3],16) } : null;
  }

  function resolvePath(obj, path) {
    return path.split('.').reduce((acc, key) => {
      if (acc == null) return undefined;
      return acc[isNaN(key) ? key : parseInt(key)];
    }, obj);
  }

  // ── PARTICLES ─────────────────────────────────────────────
  function spawnParticles(count) {
    const existing = document.querySelectorAll('.particle');
    existing.forEach(p => p.remove());
    const body = document.body;
    const base = getComputedStyle(document.documentElement).getPropertyValue('--cyan').trim() || '#02D9F9';
    const bright = getComputedStyle(document.documentElement).getPropertyValue('--cyan-bright').trim() || '#02FFFF';
    const colors = [base, bright, base, '#ffffff', base];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 2.5 + 0.8;
      const col = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        left:${Math.random()*100}%;
        width:${size}px;height:${size}px;
        background:${col};
        animation-duration:${Math.random()*14+10}s;
        animation-delay:${Math.random()*12}s;
        opacity:0;
        box-shadow:0 0 ${size*3}px ${col};
      `;
      body.appendChild(p);
    }
  }

  // ── CORNERS ───────────────────────────────────────────────
  window.renderCorners = function () {
    const cyan = getComputedStyle(document.documentElement).getPropertyValue('--cyan').trim() || '#02D9F9';
    const bright = getComputedStyle(document.documentElement).getPropertyValue('--cyan-bright').trim() || '#02FFFF';
    const svg = `<svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 L64 0 L64 2 L2 2 L2 64 L0 64 Z" fill="${cyan}" opacity="0.9"/>
      <path d="M0 0 L38 0 L38 1 L1 1 L1 38 L0 38 Z" fill="${bright}" opacity="0.5"/>
      <rect x="1" y="1" width="5" height="5" fill="${cyan}" opacity="0.9"/>
      <line x1="16" y1="0" x2="16" y2="8" stroke="${cyan}" stroke-width="0.8" opacity="0.5"/>
      <line x1="0" y1="16" x2="8" y2="16" stroke="${cyan}" stroke-width="0.8" opacity="0.5"/>
      <line x1="32" y1="0" x2="32" y2="4" stroke="${cyan}" stroke-width="0.6" opacity="0.3"/>
      <line x1="0" y1="32" x2="4" y2="32" stroke="${cyan}" stroke-width="0.6" opacity="0.3"/>
    </svg>`;
    document.querySelectorAll('.corner').forEach(el => el.innerHTML = svg);
  };

  // ── CLOCK ─────────────────────────────────────────────────
  window.startClock = function(el) {
    if (!el) return;
    const update = () => el.textContent = new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    update(); setInterval(update, 1000);
  };

  // ── BOOT ──────────────────────────────────────────────────
  window.addEventListener('DOMContentLoaded', function () {
    if (typeof CONFIG === 'undefined') { console.warn('[SkyFA] CONFIG manquant'); return; }
    const cfg = applyUrlParams(CONFIG);
    applyConfig(cfg);
    if (window.renderCorners) renderCorners();
    if (window.startClock) startClock(document.getElementById('clock'));
    window.STREAM_CONFIG = cfg;
  });

})();
