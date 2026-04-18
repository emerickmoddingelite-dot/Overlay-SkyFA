/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║        SkyFA STREAM OVERLAY — FICHIER DE CONFIG          ║
 * ║   Modifie uniquement ce fichier pour tout personnaliser  ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  // ── IDENTITÉ ────────────────────────────────────────────────
  streamer: {
    pseudo:       "SkyFA",
    organisation: "SkyFA Community",       // Laisser vide pour masquer
    serveur:      "SkyFA — FiveM RP",
    role:         "Streamer / Admin",       // Rôle affiché
    contenu:      "Roleplay FiveM",         // Contenu du jour
  },

  // ── RÉSEAUX SOCIAUX ─────────────────────────────────────────
  socials: {
    twitch:   "twitch.tv/skyfa",
    discord:  "discord.gg/skyfa",
    twitter:  "@skyfa",
    youtube:  "youtube.com/@skyfa",
    tiktok:   "",                           // Laisser vide pour masquer
  },

  // ── TEXTES DES OVERLAYS ─────────────────────────────────────
  overlays: {

    debut: {
      titre:      "LE LIVE COMMENCE",
      sousTitre:  "Branche-toi, le RP commence",
      tagline:    "SkyFA • FiveM Roleplay",
      badge:      "EN DIRECT",
    },

    enjeu: {
      objectifTitre:  "Session en cours",
      objectifLigne1: "Roleplay FiveM",
      objectifLigne2: "Serveur : SkyFA RP",
      commandes: ["!discord", "!serveur", "!social", "!commandes"],
    },

    pause: {
      titre:      "PAUSE",
      sousTitre:  "De retour dans un instant…",
      message:    "Prends une pause, on revient vite !",
      contenuCarte: "FiveM RP",
    },

    fin: {
      titre:      "À BIENTÔT",
      sousTitre:  "Merci d'avoir regardé le live",
      message:    "On se retrouve très vite sur le serveur",
      cta:        "Rejoins le Discord SkyFA !",
    },

  },

  // ── THÈME VISUEL ────────────────────────────────────────────
  theme: {
    // Couleurs principales cyan SkyFA
    cyan:         "#02D9F9",
    cyanBright:   "#02FFFF",
    cyanDark:     "#017a8e",
    cyanDim:      "#014d5a",

    // Couleurs d'accent
    accent:       "#02FFFF",

    // Particules
    particles:    true,
    particleCount: 50,
  },

};

// Export pour les overlays
if (typeof module !== 'undefined') module.exports = CONFIG;
