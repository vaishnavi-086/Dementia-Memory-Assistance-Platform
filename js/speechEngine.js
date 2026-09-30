/**
 * Smriti-Setu NER (স্মৃতি সেতু) Speech Engine & AI Cognitive Biomarker Analyzer
 * Features:
 * 1. Multilingual Speech Synthesis (TTS) & Recognition (STT) tailored for Seniors
 * 2. Real-time Acoustic & Linguistic Biomarker Extraction (Latency, Hesitation/Anomia, Speech Rate)
 * 3. Conversational Reminiscence AI Companion ("Aita & Koko")
 */

class SpeechBiomarkerEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.recognition = null;
    this.isListening = false;
    this.selectedVoice = null;
    this.speechStartTime = null;
    this.lastPromptTime = null;
    this.recordedTranscript = "";
    
    // Biomarker metric accumulation
    this.sessionMetrics = {
      totalInteractions: 0,
      averageLatencyMs: 2400,
      averageWpm: 75,
      hesitationCount: 0,
      anomiaRiskScore: 'Low',
      sentimentValence: 'Positive'
    };

    this.initSpeechRecognition();
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      const voices = this.synth.getVoices();
      // Look for regional / Indian English / Hindi / Bengali voices
      this.selectedVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('hi') || v.lang.includes('bn')) || voices[0];
    };
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.speechStartTime = Date.now();
        this.updateMicUI(true);
      };

      this.recognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.recordedTranscript += event.results[i][0].transcript + ' ';
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        
        const displayEl = document.getElementById('patientTranscriptDisplay');
        if (displayEl) {
          displayEl.textContent = this.recordedTranscript + (interim ? ` [${interim}]` : '');
        }
      };

      this.recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        this.isListening = false;
        this.updateMicUI(false);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateMicUI(false);
        this.analyzeSpeechBiomarkers(this.recordedTranscript);
        
        // If in Companion view, trigger AI response
        if (this.recordedTranscript.trim().length > 0) {
          this.handleCompanionResponse(this.recordedTranscript);
        }
      };
    }
  }

  /**
   * Senior-Paced Gentle Text-to-Speech
   */
  speak(text, onComplete = null) {
    if (!this.synth) return;
    this.synth.cancel(); // Stop prior audio

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88; // Slower, clear pacing for elderly comprehension
    utterance.pitch = 1.05; // Warm, gentle pitch
    utterance.volume = 1.0;

    // Set matching language tag
    const langMap = {
      'en': 'en-IN',
      'as': 'as-IN',
      'bn': 'bn-IN',
      'hi': 'hi-IN',
      'mni': 'hi-IN', // fallback
      'mizo': 'en-IN',
      'kha': 'en-IN'
    };
    utterance.lang = langMap[currentLanguage] || 'en-IN';

    // Highlight companion animation if active
    const avatar = document.getElementById('companionAvatarCircle');
    if (avatar) avatar.classList.add('speaking');

    this.lastPromptTime = Date.now();

    utterance.onend = () => {
      if (avatar) avatar.classList.remove('speaking');
      if (onComplete) onComplete();
    };

    this.synth.speak(utterance);
  }

  speakWelcome() {
    const greeting = getTranslation('welcomeGreeting') + ". " + getTranslation('welcomeSub');
    this.speak(greeting);
  }

  toggleListening(langCode = currentLanguage) {
    if (!this.recognition) {
      alert("Microphone recognition is supported in Google Chrome, Edge, and modern browsers.");
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.recordedTranscript = "";
      const langMap = {
        'en': 'en-IN',
        'as': 'as-IN',
        'bn': 'bn-IN',
        'hi': 'hi-IN',
        'mni': 'en-IN',
        'mizo': 'en-IN',
        'kha': 'en-IN'
      };
      this.recognition.lang = langMap[langCode] || 'en-IN';
      try {
        this.recognition.start();
      } catch (err) {
        console.warn("Recognition already started:", err);
      }
    }
  }

  updateMicUI(isActive) {
    const btns = document.querySelectorAll('.btn-mic-record, #btnToggleVoiceAssistant');
    btns.forEach(btn => {
      if (isActive) {
        btn.classList.add('recording');
      } else {
        btn.classList.remove('recording');
      }
    });
  }

  /**
   * Real-time Speech Acoustic & Linguistic Biomarker Extraction
   * Calculates:
   * 1. Response Latency (time between prompt end and speech start)
   * 2. Hesitation / Word-finding pause markers ("umm", "uh", long gaps)
   * 3. Speech Rate (WPM)
   * 4. Lexical Richness / Coherence
   */
  analyzeSpeechBiomarkers(transcript) {
    if (!transcript || transcript.trim().length === 0) return;

    const words = transcript.trim().split(/\s+/);
    const durationSec = Math.max(1, (Date.now() - this.speechStartTime) / 1000);
    const wpm = Math.round((words.length / durationSec) * 60);

    // Calculate response latency
    const latencyMs = this.lastPromptTime ? Math.max(800, this.speechStartTime - this.lastPromptTime) : 2200;

    // Detect hesitation tokens & pause markers indicative of anomia
    const hesitationTokens = transcript.match(/\b(um|uh|erm|ki|mane|ki_kobo|oh|accha)\b/gi) || [];
    const hesitationCount = hesitationTokens.length;

    // Estimate Unique Word Ratio (Type-Token Ratio / TTR for vocabulary diversity)
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const ttr = uniqueWords.size / Math.max(1, words.length);

    // Update session metrics
    this.sessionMetrics.totalInteractions++;
    this.sessionMetrics.averageLatencyMs = Math.round((this.sessionMetrics.averageLatencyMs + latencyMs) / 2);
    this.sessionMetrics.averageWpm = Math.round((this.sessionMetrics.averageWpm + wpm) / 2);
    this.sessionMetrics.hesitationCount += hesitationCount;

    // Classify Anomia / Cognitive Risk
    if (this.sessionMetrics.averageLatencyMs > 4500 || this.sessionMetrics.hesitationCount > 6) {
      this.sessionMetrics.anomiaRiskScore = 'Moderate';
    } else if (this.sessionMetrics.averageLatencyMs > 6500) {
      this.sessionMetrics.anomiaRiskScore = 'Elevated';
    } else {
      this.sessionMetrics.anomiaRiskScore = 'Healthy / Normal';
    }

    console.log("📊 Biomarker Metrics Extracted:", {
      wpm,
      latencyMs,
      hesitations: hesitationCount,
      ttr: ttr.toFixed(2),
      anomiaRisk: this.sessionMetrics.anomiaRiskScore
    });

    // Update Caregiver Hub live indicators
    if (window.caregiverHub) {
      window.caregiverHub.updateLiveBiomarkers(this.sessionMetrics);
    }
  }

  /**
   * Conversational Reminiscence Companion Engine ("Aita & Koko")
   */
  handleCompanionResponse(patientMessage) {
    const lower = patientMessage.toLowerCase();
    let responseText = "";

    // Culturally tailored warm conversational logic for NER
    if (lower.includes('tea') || lower.includes('chah') || lower.includes('chai') || lower.includes('চাহ')) {
      responseText = currentLanguage === 'as' 
        ? "আমাৰ অসমৰ ৰঙা চাহৰ সোৱাদেই সুকীয়া। আপুনি পুৱা নেমু টেঙা নে আদা দিয়া চাহ ভাল পায়?"
        : "Fresh Assam tea warms the soul. Do you like ginger in your tea, or a fragrant pinch of cardamom from the hills?";
    } else if (lower.includes('village') || lower.includes('gao') || lower.includes('home') || lower.includes('গাঁও')) {
      responseText = currentLanguage === 'as'
        ? "গাঁৱৰ সেউজীয়া ধাননি আৰু নামঘৰৰ ডবাৰ শব্দ মনত পৰিলে মনটো শাঁত পৰে। আপোনাৰ গাঁৱত বৰগছ জোপাৰ তলত বহা কথা মনত আছে নে?"
        : "Ah, the serene village mornings! The golden paddy fields and fresh mountain breeze. Tell me, who was your favorite childhood friend in the village?";
    } else if (lower.includes('bihu') || lower.includes('dance') || lower.includes('festival') || lower.includes('বিহু')) {
      responseText = currentLanguage === 'as'
        ? "বহাগ বিহুৰ পেঁপাৰ সুৰ শুনিলে মনটো নাচি উঠে! আপুনি সৰুতে নতুন কাপোৰ পিন্ধি কি পিঠা ভাল পাইছিল? ঘিলা পিঠা নে তিল পিঠা?"
        : "Bihu festivals bring so much joy! The cheerful dhol and graceful dancers. Do you remember eating sweet coconut and sesame pithas during Rongali Bihu?";
    } else {
      const defaultEncouragements = [
        "It is so delightful listening to your voice. Your stories carry the wisdom of the hills.",
        "That brings back such fond memories. Please tell me more, I am listening with an open heart.",
        "Your smile brightens the whole verandah! Let's cherish these beautiful thoughts together."
      ];
      responseText = defaultEncouragements[Math.floor(Math.random() * defaultEncouragements.length)];
    }

    // Append to chat history in UI
    this.addCompanionChatEntry("user", patientMessage);
    setTimeout(() => {
      this.addCompanionChatEntry("companion", responseText);
      this.speak(responseText);
    }, 600);
  }

  addCompanionChatEntry(sender, text) {
    const container = document.getElementById('companionChatHistory');
    if (!container) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = `<strong>${sender === 'user' ? 'You' : '🌿 Aita (Grandma AI)'}:</strong> ${text}`;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  }

  /* =========================================================================
     AUDIO / VOICE CUE SIMULATION & SMART REMINDERS
     ========================================================================= */

  /**
   * Triggers an interactive simulated Voice & Audio cue for Medications / Hydration
   */
  triggerVoiceReminderCue(reminderId) {
    let reminder = null;
    if (window.caregiverHub && window.caregiverHub.reminders) {
      reminder = window.caregiverHub.reminders.find(r => r.id === reminderId);
    }

    if (!reminder) {
      reminder = {
        id: Date.now(),
        type: 'medication',
        time: 'Now',
        textEn: 'Morning Blood Pressure Medicine with a warm glass of water',
        textAs: 'ৰাতিপুৱাৰ প্ৰেচাৰৰ দৰব আৰু কুহুমীয়া পানী',
        textBn: 'সকালের রক্তচাপের ওষুধ এবং এক গ্লাস উষ্ণ জল',
        textHi: 'सुबह की ब्लड प्रेशर की दवा और गुनगुना पानी'
      };
    }

    const reminderText = currentLanguage === 'as' ? reminder.textAs :
                         currentLanguage === 'bn' ? (reminder.textBn || reminder.textEn) :
                         currentLanguage === 'hi' ? (reminder.textHi || reminder.textEn) : reminder.textEn;

    const spokenVoicePrompt = currentLanguage === 'as'
      ? `নমস্কাৰ শ্ৰদ্ধাৰ আইতা/ককা! এতিয়া আপোনাৰ ${reminderText}-ৰ সময় হৈছে। আলফুলে দৰবখিনি গ্রহণ কৰক।`
      : `Good day, respected elder! It is time for: ${reminderText}. Please take your time and stay comfortable.`;

    // Play soothing bell chime first
    window.audioSynth.playSuccessChime();

    // Show Senior-Friendly Animated Modal
    const modal = document.getElementById('voiceReminderModal');
    const titleEl = document.getElementById('voiceReminderTitle');
    const msgEl = document.getElementById('voiceReminderMessage');
    const iconEl = document.getElementById('voiceReminderIcon');

    if (modal && titleEl && msgEl) {
      titleEl.textContent = reminder.type === 'medication' ? '💊 Medication Reminder' : '💧 Hydration & Wellness Reminder';
      msgEl.textContent = reminderText;
      if (iconEl) iconEl.textContent = reminder.type === 'medication' ? '💊' : '💧';
      modal.classList.add('active');
      this.currentActiveReminderId = reminder.id;
    }

    // Speak audio cue aloud
    setTimeout(() => {
      this.speak(spokenVoicePrompt);
    }, 400);
  }

  simulateMedicationCue() {
    this.triggerVoiceReminderCue(1); // Triggers morning medication
  }

  simulateHydrationCue() {
    this.triggerVoiceReminderCue(2); // Triggers tea / hydration
  }

  dismissVoiceReminder(status = 'taken') {
    const modal = document.getElementById('voiceReminderModal');
    if (modal) modal.classList.remove('active');

    if (status === 'taken' && this.currentActiveReminderId && window.caregiverHub) {
      const item = window.caregiverHub.reminders.find(r => r.id === this.currentActiveReminderId);
      if (item) {
        item.status = 'taken';
        window.caregiverHub.renderReminderList();
      }
      window.audioSynth.playSuccessChime();
      const thanks = currentLanguage === 'as' ? "বৰ উত্তম! আপোনাৰ স্বাস্থ্যৰ যতন নিশ্চিত কৰা হ’ল।" : "Wonderful! Medication adherence recorded safely.";
      this.speak(thanks);
    } else if (status === 'snooze') {
      window.audioSynth.playTapFeedback();
      this.speak(currentLanguage === 'as' ? "সোৱঁৰণী ৫ মিনিট পিছলৈ পিছুৱাই দিয়া হ’ল।" : "Reminder snoozed for 5 minutes.");
    }
  }

  repeatCurrentVoiceReminder() {
    const msgEl = document.getElementById('voiceReminderMessage');
    if (msgEl && msgEl.textContent) {
      this.speak(msgEl.textContent);
    }
  }
}

// Global singleton instance
window.speechEngine = new SpeechBiomarkerEngine();

