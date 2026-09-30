/**
 * Smriti-Setu NER (স্মৃতি সেতু) Culturally Tailored Cognitive Games Suite
 * Designed with Geriatric Ergonomics, Zero-Anxiety Mechanics, and Dynamic Difficulty Adjustment (DDA)
 */

class CognitiveGamesManager {
  constructor() {
    this.currentGame = 'heritage';
    this.gameScore = 0;
    this.matchedPairs = 0;
    this.totalPairs = 4;
    this.flippedTiles = [];
    this.isTileLocked = false;
    this.currentDifficulty = 'easy'; // 'easy' (4 cards / 2 pairs), 'medium' (8 cards / 4 pairs), 'hard' (12 cards / 6 pairs), 'expert' (16 cards / 8 pairs)
    
    // Performance & DDA Telemetry
    this.movesCount = 0;
    this.startTime = null;
    this.timerInterval = null;
    this.elapsedSeconds = 0;
    this.consecutiveMistakes = 0;
    this.winStreak = 0;
    this.ddaAutoMode = true; // AI Dynamic Difficulty Adjustment active
    this.struggleThreshold = 3; // 3 consecutive wrong flips triggers gentle hint
    this.activeHintTimer = null;

    // Heritage Tile Dataset with regional icons and multilingual captions
    this.heritageTilesMaster = [
      { id: 'rhino', icon: '🦏', labelEn: 'Kaziranga Rhino', labelAs: 'এশিঙীয়া গঁড়', labelMni: 'ꯁꯪꯒꯥꯏ', labelMizo: 'Ramsa Hmingthang', labelBn: 'একশৃঙ্গ গণ্ডার', labelHi: 'काजीरंगा गैंडा' },
      { id: 'tea', icon: '🍃', labelEn: 'Assam Tea Leaves', labelAs: 'অসমৰ চাহপাত', labelMni: 'ꯆꯥ ꯃꯅꯥ', labelMizo: 'Thingpui Hnah', labelBn: 'আসামের চা পাতা', labelHi: 'असम चाय पत्ती' },
      { id: 'gamusa', icon: '🧣', labelEn: 'Assam Gamusa', labelAs: 'ফুলাম গামোচা', labelMni: 'ꯈꯨꯗꯩ', labelMizo: 'Mizo Puan', labelBn: 'গামছা', labelHi: 'असम गमोसा' },
      { id: 'hornbill', icon: '🦅', labelEn: 'Great Hornbill', labelAs: 'ধনেশ পক্ষী', labelMni: 'ꯎꯆꯦꯛ', labelMizo: 'Vahai', labelBn: 'ধনেশ পাখি', labelHi: 'हॉर्नबिल पक्षी' },
      { id: 'dhol', icon: '🥁', labelEn: 'Bihu Dhol', labelAs: 'বিহুৰ ঢোল', labelMni: 'ꯃꯅꯤꯄꯨꯔꯤ ꯄꯨꯡ', labelMizo: 'Hnam Khuang', labelBn: 'ঢোল', labelHi: 'बिहू ढोल' },
      { id: 'bridge', icon: '🌉', labelEn: 'Living Root Bridge', labelAs: 'জীৱন্ত শিপাৰ দলং', labelMni: 'ꯊꯣꯡ', labelMizo: 'Jingkieng Jri', labelBn: 'জীবন্ত মূল সেতু', labelHi: 'जीवंत जड़ पुल' },
      { id: 'pitha', icon: '🥟', labelEn: 'Traditional Pitha', labelAs: 'ঘিলা পিঠা', labelMni: 'ꯆꯥꯛꯍꯥꯎ ꯈꯦꯆꯨ', labelMizo: 'Chhang Ban', labelBn: 'পিঠে', labelHi: 'पारंपरिक पीठा' },
      { id: 'orchid', icon: '🌸', labelEn: 'Foxtail Orchid (Kopou)', labelAs: 'কপৌ ফুল', labelMni: 'ꯂꯩꯔꯥꯡ', labelMizo: 'Pangpar Mawi', labelBn: 'কপৌ ফুল', labelHi: 'फॉक्सटेल आर्किड' }
    ];

    // Sequence Puzzle Scenarios
    this.sequenceScenarios = [
      {
        id: 'tea_making',
        titleEn: 'Brewing Traditional Assam Spiced Tea',
        titleAs: 'সোৱাদ লগা অসমৰ ৰঙা চাহ বনোৱা',
        titleBn: 'ঐতিহ্যবাহী আসাম চা তৈরি',
        titleHi: 'पारंपरिक असमिया मसाला चाय बनाना',
        steps: [
          { order: 1, textEn: 'Boil fresh pure water in a kettle', textAs: 'কেটলিত নিৰ্মল পানী উতলাওক', textBn: 'কেটলিতে খাঁটি জল ফোটান', textHi: 'केतली में ताजा पानी उबालें' },
          { order: 2, textEn: 'Add crushed ginger and aromatic tea leaves', textAs: 'থেতেলিয়াই লোৱা আদা আৰু চাহপাত দিয়ক', textBn: 'আদা ও আসাম চা পাতা দিন', textHi: 'कुटी हुई अदरक और चाय पत्ती डालें' },
          { order: 3, textEn: 'Simmer gently until rich golden color appears', textAs: 'ধীৰ জুয়েৰে ৰঙচুৱা ৰং আৰু সুবাস অহালৈ উতলাওক', textBn: 'সুন্দর সোনালী রঙ আসা পর্যন্ত ফুটান', textHi: 'धीमी आंच पर सुनहरा रंग आने तक उबालें' },
          { order: 4, textEn: 'Strain into a traditional bell-metal cup', textAs: 'কাঁহৰ বাটিত চাকি মৰমেৰে পৰিৱেশন কৰক', textBn: 'কাঁসার কাপে ছেঁকে পরিবেশন করুন', textHi: 'पारंपरिक कांसे के कप में छानकर परोसें' }
        ]
      },
      {
        id: 'orchid_care',
        titleEn: 'Caring for Northeast Wild Orchids',
        titleAs: 'বনাঞ্চলৰ কপৌ ফুলৰ যতন লোৱা',
        titleBn: 'বুনো অর্কিডের যত্ন নেওয়া',
        titleHi: 'जंगली आर्किड की देखभाल करना',
        steps: [
          { order: 1, textEn: 'Inspect the tree-bark moss base', textAs: 'গছৰ বাকলিৰ কোমল শেলাই পৰীক্ষা কৰক', textBn: 'গাছের বাকলের শ্যাওলা পরীক্ষা করুন', textHi: 'पेड़ की छाल और काई की जांच करें' },
          { order: 2, textEn: 'Gently mist the orchid roots with rainwater', textAs: 'বৰষুণৰ পানীৰে শিপাবোৰ তিয়াই দিয়ক', textBn: 'বৃষ্টির জল দিয়ে শিকড় ভিজিয়ে দিন', textHi: 'बारिश के पानी से जड़ों पर हल्का छिड़काव करें' },
          { order: 3, textEn: 'Place under morning filtered sunlight on the verandah', textAs: 'চৰাঘৰৰ কোমল ৰদত আলফুলে ৰাখক', textBn: 'বারান্দার মিষ্টি রোদে আলতো করে রাখুন', textHi: 'बरामदे में सुबह की मीठी धूप में रखें' }
        ]
      },
      {
        id: 'morning_routine',
        titleEn: 'Calm Morning Verandah Routine',
        titleAs: 'পুৱাৰ চৰাঘৰৰ শান্ত পৰিৱেশ',
        titleBn: 'ভোরের বারান্দার সুন্দর নিয়ম',
        titleHi: 'सुबह बरामदे की शांत दिनचर्या',
        steps: [
          { order: 1, textEn: 'Wake up gently and drink a glass of warm water', textAs: 'শুই উঠি এগিলাচ কুহুমীয়া পানী খাওক', textBn: 'ঘুম থেকে উঠে এক গ্লাস উষ্ণ জল পান করুন', textHi: 'उठकर एक गिलास गुनगुना पानी पिएं' },
          { order: 2, textEn: 'Do gentle breathing exercises while listening to birds', textAs: 'চৰাইৰ গান শুনি প্ৰাণায়াম আৰু উশাহ-নিশাহৰ ব্যায়াম কৰক', textBn: 'পাখির ডাক শুনতে শুনতে হালকা প্রাণায়াম করুন', textHi: 'पक्षियों की चहचहाहट के साथ हल्का प्राणायाम करें' },
          { order: 3, textEn: 'Take morning prescribed blood pressure medicine', textAs: 'ৰাতিপুৱাৰ প্ৰেচাৰৰ দৰবখিনি সময়মতে খাওক', textBn: 'সকালের রক্তচাপের ওষুধ নিয়মিত গ্রহণ করুন', textHi: 'सुबह की ब्लड प्रेशर की दवा समय पर लें' },
          { order: 4, textEn: 'Enjoy a warm cup of tea with family', textAs: 'পৰিয়ালৰ সৈতে সোৱাদভৰা চাহ উপভোগ কৰক', textBn: 'পরিবারের সাথে এক কাপ গরম চা উপভোগ করুন', textHi: 'परिवार के साथ गरमा-गरम चाय का आनंद लें' }
        ]
      }
    ];

    // Auditory Melody Game Data
    this.audioQuestions = [
      {
        type: 'flute',
        promptEn: 'Listen carefully: Which traditional wind instrument is playing?',
        promptAs: 'মন দি শুনক: এইটো কি বাদ্যৰ সুৰ?',
        promptBn: 'মন দিয়ে শুনুন: এটি কোন বাদ্যযন্ত্রের সুর?',
        promptHi: 'ध्यान से सुनें: यह कौन सा पारंपरिक वाद्य यंत्र है?',
        correctAnswer: 'flute',
        options: [
          { id: 'flute', labelEn: '🌿 Bamboo Flute / Bihu Pepa', labelAs: '🌿 অসমৰ বাঁহী / ম’হৰ শিঙৰ পেঁপা', icon: '🪈' },
          { id: 'dhol', labelEn: '🥁 Folk Dhol Drum', labelAs: '🥁 বিহুৰ ঢোল', icon: '🥁' },
          { id: 'rain', labelEn: '🌧️ Cherrapunji Rain', labelAs: '🌧️ চেৰাপুঞ্জীৰ বৰষুণ', icon: '🌧️' }
        ]
      },
      {
        type: 'dhol',
        promptEn: 'Listen to the heartbeat rhythm: Which percussion instrument is this?',
        promptAs: 'এই ঢপ-ঢপ তালটো কিহৰ শব্দ?',
        promptBn: 'এই বাজনার তালটি কোন বাদ্যযন্ত্রের?',
        promptHi: 'यह ताल किस वाद्य यंत्र की है?',
        correctAnswer: 'dhol',
        options: [
          { id: 'dhol', labelEn: '🥁 Bihu & Folk Dhol', labelAs: '🥁 বিহুৰ ঢোলৰ চাপৰ', icon: '🥁' },
          { id: 'birds', labelEn: '🐦 Forest Birds', labelAs: '🐦 হাবিৰ চৰাইৰ মাত', icon: '🐦' },
          { id: 'pena', labelEn: '🎻 Manipuri Pena String', labelAs: '🎻 মণিপুৰী পেনাৰ সুৰ', icon: '🎻' }
        ]
      },
      {
        type: 'rain',
        promptEn: 'Close your eyes: What soothing sound of nature is this?',
        promptAs: 'চকুহাল মুদি শুনক: প্ৰকৃতিৰ কি শান্তিজনক শব্দ এইটো?',
        promptBn: 'চোখ বন্ধ করে শুনুন: প্রকৃতির কোন শান্ত শব্দ এটি?',
        promptHi: 'आंखें बंद करके सुनें: यह प्रकृति की कौन सी शांत ध्वनि है?',
        correctAnswer: 'rain',
        options: [
          { id: 'rain', labelEn: '🌧️ Rain on Hilltop Verandah', labelAs: '🌧️ পাহাৰৰ টিনপাতত বৰষুণৰ শব্দ', icon: '🌧️' },
          { id: 'flute', labelEn: '🪈 Hill Bamboo Flute', labelAs: '🪈 বাঁহৰ বাঁহী', icon: '🪈' },
          { id: 'birds', labelEn: '🐦 Morning Sparrows', labelAs: '🐦 পুৱাৰ চৰাইৰ গান', icon: '🐦' }
        ]
      }
    ];

    this.currentAudioQuestionIdx = 0;
  }

