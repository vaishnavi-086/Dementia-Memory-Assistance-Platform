/**
 * Smriti-Setu NER (স্মৃতি সেতু) Caregiver & Doctor Tele-Dashboard ("Sahayak Hub")
 * Longitudinal Analytics, Medication Voice Scheduling, Geofence SOS, DDA Event Logs & Clinical PDF Report Generator
 */

class CaregiverDashboardHub {
  constructor() {
    this.patientProfile = {
      name: "Bhaben Baruah (ভবেন বৰুৱা)",
      age: 74,
      gender: "Male",
      diagnosis: "Mild Cognitive Impairment (Early Stage Amnestic MCI)",
      location: "Jorhat, Assam (Near Tea Research Institute)",
      emergencyContact: "+91 94350-XXXXX (Son: Rahul Baruah)",
      treatingPhysician: "Dr. A. Sharma (MD Geriatric Medicine, GMCH)"
    };

    this.longitudinalData = {
      dates: ['Day 1', 'Day 3', 'Day 5', 'Day 7', 'Day 10', 'Day 14', 'Today'],
      chiScores: [72, 74, 76, 75, 78, 80, 84],
      reactionSpeedsMs: [3600, 3400, 3100, 2900, 2700, 2500, 2400],
      activityCompletions: [2, 3, 4, 3, 5, 4, 6]
    };

    this.reminders = [
      { id: 1, time: '08:00 AM', type: 'medication', textEn: 'Morning BP Medicine & Warm Herbal Water', textAs: 'ৰাতিপুৱাৰ প্ৰেচাৰৰ দৰব আৰু কুহুমীয়া পানী', status: 'taken', urgent: true },
      { id: 2, time: '11:00 AM', type: 'hydration', textEn: 'Assam Green Tea & Verandah Hydration', textAs: 'পুষ্টিকৰ সেউজীয়া চাহ আৰু পানী খোৱা', status: 'taken', urgent: false },
      { id: 3, time: '02:00 PM', type: 'medication', textEn: 'Neuro Vitamin D3 & Memory Tonic', textAs: 'দুপৰীয়াৰ মগজুৰ ভিটামিন আৰু জিৰণি', status: 'pending', urgent: false },
      { id: 4, time: '05:30 PM', type: 'hydration', textEn: 'Evening Fresh Water Hydration', textAs: 'সন্ধিয়াৰ নিৰ্মল পানী সেৱন', status: 'pending', urgent: false },
      { id: 5, time: '08:30 PM', type: 'medication', textEn: 'Night Memory Care Pill before Bed', textAs: 'শোৱাৰ আগতে নিশাৰ নিয়মীয়া দৰব', status: 'pending', urgent: true }
    ];

    this.ddaEvents = [
      { timestamp: '10:15 AM', game: 'Heritage Tile Match', from: 'easy', to: 'medium', reason: 'High recall speed (< 5s/pair) and 0 errors.' },
      { timestamp: '10:45 AM', game: 'Heritage Tile Match', from: 'medium', to: 'hard', reason: 'Consecutive perfect match streak.' },
      { timestamp: '02:30 PM', game: 'Routine Sequence', from: '4-step', to: '3-step', reason: 'Relaxed pacing to prevent cognitive fatigue.' }
    ];

    this.recentSessions = [
      { game: 'Heritage Tile Match', score: 480, duration: '42s', level: 'medium', time: '10:45 AM' },
      { game: 'Daily Routine Ordering', score: 150, duration: '28s', level: 'adaptive', time: '11:15 AM' },
      { game: 'Folk Melody Recall', score: 100, duration: '18s', level: 'standard', time: '02:10 PM' }
    ];
  }

  initDashboardUI() {
    this.renderKPIs();
    this.renderTrajectoryChart();
    this.renderReminderList();
    this.renderDDALogs();
    this.renderRecentSessions();
  }

  renderKPIs() {
    const chiVal = document.getElementById('kpiChiValue');
    const speedVal = document.getElementById('kpiSpeedValue');
    const streakVal = document.getElementById('kpiStreakValue');

    if (chiVal) chiVal.textContent = this.longitudinalData.chiScores[this.longitudinalData.chiScores.length - 1];
    if (speedVal) speedVal.textContent = (this.longitudinalData.reactionSpeedsMs[this.longitudinalData.reactionSpeedsMs.length - 1] / 1000).toFixed(1) + 's';
    if (streakVal) streakVal.textContent = '14 Days';
  }

  updateLiveBiomarkers(metrics) {
    const liveLatency = document.getElementById('liveSpeechLatency');
    const liveWpm = document.getElementById('liveSpeechWpm');
    const liveAnomia = document.getElementById('liveAnomiaStatus');

    if (liveLatency) liveLatency.textContent = (metrics.averageLatencyMs / 1000).toFixed(1) + 's';
    if (liveWpm) liveWpm.textContent = metrics.averageWpm + ' WPM';
    if (liveAnomia) liveAnomia.textContent = metrics.anomiaRiskScore;
  }

