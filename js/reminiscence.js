/**
 * Smriti-Setu NER (স্মৃতি সেতু) Reminiscence Photo & Audio Storybook Engine ("Smriti Khilon")
 * Evidence-based Reminiscence Therapy tailored for Alzheimer's & Dementia patients in Northeast India.
 */

class ReminiscenceStorybook {
  constructor() {
    this.currentPhotoIndex = 0;
    this.activeAlbum = 'heritage'; // 'heritage' or 'family'

    // Heritage Cultural Nostalgia Collection
    this.heritagePhotos = [
      {
        id: 'tea_estate_1975',
        titleEn: 'Morning Harvest in Jorhat Tea Garden (1978)',
        titleAs: 'যোৰহাটৰ চাহ বাগিচাৰ সেউজীয়া পুৱা (১৯৭৮)',
        year: '1978',
        location: 'Jorhat, Assam',
        svgIllustration: `
          <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="teaSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fdba74"/>
                <stop offset="60%" stop-color="#fef08a"/>
                <stop offset="100%" stop-color="#bbf7d0"/>
              </linearGradient>
              <linearGradient id="teaHill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#15803d"/>
                <stop offset="100%" stop-color="#14532d"/>
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#teaSky)"/>
            <!-- Sun -->
            <circle cx="200" cy="110" r="45" fill="#f59e0b" opacity="0.85"/>
            <!-- Distant Hills -->
            <path d="M0,180 Q80,130 180,165 T360,140 Q400,150 400,180 L400,300 L0,300 Z" fill="#166534" opacity="0.7"/>
            <!-- Tea Bushes -->
            <path d="M-20,210 Q40,175 100,205 T220,185 T340,200 T420,180 L420,300 L-20,300 Z" fill="url(#teaHill)"/>
            <circle cx="90" cy="230" r="30" fill="#22c55e" opacity="0.6"/>
            <circle cx="220" cy="235" r="35" fill="#22c55e" opacity="0.6"/>
            <circle cx="330" cy="225" r="32" fill="#22c55e" opacity="0.6"/>
            <!-- Tea Plucker Silhouette with Japi (Traditional Hat) -->
            <path d="M150,170 Q165,150 180,170 Z" fill="#92400e"/>
            <circle cx="165" cy="175" r="8" fill="#78350f"/>
            <path d="M158,183 L172,183 L175,220 L155,220 Z" fill="#d97706"/>
            <!-- Traditional Bamboo Basket on back -->
            <path d="M148,185 L158,185 L155,215 L145,215 Z" fill="#78350f"/>
          </svg>
        `,
        tags: ['Assam Tea', 'Jorhat', 'Golden Sunset', 'Japi Hat'],
        aiPromptsEn: [
          "Look at the golden sunset over the tea bushes. Do you remember the fresh fragrance of early morning tea leaves?",
          "Look at the traditional bamboo Japi hat. Did anyone in your family wear a Japi during festival walks?"
        ],
        aiPromptsAs: [
          "চাহ বাগিচাৰ ওপৰত সোণালী ৰদজাক চাওকচোন। পুৱা নিয়ৰসিক্ত চাহপাতৰ সুবাস মনত পৰিছে নে?",
          "মূৰত পিন্ধা ফুলাম জাপিটো দেখি কাৰ কথা মনত পৰিছে?"
        ]
      },
      {
        id: 'bihu_celebration_1985',
        titleEn: 'Rongali Bihu Spring Dance under the Banyan Tree',
        titleAs: 'বৰগছৰ তলত বহাগ বিহুৰ আনন্দ আৰু নৃত্য',
        year: '1985',
        location: 'Sibsagar, Assam',
        svgIllustration: `
          <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#ecfdf5"/>
            <!-- Big Banyan Tree -->
            <path d="M180,300 Q190,180 160,120 Q220,120 230,300 Z" fill="#78350f"/>
            <circle cx="190" cy="90" r="75" fill="#15803d" opacity="0.9"/>
            <circle cx="130" cy="110" r="55" fill="#16a34a" opacity="0.85"/>
            <circle cx="260" cy="105" r="60" fill="#16a34a" opacity="0.85"/>
            <!-- Dancers with Red Mekhela and Red Kopou Orchid in Hair -->
            <circle cx="130" cy="180" r="10" fill="#fed7aa"/>
            <circle cx="138" cy="176" r="4" fill="#dc2626"/> <!-- Kopou flower -->
            <path d="M120,192 L140,192 L145,245 L115,245 Z" fill="#dc2626"/>
            <!-- Drummer with Dhol -->
            <circle cx="270" cy="180" r="10" fill="#fed7aa"/>
            <rect x="255" y="195" width="28" height="18" rx="4" fill="#92400e"/>
            <path d="M260,192 L278,192 L280,245 L258,245 Z" fill="#fef08a"/>
          </svg>
        `,
        tags: ['Rongali Bihu', 'Mekhela Chador', 'Kopou Phool', 'Dhol'],
        aiPromptsEn: [
          "The dancer is wearing a beautiful red Kopou flower in her hair. Did you celebrate Bihu with dance and dhol?",
          "What was your favorite festive sweet during Rongali Bihu? Was it Pitha or Laru?"
        ],
        aiPromptsAs: [
          "খোপাত ৰঙা কপৌ ফুল আৰু মুগাৰ সাজ। বিহুৰ সময়ত আপোনাৰ আটাইতকৈ প্রিয় মিঠাই কি আছিল? ঘিলা পিঠা নে নাৰিকলৰ লাড়ু?",
          "ঢোলৰ চাপৰ শুনিলে আপোনাৰ মনটো এতিয়াও নাচি উঠে নে?"
        ]
      },
      {
        id: 'shillong_hills_1982',
        titleEn: 'Pine Trees and Cherry Blossoms in Shillong Hills',
        titleAs: 'শ্বিলঙৰ পাইন বন আৰু চেৰী ফুলৰ মনোৰম দৃশ্য',
        year: '1982',
        location: 'Shillong, Meghalaya',
        svgIllustration: `
          <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hillSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#bae6fd"/>
                <stop offset="100%" stop-color="#fdf4ff"/>
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#hillSky)"/>
            <!-- Blue Pine Hills -->
            <polygon points="40,280 80,120 120,280" fill="#047857"/>
            <polygon points="110,290 150,90 190,290" fill="#065f46"/>
            <polygon points="250,290 300,100 350,290" fill="#047857"/>
            <!-- Pink Blossom Trees -->
            <circle cx="210" cy="180" r="45" fill="#f472b6" opacity="0.85"/>
            <circle cx="240" cy="190" r="35" fill="#fbcfe8" opacity="0.9"/>
            <rect x="218" y="210" width="12" height="70" fill="#78350f"/>
          </svg>
        `,
        tags: ['Shillong', 'Cherry Blossom', 'Pine Ridge', 'Cloud Palace'],
        aiPromptsEn: [
          "The fresh pine breeze of Meghalaya hills. Have you ever visited the beautiful lakes or viewpoints in Shillong?",
          "How soothing the pink cherry blossoms look against the mountain clouds!"
        ],
        aiPromptsAs: [
          "শ্বিলঙৰ পাইন গছৰ সুবাস আৰু চেৰী ফুলবোৰ চাওক। পাহাৰৰ ঠাণ্ডা বতাহজাক আপোনাৰ ভাল লাগেনে?",
          "শ্বিলঙৰ ৱাৰ্ডছ লেকত বা বৰাপানীত নাও চলোৱা কথা মনত পৰে নে?"
        ]
      }
    ];

    // Personalized Family Memories (Caregivers can add real family photos)
    this.familyPhotos = [
      {
        id: 'family_1',
        titleEn: 'Granddaughter Priyam in Traditional Muga Silk',
        titleAs: 'নাতিনী প্রিয়ম মুগাৰ সাজত',
        year: '2023',
        location: 'Guwahati',
        svgIllustration: `
          <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#fefce8"/>
            <circle cx="200" cy="110" r="55" fill="#fed7aa"/>
            <!-- Smile & Hair -->
            <path d="M185,130 Q200,145 215,130" stroke="#c2410c" stroke-width="4" fill="none"/>
            <circle cx="185" cy="105" r="6" fill="#78350f"/>
            <circle cx="215" cy="105" r="6" fill="#78350f"/>
            <!-- Golden Muga Chador -->
            <path d="M145,170 L255,170 L275,300 L125,300 Z" fill="#d97706"/>
            <!-- Red Paisley embroidery -->
            <circle cx="200" cy="220" r="15" fill="#dc2626"/>
          </svg>
        `,
        tags: ['Priyam (Granddaughter)', 'Muga Silk', 'Family Wedding'],
        aiPromptsEn: [
          "Here is your dear granddaughter Priyam! Look how gracefully she is smiling in the golden Muga silk.",
          "Priyam always brings you your favorite evening tea. Would you like to record a sweet blessing for her?"
        ],
        aiPromptsAs: [
          "এইয়া আপোনাৰ মৰমৰ নাতিনী প্রিয়ম! মুগাৰ সাজযোৰত তাইক কিমান ধুনীয়া লাগিছে চাওক।",
          "প্রিয়মে সদায় আপোনাক চাহ একাপ আনি দিয়ে। তাইৰ বাবে এটা মৰমৰ আশীৰ্বাদ দিব নেকি?"
        ]
      }
    ];
  }