  /* =========================================================================
     DYNAMIC DIFFICULTY ADJUSTMENT (DDA) ENGINE
     ========================================================================= */

  /**
   * Evaluates player performance and dynamically adapts game difficulty
   * @param {Object} metrics { moves, timeSec, errors, won }
   */
  evaluateDDA(metrics) {
    if (!this.ddaAutoMode) return;

    let adaptationReason = "";
    let previousDifficulty = this.currentDifficulty;

    // Winning scenario
    if (metrics.won) {
      this.winStreak++;
      const timePerPair = metrics.timeSec / Math.max(1, this.totalPairs);

      // Fast completion & high accuracy -> Increase difficulty
      if (metrics.errors <= 2 && timePerPair < 6) {
        if (this.currentDifficulty === 'easy') {
          this.currentDifficulty = 'medium';
          adaptationReason = "Superb recall speed! AI upgraded level to 8 cards (Medium).";
        } else if (this.currentDifficulty === 'medium' && this.winStreak >= 2) {
          this.currentDifficulty = 'hard';
          adaptationReason = "Masterful performance! AI upgraded level to 12 cards (Advanced).";
        }
      }
    } else {
      // Struggling scenario (during game or abandoned)
      this.winStreak = 0;
      if (this.consecutiveMistakes >= this.struggleThreshold) {
        // Provide immediate visual hint
        this.triggerStruggleHint();

        if (this.currentDifficulty === 'hard') {
          this.currentDifficulty = 'medium';
          adaptationReason = "AI relaxed difficulty to 8 cards for a more comfortable experience.";
        } else if (this.currentDifficulty === 'medium') {
          this.currentDifficulty = 'easy';
          adaptationReason = "AI adapted to 4 cards (Gentle Mode) to ease cognitive load.";
        }
      }
    }

    if (adaptationReason) {
      this.updateDDAStatusUI(adaptationReason);
      if (window.caregiverHub) {
        window.caregiverHub.logDDAEvent({
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          game: 'Heritage Tile Match',
          from: previousDifficulty,
          to: this.currentDifficulty,
          reason: adaptationReason
        });
      }
    }
  }

