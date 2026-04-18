# SkyFA FiveM Stream Overlay
**Thème Cyberpunk Cyan — #02D9F9 × #02FFFF**

Pack d'overlays professionnel pour lives FiveM Roleplay sur SkyFA.

---

## 📁 Fichiers

| Fichier | Description |
|---|---|
| `dashboard.html` | Interface de configuration & génération de liens OBS |
| `overlay_debut.html` | Écran de début de live |
| `overlay_enjeu.html` | HUD transparent en cours de jeu |
| `overlay_pause.html` | Écran de pause |
| `overlay_fin.html` | Écran de fin de live |
| `config.js` | **Fichier de configuration principal** |
| `shared.css` | Styles partagés (thème cyan SkyFA) |
| `shared.js` | Logique partagée |

---

## 🚀 Mise en place rapide

### Option A — Dashboard (recommandé)
1. Ouvre `dashboard.html` dans un navigateur
2. Remplis tes infos (pseudo, serveur, réseaux sociaux…)
3. Clique **Générer les liens**
4. Colle chaque URL dans OBS (Source → Navigateur, 1920×1080)

### Option B — Édition manuelle
Ouvre `config.js` et modifie directement les valeurs :

```js
streamer: {
  pseudo:  "SkyFA",       // Ton pseudo
  serveur: "SkyFA — FiveM RP",
  role:    "Streamer / Admin",
  contenu: "Roleplay FiveM",
},
socials: {
  twitch:  "twitch.tv/skyfa",
  discord: "discord.gg/skyfa",
  twitter: "@skyfa",
  youtube: "youtube.com/@skyfa",
},
```

---

## 🎨 Couleurs du thème

| Variable | Valeur | Usage |
|---|---|---|
| `--cyan` | `#02D9F9` | Couleur principale |
| `--cyan-bright` | `#02FFFF` | Accents & highlights |
| `--cyan-mid` | `#01b8d4` | Dégradés intermédiaires |
| `--cyan-dark` | `#017a8e` | Ombres & borders |

---

## ⚙️ OBS — Configuration recommandée

- **Source** : Navigateur
- **Résolution** : 1920 × 1080
- **FPS** : 60
- **`overlay_enjeu.html`** : activer "Transparence" (fond transparent)
- Tous les autres overlays : fond noir visible

---

## 🔧 Paramètres URL (avancé)

Tous les textes peuvent être écrasés via paramètres URL :

```
overlay_debut.html?pseudo=MonPseudo&serveur=MonServeur&debut_titre=GO+LIVE
```

Paramètres disponibles : `pseudo`, `serveur`, `role`, `contenu`, `twitch`, `discord`, `twitter`, `youtube`, `tiktok`, `debut_titre`, `debut_sousTitre`, `enjeu_obj1`, `enjeu_obj2`, `enjeu_cmd1-4`, `pause_sousTitre`, `pause_message`, `fin_titre`, `fin_cta`

---

**SkyFA FiveM Roleplay** — Overlay System v1.0