  initStorybookUI() {
    this.renderCurrentPhoto();
  }

  switchAlbum(albumType) {
    this.activeAlbum = albumType;
    this.currentPhotoIndex = 0;
    this.renderCurrentPhoto();
  }

  renderCurrentPhoto() {
    const photoList = this.activeAlbum === 'heritage' ? this.heritagePhotos : this.familyPhotos;
    const photo = photoList[this.currentPhotoIndex] || photoList[0];

    const frame = document.getElementById('storybookPhotoFrame');
    const titleEl = document.getElementById('storybookPhotoTitle');
    const tagsContainer = document.getElementById('storybookTagsList');
    const promptTextEl = document.getElementById('storybookAiPromptText');

    if (frame) frame.innerHTML = photo.svgIllustration;
    if (titleEl) titleEl.textContent = currentLanguage === 'as' ? photo.titleAs : photo.titleEn;

    if (tagsContainer) {
      tagsContainer.innerHTML = photo.tags.map(t => `<span class="memory-tag-chip">🏷️ ${t}</span>`).join('');
    }

    const prompts = currentLanguage === 'as' ? photo.aiPromptsAs : photo.aiPromptsEn;
    const activePrompt = prompts[0];

    if (promptTextEl) {
      promptTextEl.textContent = activePrompt;
    }

    // Gentle speech prompt read-aloud
    setTimeout(() => {
      window.speechEngine.speak(activePrompt);
    }, 400);
  }