  /**
   * Provides a soothing, gentle visual pulse hint for dementia elders when stuck
   */
  triggerStruggleHint() {
    const unrevealedTiles = Array.from(document.querySelectorAll('.memory-tile:not(.matched)'));
    if (unrevealedTiles.length < 2) return;

    // Find a matching pair among unrevealed tiles
    const idMap = {};
    let matchPair = null;
    for (let tile of unrevealedTiles) {
      const id = tile.dataset.id;
      if (idMap[id]) {
        matchPair = [idMap[id], tile];
        break;
      }
      idMap[id] = tile;
    }

    if (matchPair) {
      matchPair.forEach(t => t.classList.add('dda-hint-pulse'));
      this.showCelebrationBanner(currentLanguage === 'as' ? "💡 এয়া চাওক, এটা মৰমৰ সংকেত!" : "💡 Look closely, here is a gentle hint!");
      window.speechEngine.speak(currentLanguage === 'as' ? "চিন্তা নকৰিব, আপোনাক সহায় কৰিবলৈ চিনাকী ছবিখন আলোকিত কৰা হৈছে।" : "Take your time, here is a gentle helper hint.");
      
      setTimeout(() => {
        matchPair.forEach(t => t.classList.remove('dda-hint-pulse'));
      }, 3500);
    }
  }

