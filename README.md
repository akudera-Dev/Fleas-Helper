# Silksong Flea Location Helper

## 🚀 Project Overview

This project is web tool designed to help players of "Hollow Knight: Silksong" track their progress in collecting "fleas". It parses save files to identify which fleas have been collected and provides links to Map Genie.

> **Note**: This project is currently a Work in Progress.

## ✅ Curent Result

<img src="./Preview.jpg" width="500"/>

## 🛠️ Technical Stack

<div>
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  </a>
  <a href="https://sass-lang.com/" target="_blank">
    <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS"/>
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  </a>
  <a href="https://nuxt.com/" target="_blank">
    <img src="https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxt&logoColor=00DC82" alt="Nuxt"/>
  </a>
  <a href="https://vuejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js"/>
  </a>
  <a href="https://vueuse.org/" target="_blank">
    <img src="https://img.shields.io/badge/VueUse-647EFF?style=for-the-badge&logo=vueuse&logoColor=white" alt="VueUse"/>
  </a>
  <a href="https://pinia.vuejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Pinia-F28D1A?style=for-the-badge&logo=pinia&logoColor=white" alt="Pinia"/>
  </a>
</div>

## 🗺️ Features & Roadmap

### 1. Save File Parsing

- [x] **PC Save Files**: Decrypts and parses encrypted PC save files (Handles custom C# headers, Base64 encoding, and AES decryption).
- [x] **Drag and Drop Interface**: Users can drag and drop their save file directly onto the page.

### 2. Flea Collection Tracking

- [x] **Data Extraction**: Extract `SavedFlea_` keys from the `playerData` object _(From Save File)_.
- [x] **Status Display**: Display a list of all tracked fleas with their current status (Found ✓ / Missing ✗).

### 3. Map Integration

- [x] **Map Genie Links**: Direct links to specific locations on Map Genie for each flea.
- [x] **Missing Flea Summary**: A section summarizing all missing fleas with a "View All" map link.

### 4. User Interface

- [x] **Visual Feedback**: Clear icons, status indicators, and filter buttons (All/Found/Missing).
- [x] **Error Handling**: Robust error messages for invalid or corrupted files.
- [x] **Modern Design**: game theme look.
- [ ] **Progress Bar**: Visual indicator of overall progress (e.g., "20/27 Fleas Found").
- [x] **Responsive Design**: Mobile-friendly layout.

### 5. Advanced Features (Planned)

- [ ] **Local Storage**: Save last file.
- [ ] **PWA Support**: Installable as an offline-capable app.