  nextPhoto() {
    const photoList = this.activeAlbum === 'heritage' ? this.heritagePhotos : this.familyPhotos;
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % photoList.length;
    this.renderCurrentPhoto();
  }

  prevPhoto() {
    const photoList = this.activeAlbum === 'heritage' ? this.heritagePhotos : this.familyPhotos;
    this.currentPhotoIndex = (this.currentPhotoIndex - 1 + photoList.length) % photoList.length;
    this.renderCurrentPhoto();
  }

  /**
   * Caregiver upload new photo with memory metadata
   */
  addNewFamilyMemory(title, year, tagsString) {
    const tags = tagsString.split(',').map(s => s.trim());
    const newEntry = {
      id: 'family_' + Date.now(),
      titleEn: title,
      titleAs: title,
      year: year || 'Recent',
      location: 'Home',
      svgIllustration: `
        <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#fef3c7"/>
          <text x="200" y="150" font-family="sans-serif" font-size="22" text-anchor="middle" fill="#92400e">📸 ${title}</text>
        </svg>
      `,
      tags: tags,
      aiPromptsEn: [
        `Here is a cherished photo of ${title}. Tell me what you remember most about this joyful day!`,
        `Who was with you when this wonderful moment was captured?`
      ],
      aiPromptsAs: [
        `এইখন ${title}-ৰ এখন বৰ মৰমৰ স্মৃতি। এই দিনটোৰ কথা মনত পৰিছে নে?`,
        `এই মধুৰ সময়ত আপোনাৰ ওচৰত কোন আছিল?`
      ]
    };

    this.familyPhotos.push(newEntry);
    this.activeAlbum = 'family';
    this.currentPhotoIndex = this.familyPhotos.length - 1;
    this.renderCurrentPhoto();
  }
}

// Global singleton instance
window.reminiscenceStorybook = new ReminiscenceStorybook();