  updateDDAStatusUI(message) {
    const ddaStatusEl = document.getElementById('ddaStatusMessage');
    const ddaPillEl = document.getElementById('ddaCurrentLevelPill');

    const levelLabels = {
      'easy': '🟢 Gentle (4 Cards)',
      'medium': '🟡 Moderate (8 Cards)',
      'hard': '🟣 Advanced (12 Cards)',
      'expert': '⭐ Master (16 Cards)'
    };

    if (ddaPillEl) {
      ddaPillEl.textContent = levelLabels[this.currentDifficulty] || this.currentDifficulty;
    }
    if (ddaStatusEl && message) {
      ddaStatusEl.textContent = `✨ AI Adapt: ${message}`;
      ddaStatusEl.classList.add('highlight-update');
      setTimeout(() => ddaStatusEl.classList.remove('highlight-update'), 4000);
    }
  }

  toggleDDAMode() {
    this.ddaAutoMode = !this.ddaAutoMode;
    const btn = document.getElementById('btnToggleDDA');
    if (btn) {
      btn.textContent = this.ddaAutoMode ? '⚡ AI DDA: Active' : '⚡ AI DDA: Manual';
      btn.classList.toggle('active', this.ddaAutoMode);
    }
    this.updateDDAStatusUI(this.ddaAutoMode ? "Automatic Dynamic Difficulty Tuning is enabled." : "Manual difficulty mode engaged.");
  }