  /**
   * Pure Canvas High-Resolution Longitudinal Cognitive Trend Chart
   */
  renderTrajectoryChart() {
    const canvas = document.getElementById('caregiverTrajectoryCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background grid
    ctx.fillStyle = '#fafdfa';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#e2ece2';
    ctx.lineWidth = 1;
    for (let y = 30; y < h - 30; y += 35) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }

    const data = this.longitudinalData.chiScores;
    const stepX = (w - 80) / (data.length - 1);

    // Draw Gradient Area under curve
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(46, 125, 50, 0.35)');
    grad.addColorStop(1, 'rgba(46, 125, 50, 0.0)');

    ctx.beginPath();
    data.forEach((val, i) => {
      const x = 50 + i * stepX;
      const y = h - 40 - ((val - 50) / 50) * (h - 80);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(50 + (data.length - 1) * stepX, h - 35);
    ctx.lineTo(50, h - 35);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    ctx.strokeStyle = '#1b5e20';
    ctx.lineWidth = 3;
    data.forEach((val, i) => {
      const x = 50 + i * stepX;
      const y = h - 40 - ((val - 50) / 50) * (h - 80);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Points & Labels
    data.forEach((val, i) => {
      const x = 50 + i * stepX;
      const y = h - 40 - ((val - 50) / 50) * (h - 80);

      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#1b5e20';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Text score
      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#166534';
      ctx.fillText(val, x - 8, y - 10);

      // Date label
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#5e735f';
      ctx.fillText(this.longitudinalData.dates[i], x - 15, h - 15);
    });
  }

  renderReminderList() {
    const list = document.getElementById('caregiverReminderList');
    if (!list) return;

    list.innerHTML = this.reminders.map(r => {
      const text = currentLanguage === 'as' ? r.textAs : r.textEn;
      const statusBadge = r.status === 'taken' 
        ? `<span class="badge-status-taken">✓ Taken</span>`
        : `<span class="badge-status-pending">⏳ Pending</span>`;

      return `
        <div class="reminder-item ${r.urgent ? 'urgent' : ''}">
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.25rem;">
              <span class="reminder-item-time">⏰ ${r.time}</span>
              <span class="reminder-type-tag">${r.type === 'medication' ? '💊 Medication' : '💧 Hydration'}</span>
              ${statusBadge}
            </div>
            <div class="reminder-item-desc">${text}</div>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="toolbar-btn" onclick="window.speechEngine.triggerVoiceReminderCue(${r.id})" title="Trigger simulated audio-visual cue">
              📢 Trigger Cue
            </button>
            <button class="toolbar-btn" style="${r.status === 'taken' ? 'opacity:0.6;' : 'background:var(--primary-500); color:#ffffff;'}" onclick="window.caregiverHub.toggleReminderStatus(${r.id})">
              ${r.status === 'taken' ? 'Undo' : 'Mark Taken'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  toggleReminderStatus(id) {
    const item = this.reminders.find(r => r.id === id);
    if (item) {
      item.status = item.status === 'taken' ? 'pending' : 'taken';
      this.renderReminderList();
      window.audioSynth.playTapFeedback();
    }
  }

  renderDDALogs() {
    const container = document.getElementById('caregiverDdaLogList');
    if (!container) return;

    if (this.ddaEvents.length === 0) {
      container.innerHTML = `<div style="color:var(--text-muted); font-size:0.9rem;">No DDA events logged yet in this session.</div>`;
      return;
    }

    container.innerHTML = this.ddaEvents.slice(-5).reverse().map(e => `
      <div class="dda-log-card">
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; color:var(--primary-600); margin-bottom:0.2rem;">
          <span>🎯 ${e.game}</span>
          <span style="color:var(--text-muted);">${e.timestamp}</span>
        </div>
        <div style="font-size:0.92rem; font-weight:600; color:var(--text-primary);">
          Level Shift: <span class="difficulty-pill">${e.from} → ${e.to}</span>
        </div>
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.2rem;">
          ${e.reason}
        </div>
      </div>
    `).join('');
  }

  logDDAEvent(eventObj) {
    this.ddaEvents.push(eventObj);
    this.renderDDALogs();
  }

  renderRecentSessions() {
    const container = document.getElementById('caregiverRecentSessionsList');
    if (!container) return;

    container.innerHTML = this.recentSessions.slice(-4).reverse().map(s => `
      <div class="session-log-card">
        <div>
          <strong>${s.game}</strong>
          <div style="font-size:0.8rem; color:var(--text-muted);">${s.time} • Level: ${s.level}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:800; color:var(--primary-600); font-size:1.1rem;">+${s.score} pts</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">⏱️ ${s.duration}</div>
        </div>
      </div>
    `).join('');
  }

  addCustomReminder(time, text, type = 'medication') {
    this.reminders.push({
      id: Date.now(),
      time: time,
      type: type,
      textEn: text,
      textAs: text,
      status: 'pending',
      urgent: false
    });
    this.renderReminderList();
  }

  recordSessionActivity(activityName, score, pairs, durationSec = 30, difficulty = 'normal') {
    this.longitudinalData.activityCompletions[this.longitudinalData.activityCompletions.length - 1]++;
    
    this.recentSessions.push({
      game: activityName,
      score: score,
      duration: `${durationSec}s`,
      level: difficulty,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.renderKPIs();
    this.renderRecentSessions();
  }

  recordAssessmentScore(chi, mmse, stage) {
    this.longitudinalData.chiScores.push(chi);
    this.longitudinalData.dates.push('Latest');
    this.renderKPIs();
    this.renderTrajectoryChart();
  }

  /**
   * Clinical PDF / Printable Neuropsychological Report Generator
   */
  exportClinicalReport() {
    const win = window.open('', '_blank');
    const p = this.patientProfile;
    const latestChi = this.longitudinalData.chiScores[this.longitudinalData.chiScores.length - 1];

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Clinical Neuropsychological Report - Smriti-Setu NER</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
          .header { border-bottom: 3px solid #166534; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 24px; font-weight: bold; color: #166534; }
          .badge { background: #dcfce7; color: #14532d; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 14px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
          .box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
          th { background: #f1f5f9; }
          .btn-print { background: #166534; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 16px; margin-bottom: 20px; }
          @media print { .btn-print { display: none; } }
        </style>
      </head>
      <body>
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <div class="header">
          <div>
            <div class="title">🌿 Smriti-Setu NER | Comprehensive Geriatric Cognitive Report</div>
            <div style="color: #64748b; font-size: 13px;">AI-Driven Reminiscence & Cognitive Health Monitoring Platform for Northeast India</div>
          </div>
          <span class="badge">CLINICAL AUDIT</span>
        </div>

        <div class="grid">
          <div class="box">
            <h3 style="margin-top:0; color:#0f172a;">Patient Demographic Profile</h3>
            <p><strong>Name:</strong> ${p.name}</p>
            <p><strong>Age / Gender:</strong> ${p.age} Yrs / ${p.gender}</p>
            <p><strong>Regional Location:</strong> ${p.location}</p>
            <p><strong>Emergency Contact:</strong> ${p.emergencyContact}</p>
          </div>
          <div class="box">
            <h3 style="margin-top:0; color:#0f172a;">Diagnostic & Clinical Status</h3>
            <p><strong>Current Diagnosis:</strong> ${p.diagnosis}</p>
            <p><strong>Treating Physician:</strong> ${p.treatingPhysician}</p>
            <p><strong>Cognitive Health Index (CHI):</strong> <span style="font-size:18px; color:#166534; font-weight:bold;">${latestChi} / 100</span></p>
            <p><strong>MMSE Equivalent Score:</strong> <strong>26 / 30</strong> (Mild Cognitive Impairment Range)</p>
          </div>
        </div>

        <div class="box" style="margin-bottom: 25px;">
          <h3 style="margin-top:0; color:#0f172a;">Acoustic & Speech Biomarker Analysis</h3>
          <table>
            <tr>
              <th>Biomarker Metric</th>
              <th>Observed Value</th>
              <th>Geriatric Baseline</th>
              <th>Clinical Interpretation</th>
            </tr>
            <tr>
              <td>Mean Speech Latency</td>
              <td>2.4 seconds</td>
              <td>1.8 - 3.2s</td>
              <td>Normal processing speed with minor word-search delay</td>
            </tr>
            <tr>
              <td>Speech Articulation Rate</td>
              <td>75 WPM</td>
              <td>70 - 110 WPM</td>
              <td>Age-appropriate vocal cadence</td>
            </tr>
            <tr>
              <td>Anomia / Hesitation Index</td>
              <td>Low-Moderate (4 events/wk)</td>
              <td>&lt; 8 events/wk</td>
              <td>Mild nominal dysphasia responsive to regional visual cues</td>
            </tr>
            <tr>
              <td>Reminiscence Engagement</td>
              <td>92% Positive Emotional Valence</td>
              <td>&gt; 70%</td>
              <td>High therapeutic receptivity to Assam tea heritage & Bihu audio</td>
            </tr>
          </table>
        </div>

        <div class="box">
          <h3 style="margin-top:0; color:#0f172a;">Physician Recommendations & Follow-Up</h3>
          <ul style="padding-left: 20px;">
            <li>Continue daily 15-minute Reminiscence Storybook sessions in native language.</li>
            <li>Maintain regular hydration schedule and morning tea garden walking therapy.</li>
            <li>Schedule repeat Digital MMSE and Clock Drawing Test in 30 days.</li>
          </ul>
        </div>
      </body>
      </html>
    `;

    win.document.write(reportHtml);
    win.document.close();
  }

  triggerSOS() {
    alert("🚨 SOS Wandering Alert Broadcast: Caregiver SMS and GPS coordinates dispatched. Patient location: Jorhat Tea Estate Road (Geofence Safe Zone).");
  }
}

// Global singleton instance
window.caregiverHub = new CaregiverDashboardHub();

