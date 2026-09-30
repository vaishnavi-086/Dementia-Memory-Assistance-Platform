/**
 * Smriti-Setu NER (স্মৃতি সেতু) Main Application Controller
 * Manages Tab Routing, Senior Accessibility Controls, Event Bindings, and State Sync
 */

class SmritiApp {
  constructor() {
    this.currentTab = 'home';
    this.fontScale = 'normal'; // 'normal', 'large', 'xlarge'
    this.isHighContrast = false;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindNavigation();
      this.bindAccessibility();
      this.bindModals();
      
      // Initialize sub-modules
      if (window.cognitiveGames) {
        window.cognitiveGames.initHeritageGame('easy');
        window.cognitiveGames.initSequenceGame(0);
        window.cognitiveGames.initAudioMelodyGame();
        window.cognitiveGames.initMazeCanvas();
      }

      if (window.reminiscenceStorybook) {
        window.reminiscenceStorybook.initStorybookUI();
      }

      if (window.cognitiveAssessment) {
        window.cognitiveAssessment.startAssessment();
      }

      if (window.caregiverHub) {
        window.caregiverHub.initDashboardUI();
      }
    });
  }

  bindNavigation() {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabTarget = btn.getAttribute('data-tab');
        if (tabTarget) {
          window.audioSynth.playTapFeedback();
          this.switchTab(tabTarget);
        }
      });
    });

    const langSelect = document.getElementById('globalLangSelect');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
        if (window.cognitiveGames) {
          window.cognitiveGames.initHeritageGame(window.cognitiveGames.currentDifficulty);
        }
        if (window.reminiscenceStorybook) {
          window.reminiscenceStorybook.renderCurrentPhoto();
        }
      });
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update active nav button
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update active pane
    document.querySelectorAll('.tab-pane').forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Sub-module refresh hooks
    if (tabId === 'games' && window.cognitiveGames) {
      window.cognitiveGames.initMazeCanvas();
      window.cognitiveGames.updateDDAStatusUI();
    } else if (tabId === 'caregiver' && window.caregiverHub) {
      window.caregiverHub.renderTrajectoryChart();
      window.caregiverHub.renderDDALogs();
      window.caregiverHub.renderRecentSessions();
      window.caregiverHub.renderReminderList();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bindAccessibility() {
    // Font Zoom Toggle
    const fontBtn = document.getElementById('btnFontScale');
    if (fontBtn) {
      fontBtn.addEventListener('click', () => {
        window.audioSynth.playTapFeedback();
        if (this.fontScale === 'normal') {
          this.fontScale = 'large';
          document.body.classList.add('font-size-large');
          document.body.classList.remove('font-size-xlarge');
          fontBtn.textContent = '🔍 A++';
        } else if (this.fontScale === 'large') {
          this.fontScale = 'xlarge';
          document.body.classList.remove('font-size-large');
          document.body.classList.add('font-size-xlarge');
          fontBtn.textContent = '🔍 A';
        } else {
          this.fontScale = 'normal';
          document.body.classList.remove('font-size-large', 'font-size-xlarge');
          fontBtn.textContent = '🔍 A+';
        }
      });
    }

    // High Contrast Mode Toggle
    const contrastBtn = document.getElementById('btnToggleContrast');
    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        window.audioSynth.playTapFeedback();
        this.isHighContrast = !this.isHighContrast;
        if (this.isHighContrast) {
          document.body.classList.add('theme-high-contrast');
          contrastBtn.classList.add('active');
        } else {
          document.body.classList.remove('theme-high-contrast');
          contrastBtn.classList.remove('active');
        }
      });
    }

    // Audio Mute Toggle
    const audioBtn = document.getElementById('btnToggleAudio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isMuted = window.audioSynth.toggleMute();
        audioBtn.textContent = isMuted ? '🔇 Audio Off' : '🔊 Audio On';
        if (isMuted) audioBtn.classList.remove('active');
        else audioBtn.classList.add('active');
      });
    }
  }

  bindModals() {
    // Add Photo Modal
    const openAddPhotoBtn = document.getElementById('btnOpenAddPhotoModal');
    const addPhotoModal = document.getElementById('addPhotoModal');
    const closeAddPhotoBtn = document.getElementById('btnCloseAddPhotoModal');
    const formAddPhoto = document.getElementById('formAddPhoto');

    if (openAddPhotoBtn && addPhotoModal) {
      openAddPhotoBtn.addEventListener('click', () => {
        addPhotoModal.classList.add('active');
      });
    }

    if (closeAddPhotoBtn && addPhotoModal) {
      closeAddPhotoBtn.addEventListener('click', () => {
        addPhotoModal.classList.remove('active');
      });
    }

    if (formAddPhoto) {
      formAddPhoto.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('photoTitleInput').value;
        const year = document.getElementById('photoYearInput').value;
        const tags = document.getElementById('photoTagsInput').value;

        if (title && window.reminiscenceStorybook) {
          window.reminiscenceStorybook.addNewFamilyMemory(title, year, tags);
          addPhotoModal.classList.remove('active');
          formAddPhoto.reset();
          window.audioSynth.playSuccessChime();
        }
      });
    }
  }
}

// Global application instance
window.app = new SmritiApp();