  /* =========================================================================
     GAME 1: HERITAGE TILE MATCH (Card Matching Memory Game)
     ========================================================================= */
  initHeritageGame(difficulty = null) {
    if (difficulty) {
      this.currentDifficulty = difficulty;
    }

    // Determine pair counts based on difficulty
    const difficultyPairsMap = {
      'easy': 2,     // 4 cards
      'medium': 4,   // 8 cards
      'hard': 6,     // 12 cards
      'expert': 8    // 16 cards
    };

    this.totalPairs = difficultyPairsMap[this.currentDifficulty] || 4;
    this.matchedPairs = 0;
    this.flippedTiles = [];
    this.isTileLocked = false;
    this.gameScore = 0;
    this.movesCount = 0;
    this.consecutiveMistakes = 0;
    this.elapsedSeconds = 0;

    // Reset & start timer
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      const timerEl = document.getElementById('heritageTimer');
      if (timerEl) {
        const mins = Math.floor(this.elapsedSeconds / 60);
        const secs = this.elapsedSeconds % 60;
        timerEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }

      // Check for prolonged inactivity (elder struggle detection)
      if (this.elapsedSeconds > 25 && this.matchedPairs === 0 && this.movesCount === 0) {
        // Prompt gentle encouragement
        if (!this.promptedInactivity) {
          this.promptedInactivity = true;
          window.speechEngine.speak(currentLanguage === 'as' ? "যিকোনো এখন কাৰ্ডত স্পৰ্শ কৰি আৰম্ভ কৰক।" : "Tap any card to begin our gentle memory game.");
        }
      }
    }, 1000);
    this.promptedInactivity = false;

    const board = document.getElementById('heritageGameBoard');
    if (!board) return;
    board.innerHTML = '';

    // Adjust grid columns based on card count
    if (this.totalPairs === 2) {
      board.style.gridTemplateColumns = 'repeat(2, 1fr)';
      board.style.maxWidth = '460px';
    } else if (this.totalPairs === 4) {
      board.style.gridTemplateColumns = 'repeat(4, 1fr)';
      board.style.maxWidth = '780px';
    } else if (this.totalPairs === 6) {
      board.style.gridTemplateColumns = 'repeat(4, 1fr)';
      board.style.maxWidth = '840px';
    } else {
      board.style.gridTemplateColumns = 'repeat(4, 1fr)';
      board.style.maxWidth = '920px';
    }

    // Select subset of tiles
    const selected = this.heritageTilesMaster.slice(0, this.totalPairs);
    // Duplicate to form pairs
    let deck = [...selected, ...selected];
    // Gentle shuffle
    deck.sort(() => Math.random() - 0.5);

    deck.forEach((tileData, index) => {
      const tileEl = document.createElement('div');
      tileEl.className = 'memory-tile';
      tileEl.dataset.id = tileData.id;
      tileEl.dataset.index = index;
      tileEl.setAttribute('role', 'button');
      tileEl.setAttribute('aria-label', 'Memory Card');

      const label = currentLanguage === 'as' ? tileData.labelAs : 
                    currentLanguage === 'mni' ? tileData.labelMni :
                    currentLanguage === 'mizo' ? tileData.labelMizo :
                    currentLanguage === 'bn' ? (tileData.labelBn || tileData.labelEn) :
                    currentLanguage === 'hi' ? (tileData.labelHi || tileData.labelEn) : tileData.labelEn;

      tileEl.innerHTML = `
        <div class="tile-hidden-symbol">🌿</div>
        <div class="tile-content" style="display:none; flex-direction:column; align-items:center;">
          <div class="tile-icon">${tileData.icon}</div>
          <div class="tile-label">${label}</div>
        </div>
      `;

      tileEl.addEventListener('click', () => this.handleTileClick(tileEl, tileData));
      board.appendChild(tileEl);
    });

    this.updateGameStatsUI();
    this.updateDDAStatusUI();
  }

  handleTileClick(tileEl, tileData) {
    if (this.isTileLocked || tileEl.classList.contains('matched') || tileEl.classList.contains('revealed')) {
      return;
    }

    window.audioSynth.playTapFeedback();

    // Reveal tile
    tileEl.classList.add('revealed');
    tileEl.querySelector('.tile-hidden-symbol').style.display = 'none';
    tileEl.querySelector('.tile-content').style.display = 'flex';

    this.flippedTiles.push({ el: tileEl, data: tileData });

    if (this.flippedTiles.length === 2) {
      this.movesCount++;
      this.checkTileMatch();
    }
  }

  checkTileMatch() {
    this.isTileLocked = true;
    const [tile1, tile2] = this.flippedTiles;

    if (tile1.data.id === tile2.data.id) {
      // Match found!
      this.consecutiveMistakes = 0;
      setTimeout(() => {
        tile1.el.classList.add('matched');
        tile2.el.classList.add('matched');
        this.matchedPairs++;
        this.gameScore += 120;
        
        window.audioSynth.playSuccessChime();
        const praise = currentLanguage === 'as' ? 'বৰ সুন্দৰ! মিলি গ’ল!' : 'Wonderful match!';
        this.showCelebrationBanner("✨ " + praise);

        this.flippedTiles = [];
        this.isTileLocked = false;
        this.updateGameStatsUI();

        if (this.matchedPairs === this.totalPairs) {
          this.handleGameComplete();
        }
      }, 350);
    } else {
      // No match - gentle flip back
      this.consecutiveMistakes++;
      if (this.consecutiveMistakes >= this.struggleThreshold) {
        this.evaluateDDA({ won: false, errors: this.consecutiveMistakes, timeSec: this.elapsedSeconds });
      }

      setTimeout(() => {
        tile1.el.classList.remove('revealed');
        tile1.el.querySelector('.tile-hidden-symbol').style.display = 'block';
        tile1.el.querySelector('.tile-content').style.display = 'none';

        tile2.el.classList.remove('revealed');
        tile2.el.querySelector('.tile-hidden-symbol').style.display = 'block';
        tile2.el.querySelector('.tile-content').style.display = 'none';

        this.flippedTiles = [];
        this.isTileLocked = false;
        this.updateGameStatsUI();
      }, 1100);
    }
  }

  updateGameStatsUI() {
    const pairsEl = document.getElementById('heritageMatchedPairs');
    const scoreEl = document.getElementById('heritageScore');
    const movesEl = document.getElementById('heritageMoves');

    if (pairsEl) pairsEl.textContent = `${this.matchedPairs} / ${this.totalPairs}`;
    if (scoreEl) scoreEl.textContent = this.gameScore;
    if (movesEl) movesEl.textContent = this.movesCount;
  }

  handleGameComplete() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    const completionTimeSec = this.elapsedSeconds;
    const praise = currentLanguage === 'as' 
      ? `অভিনন্দন! আপুনি ${completionTimeSec} ছেকেণ্ডত সকলোবোৰ ছবি সুন্দৰকৈ মিলালে!`
      : `Congratulations! You matched all pairs in ${completionTimeSec} seconds!`;
    
    window.speechEngine.speak(praise);
    this.showCelebrationBanner("🏆 " + praise);

    // Dynamic Difficulty Adjustment evaluation
    this.evaluateDDA({
      won: true,
      timeSec: completionTimeSec,
      moves: this.movesCount,
      errors: Math.max(0, this.movesCount - this.totalPairs)
    });

    // Record cognitive milestone to Caregiver Hub
    if (window.caregiverHub) {
      window.caregiverHub.recordSessionActivity(
        'Heritage Match',
        this.gameScore,
        this.totalPairs,
        completionTimeSec,
        this.currentDifficulty
      );
    }
  }

  /* =========================================================================
     GAME 2: DAILY LIVING SEQUENCE PUZZLE ("Smriti-Dhara" Routine Ordering)
     ========================================================================= */
  initSequenceGame(scenarioIndex = 0) {
    const scenario = this.sequenceScenarios[scenarioIndex] || this.sequenceScenarios[0];
    const container = document.getElementById('sequenceGameContainer');
    if (!container) return;

    this.currentScenarioIndex = scenarioIndex;
    const title = currentLanguage === 'as' ? scenario.titleAs : 
                  currentLanguage === 'bn' ? (scenario.titleBn || scenario.titleEn) :
                  currentLanguage === 'hi' ? (scenario.titleHi || scenario.titleEn) : scenario.titleEn;

    let stepsShuffled = [...scenario.steps].sort(() => Math.random() - 0.5);

    let html = `
      <div class="sequence-prompt-box">
        <div style="display:flex; align-items:center; gap:0.8rem;">
          <span style="font-size:1.8rem;">☕</span>
          <div>
            <div style="font-size:0.85rem; font-weight:700; color:var(--primary-600); text-transform:uppercase; letter-spacing:0.05em;">
              ${currentLanguage === 'as' ? 'দৈনন্দিন স্মৃতি অনুশীলন' : 'Daily Life Routine Ordering'}
            </div>
            <h3 style="font-size:1.35rem; color:var(--text-primary); margin:0;">${title}</h3>
          </div>
        </div>
        <button class="btn-game-action" onclick="window.cognitiveGames.speakSequenceTitle('${title.replace(/'/g, "\\'")}')">
          🔊 ${currentLanguage === 'as' ? 'শুনক' : 'Listen'}
        </button>
      </div>
      
      <p style="margin:1rem 0; font-weight:700; font-size:1.05rem; color:var(--text-secondary);">
        ${currentLanguage === 'as' ? '👉 তলৰ কামবোৰ প্ৰথমৰ পৰা শেষলৈ ক্রমানুসাৰে নিৰ্বাচন কৰক:' : '👉 Tap the steps in order from first to last to complete the routine:'}
      </p>
      
      <div class="sequence-slots-container" id="sequenceSlotsArea">
    `;

    stepsShuffled.forEach((step, idx) => {
      const stepText = currentLanguage === 'as' ? step.textAs : 
                        currentLanguage === 'bn' ? (step.textBn || step.textEn) :
                        currentLanguage === 'hi' ? (step.textHi || step.textEn) : step.textEn;
      html += `
        <div class="sequence-card-item" data-order="${step.order}" onclick="window.cognitiveGames.handleSequenceStepClick(this)">
          <div class="sequence-step-number">?</div>
          <div class="sequence-step-text">${stepText}</div>
          <button class="toolbar-btn" style="min-height:44px; font-size:1.2rem;" title="Listen to step" onclick="event.stopPropagation(); window.speechEngine.speak('${stepText.replace(/'/g, "\\'")}')">🔊</button>
        </div>
      `;
    });

    html += `</div>
      <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem; flex-wrap:wrap;">
        <button class="btn-hero-primary" onclick="window.cognitiveGames.initSequenceGame(${scenarioIndex})">
          🔄 ${currentLanguage === 'as' ? 'নতুনকৈ সজাওক' : 'Reset Steps'}
        </button>
        <button class="toolbar-btn" onclick="window.cognitiveGames.initSequenceGame((${(scenarioIndex + 1)} % ${this.sequenceScenarios.length}))">
          ⏭️ ${currentLanguage === 'as' ? 'পৰৱৰ্তী ৰুটিন' : 'Next Routine'}
        </button>
      </div>
    `;

    container.innerHTML = html;
    this.currentExpectedStep = 1;
    this.currentTotalSteps = scenario.steps.length;
  }

  speakSequenceTitle(text) {
    window.speechEngine.speak(text);
  }

  handleSequenceStepClick(cardEl) {
    const order = parseInt(cardEl.dataset.order, 10);

    if (order === this.currentExpectedStep) {
      // Correct step selected!
      window.audioSynth.playSuccessChime();
      cardEl.classList.add('correct-step');
      cardEl.querySelector('.sequence-step-number').textContent = `✓ ${this.currentExpectedStep}`;
      cardEl.style.pointerEvents = 'none';

      this.currentExpectedStep++;

      if (this.currentExpectedStep > this.currentTotalSteps) {
        // Complete!
        const successMsg = currentLanguage === 'as' 
          ? "অসাধাৰণ! আপুনি এই দৈনন্দিন নিয়মটো সম্পূৰ্ণ নিখুঁতভাৱে সজালে!"
          : "Splendid! You sequenced every routine step perfectly in order!";
        this.showCelebrationBanner("☕ " + successMsg);
        window.speechEngine.speak(successMsg);

        if (window.caregiverHub) {
          window.caregiverHub.recordSessionActivity('Routine Sequence', 150, this.currentTotalSteps, 15, 'adaptive');
        }
      }
    } else {
      // Gentle encouragement on wrong step (zero-anxiety design)
      window.audioSynth.playTapFeedback();
      cardEl.style.borderColor = 'var(--status-mci)';
      setTimeout(() => {
        cardEl.style.borderColor = 'var(--border-subtle)';
      }, 800);
      window.speechEngine.speak(currentLanguage === 'as' ? "চিন্তা নকৰিব, কোনটো কাম আগতে কৰিব লাগে ভাবি চাওক।" : "Take your time. Let us think which step comes first.");
    }
  }

  /* =========================================================================
     GAME 3: AUDITORY FOLK MELODY RECALL (Auditory Memory & Nostalgia)
     ========================================================================= */
  initAudioMelodyGame() {
    this.renderCurrentAudioQuestion();
  }

  renderCurrentAudioQuestion() {
    const container = document.getElementById('audioMelodyGameContainer');
    if (!container) return;

    const q = this.audioQuestions[this.currentAudioQuestionIdx];
    const promptText = currentLanguage === 'as' ? q.promptAs : 
                       currentLanguage === 'bn' ? (q.promptBn || q.promptEn) :
                       currentLanguage === 'hi' ? (q.promptHi || q.promptEn) : q.promptEn;

    let optionsHtml = '';
    q.options.forEach(opt => {
      const label = currentLanguage === 'as' ? opt.labelAs : opt.labelEn;
      optionsHtml += `
        <button class="audio-choice-btn" onclick="window.cognitiveGames.handleAudioAnswer('${opt.id}', '${q.correctAnswer}')">
          <span style="font-size:2.5rem;">${opt.icon}</span>
          <span>${label}</span>
        </button>
      `;
    });

    container.innerHTML = `
      <div class="audio-game-wrapper">
        <h4 style="font-size:1.35rem; color:var(--primary-600); margin-bottom:0.8rem;">
          ${promptText}
        </h4>
        <button id="btnPlaySoundLarge" class="audio-play-large-btn" onclick="window.cognitiveGames.playQuestionSound('${q.type}')" title="Play Regional Instrument Audio">
          🔊
        </button>
        <p style="color:var(--text-muted); font-weight:700; margin-bottom:1.5rem;">
          ${currentLanguage === 'as' ? 'সুৰটো শুনিবলৈ গোল বুটামত স্পৰ্শ কৰক' : 'Tap the circle button to play the regional instrument sound'}
        </p>
        <div class="audio-options-grid">
          ${optionsHtml}
        </div>
      </div>
    `;

    window.speechEngine.speak(promptText);
  }

  playQuestionSound(soundType) {
    const btn = document.getElementById('btnPlaySoundLarge');
    if (btn) btn.classList.add('playing');

    window.audioSynth.playRegionalSound(soundType, 4.0);

    setTimeout(() => {
      if (btn) btn.classList.remove('playing');
    }, 4000);
  }

  handleAudioAnswer(selectedId, correctId) {
    if (selectedId === correctId) {
      window.audioSynth.playSuccessChime();
      const praise = currentLanguage === 'as' ? "সঠিক উত্তৰ! আপোনাৰ কাণ আৰু স্মৃতি বৰ তীক্ষ্ণ!" : "Correct! You recognized the melody wonderfully!";
      this.showCelebrationBanner("🎵 " + praise);
      window.speechEngine.speak(praise);

      setTimeout(() => {
        this.currentAudioQuestionIdx = (this.currentAudioQuestionIdx + 1) % this.audioQuestions.length;
        this.renderCurrentAudioQuestion();
      }, 2200);

      if (window.caregiverHub) {
        window.caregiverHub.recordSessionActivity('Auditory Recall', 100, 2, 8, 'standard');
      }
    } else {
      window.audioSynth.playTapFeedback();
      window.speechEngine.speak(currentLanguage === 'as' ? "আকৌ এবাৰ মন দি শুনকচোন।" : "Let us listen to the soothing sound once again.");
    }
  }

  /* =========================================================================
     GAME 4: SPATIAL TEA-GARDEN PATH TRACING (Visuospatial Orientation)
     ========================================================================= */
  initMazeCanvas() {
    const canvas = document.getElementById('mazeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background soft tea garden grid
    ctx.fillStyle = '#f0fdf4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pathway walls
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(250, 80);
    ctx.lineTo(250, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 320);
    ctx.lineTo(400, 320);
    ctx.stroke();

    // Start point (Verandah)
    ctx.font = '28px sans-serif';
    ctx.fillText('🏡', 20, 50);

    // Goal point (Tea Garden Gazebo)
    ctx.font = '28px sans-serif';
    ctx.fillText('🍵', 340, 370);

    this.setupMazeInteractions(canvas, ctx);
  }

  setupMazeInteractions(canvas, ctx) {
    let isDrawing = false;
    let lastX = 0, lastY = 0;

    const startDraw = (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      lastY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastX = x;
      lastY = y;

      // Check if reached goal area
      if (x > 320 && y > 330) {
        isDrawing = false;
        window.audioSynth.playSuccessChime();
        this.showCelebrationBanner("🌿 " + (currentLanguage === 'as' ? 'আপুনি চাহ বাগিচাত সুন্দৰকৈ উপনীত হ’ল!' : 'You reached the serene tea gazebo!'));
        window.speechEngine.speak(currentLanguage === 'as' ? 'বৰ সুন্দৰকৈ বাট বিচাৰি পালে!' : 'Beautiful navigation along the garden path!');
      }
    };

    const stopDraw = () => { isDrawing = false; };

    canvas.onmousedown = startDraw;
    canvas.onmousemove = draw;
    canvas.onmouseup = stopDraw;

    canvas.ontouchstart = startDraw;
    canvas.ontouchmove = draw;
    canvas.ontouchend = stopDraw;
  }

  showCelebrationBanner(message) {
    const banner = document.getElementById('celebrationBanner');
    if (!banner) return;
    banner.textContent = message;
    banner.classList.add('show');
    setTimeout(() => {
      banner.classList.remove('show');
    }, 3200);
  }
}

// Global singleton instance
window.cognitiveGames = new CognitiveGamesManager();
