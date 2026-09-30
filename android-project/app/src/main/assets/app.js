/**
 * THE MAGICIAN'S ALARM - GD
 * Complete Application Logic & Audio Engine
 */

// ============================================================================
// 1. DATA & CONSTANTS
// ============================================================================

const POSITIVITY_TOOLS = [
  {
    id: 1,
    name: "New Ho'oponopono",
    icon: "🕊️",
    tagline: "I LOVE you. I SEE you. I HONOR you. I BLESS you.",
    category: "Healing & Blessing",
    description: "Say these lines with feeling for different people in your field of Consciousness. If you are upset with someone, say it three times for that person. You can say this for your house, your business and your child's school too.",
    steps: [
      "Envision a person, place, or situation in your mind's eye.",
      "Speak from the heart: 'I LOVE you. I SEE you. I HONOR you. I BLESS you.'",
      "If you feel upset or conflicted, repeat 3 times with total sincerity.",
      "Extend this blanket of divine love to your home, workplace, and loved ones."
    ],
    audioAffirmation: "I love you. I see you. I honor you. I bless you."
  },
  {
    id: 2,
    name: "Prayer",
    icon: "🙏",
    tagline: "Double Request to God & Spirit",
    category: "Divine Connection",
    description: "Communicate from the heart to God, Spirit, Babaji, Jesus, Mother Mary, archangels and guides. The highest form of prayer asks for God: 'I am ready to God, please come. If there's anything blocking this, please let me see it.'",
    steps: [
      "Open your heart directly to Spirit, the Divine, and your Guides.",
      "Declare the first request: 'I am ready to God, please come.'",
      "Declare the second request: 'If there is anything blocking this, please let me see it.'",
      "Rest in receptive stillness and let divine presence fill your being."
    ],
    audioAffirmation: "I am ready to God, please come. Clear everything blocking my sight."
  },
  {
    id: 3,
    name: "Forgiveness",
    icon: "🌸",
    tagline: "Dual-Forgiveness: Restore Heaven",
    category: "Release & Peace",
    description: "Grievance is the only thing that keeps you away from Heaven. The desire to be angry at God takes away this ever-present Heaven. Forgiveness restores us to Heaven. Go straight to dual-forgiveness.",
    steps: [
      "Bring to mind anyone you feel resistance or grievance towards.",
      "Acknowledge the fear behind their action without judgment.",
      "Declare: 'I forgive you for being so scared and confused.'",
      "Turn gently inward: 'I forgive me for being so scared and confused.'"
    ],
    audioAffirmation: "I forgive you for being scared and confused. I forgive me for being scared and confused."
  },
  {
    id: 4,
    name: "Gratitude",
    icon: "✨",
    tagline: "Appreciate What You Have Right Now",
    category: "Abundance & Joy",
    description: "Appreciate what you already have in your life in this moment: a roof over your head, food, family, clothes, money in the bank. That's better than many on the planet right now. Be grateful for that.",
    steps: [
      "Feel the physical safety and protection around you right now.",
      "Silently thank the breath in your lungs and the clothes on your body.",
      "Honor your home, your water, food, and the people supporting you.",
      "Allow the warmth of overflowing fullness to expand across your chest."
    ],
    audioAffirmation: "I am deeply grateful for this breath, this shelter, and the abundance of life."
  },
  {
    id: 5,
    name: "Thank You God For...",
    icon: "🌟",
    tagline: "Advance Manifestation",
    category: "Manifestation",
    description: "Thanking God in advance is a manifestation technique to frame your problem as if it's already solved, even though in 'reality' it's not occurred already. Example: 'Thank you God in advance for fixing this situation.'",
    steps: [
      "Identify a problem or desire you want resolved.",
      "Do not pray from lack; pray from completion.",
      "Say aloud with calm certainty: 'Thank you God in advance for...'",
      "Feel the sweet relief of the miracle already accomplished."
    ],
    audioAffirmation: "Thank you God in advance for making this journey so graceful and easy."
  },
  {
    id: 6,
    name: "Wouldn't It Be Nice If...",
    icon: "🌿",
    tagline: "Gentle Alignment Without Pushing",
    category: "Gentle Creation",
    description: "Instead of pushing others around you and the world to change, gently speak what you wish to see. For example: 'Wouldn't it be nice if my loved one could feel peace instead of guilt?'",
    steps: [
      "Release all struggle, force, and need to control other people.",
      "Softly wonder: 'Wouldn't it be nice if [your peaceful wish]...'",
      "Allow the thought to ripple effortlessly into creation.",
      "Smile and trust that reality aligns when you stop forcing."
    ],
    audioAffirmation: "Wouldn't it be nice if love, harmony, and peace filled every heart today?"
  },
  {
    id: 7,
    name: "Affirmations",
    icon: "💎",
    tagline: "Speaking Truth with Quiet Confidence",
    category: "Frequency Alignment",
    description: "Speaking affirmation with quietness and confidence is very powerful. If the mind is in a fighting mood, don't try to outshout the negativity. Simply speak or listen quietly for 5 minutes.",
    steps: [
      "Drop all mental arguments and resistance.",
      "Speak steady, quiet truths into your field.",
      "Declare: 'I am peace. I am safe. Divine wisdom guides my every step.'",
      "Let each word sink deep into your nervous system."
    ],
    audioAffirmation: "I am radiant health, infinite peace, and divine power."
  },
  {
    id: 8,
    name: "Handing It Over",
    icon: "🤲",
    tagline: "Surrender the Burden to Spirit",
    category: "Surrender & Grace",
    description: "If nothing makes sense, call Spirit in. Surrender the situation. Don't struggle to solve problems from a split mind which is confused and guilty. Ask Spirit to dissolve all errors of perception and restore perfect peace.",
    steps: [
      "Acknowledge with humility: 'I do not know how to solve this.'",
      "Surrender the entire outcome into the hands of Spirit.",
      "Pray: 'Dissolve all my errors of perception and restore perfect peace.'",
      "Take a deep breath and feel the immense weight lifted off you."
    ],
    audioAffirmation: "Spirit, I hand this entirely over to You. Restore perfect peace."
  },
  {
    id: 9,
    name: "Blessing",
    icon: "🌈",
    tagline: "Send Unconditional Light",
    category: "Universal Love",
    description: "Speak blessings for individuals, for the world, even for AI. Whatever you are worried about in the world, you can bless. For example: 'May you be happy. May you experience the peace of God.'",
    steps: [
      "Think of someone struggling, a global situation, or future technology.",
      "Send a beam of pure golden light to them.",
      "Bless them wholeheartedly: 'May you be happy. May you know peace.'",
      "Experience how blessing others instantly uplifts your own soul."
    ],
    audioAffirmation: "May you be happy. May you experience the boundless peace of God."
  },
  {
    id: 10,
    name: "Declaring the Highest Truth",
    icon: "👑",
    tagline: "We Are the Light — We Are Complete",
    category: "Ultimate Truth",
    description: "At the end of every session, always declare the highest truth for others so we don't see them as victims. 'I am the Light. You are the Light. I am complete, You are complete. I am one with God.'",
    steps: [
      "Rise above all worldly illusions and appearances.",
      "Declare with supreme authority: 'I am the Light. You are the Light.'",
      "'I am complete, You are complete. I deserve perfect happiness.'",
      "'I am one with God. We are complete and whole.'"
    ],
    audioAffirmation: "I am the Light. You are the Light. We are complete. I am one with God."
  }
];

const FORTUNE_MESSAGES = [
  // 1-10: The Magician's Law & Mastery
  { text: "You are the Magician. Today you shifted reality from fear to light.", tag: "Magician's Miracle" },
  { text: "With 150 prayers and blessings a month, it is impossible that things don't change.", tag: "Divine Law" },
  { text: "You did not blame the world—you did the magic. You are the lighthouse.", tag: "Lighthouse" },
  { text: "You will either do the magic, or you will sit and cry. Today, you chose the magic.", tag: "Mastery" },
  { text: "The magician does not fight the darkness; the magician simply turns on the light.", tag: "Inner Light" },
  { text: "When you change your frequency, the whole universe rearranges to match your new state.", tag: "Frequency Shift" },
  { text: "The power to create is within you. Trust the sacred seeds planted today.", tag: "Manifestation" },
  { text: "Every 5 minutes in high frequency clears months of heavy collective fatigue.", tag: "Soul Strength" },
  { text: "You interrupted the negative stream today. A cascade of peace now surrounds you.", tag: "Breakthrough" },
  { text: "Quiet truth spoken with serene confidence silences a thousand anxious thoughts.", tag: "Sacred Truth" },

  // 11-20: Dual Forgiveness & Restoring Heaven
  { text: "Grievance is gone; Heaven is here now. Walk in royal serenity.", tag: "Forgiveness" },
  { text: "Forgiving both yourself and the world restores you straight to the gates of Heaven.", tag: "Restoration" },
  { text: "Everyone who frightened you was only scared and confused. Send them peace and be free.", tag: "Compassion" },
  { text: "Peace does not wait for circumstances to change; circumstances change when you choose peace.", tag: "Inner Peace" },
  { text: "No one is guilty in the eyes of Truth. Release the grievance and reclaim your joy.", tag: "Liberation" },
  { text: "You let go of holding a grudge today. The energy of heaven immediately flooded in.", tag: "Release" },
  { text: "Forgiveness is not for the other person—it is the key that unlocks your own prison door.", tag: "Freedom" },
  { text: "I forgive you for being scared. I forgive myself for being scared. Peace returns now.", tag: "Dual-Forgiveness" },
  { text: "You traded bitterness for grace today. An invisible mountain just lifted off your shoulders.", tag: "Unburdened" },
  { text: "Where grievance once dwelled, divine understanding has taken root.", tag: "Clarity" },

  // 21-30: Ho'oponopono & Radiant Blessing
  { text: "I LOVE you. I SEE you. I HONOR you. I BLESS you. The four sacred bridges to healing.", tag: "Ho'oponopono" },
  { text: "Whatever you are worried about in this world, bless it. Watch miracles unfold.", tag: "Blessing" },
  { text: "Blessing your home, workplace, and loved ones blankets your whole life in golden light.", tag: "Protection" },
  { text: "You blessed someone difficult today. You just dissolved an ancient wall of resistance.", tag: "Healing" },
  { text: "Your silent blessing today comforted a soul who desperately needed hope.", tag: "Secret Grace" },
  { text: "Bless the obstacle until it dissolves into a stepping stone for your greatest leap.", tag: "Alchemy" },
  { text: "When you bless others sincerely, heaven pours double that blessing back into your cup.", tag: "Reciprocity" },
  { text: "I love you, I see you, I honor you, I bless you. Love dissolves every illusion.", tag: "Pure Love" },
  { text: "You sent golden beams of peace into the world today. The earth felt your light.", tag: "Lightworker" },
  { text: "Never underestimate 5 minutes of genuine blessing—it reverberates through eternity.", tag: "Eternal Ripple" },

  // 31-40: Gratitude & Advance Manifestation
  { text: "Gratitude opened the floodgates of heaven today. Expect gentle miracles.", tag: "Abundance" },
  { text: "Thank you God in advance for fixing this situation. It is already accomplished.", tag: "Advance Manifestation" },
  { text: "Pray not from fear or desperation, but from the sweet relief of completion.", tag: "Answered Prayer" },
  { text: "Appreciating the breath in your lungs and roof over your head magnetically attracts riches.", tag: "Appreciation" },
  { text: "The fastest manifestation occurs when you thank God while the seed is still unseen in the soil.", tag: "Deep Faith" },
  { text: "You counted your blessings and starved your fears. Reality is shifting in your favor.", tag: "Rich Mindset" },
  { text: "Thank you God in advance for making this path smooth, graceful, and victorious.", tag: "Graceful Path" },
  { text: "A grateful heart is an impenetrable fortress against doubt and worry.", tag: "Sanctuary" },
  { text: "Celebrate the small blessings today; they are the scouts of grand miracles to come.", tag: "Harbinger" },
  { text: "Contentment with what is in this moment opens the portal to what can be.", tag: "Receptivity" },

  // 41-50: Surrender, Divine Alignment & Sacred Victory
  { text: "You handed it over, and perfect peace has answered your call.", tag: "Surrender" },
  { text: "Stop struggling to solve problems with a tired mind. Call Spirit in and let wisdom lead.", tag: "Divine Guidance" },
  { text: "Your double request has been heard. Spirit is rearranging circumstances for your highest good.", tag: "Divine Order" },
  { text: "When you surrender the outcome, you release the burden of time and step into eternity.", tag: "Timeless Peace" },
  { text: "Spirit dissolves all errors of perception. What seemed impossible is dissolving into harmony.", tag: "Perception Shift" },
  { text: "Wouldn't it be nice if love, harmony, and gentle ease filled tomorrow completely?", tag: "Gentle Wish" },
  { text: "I am the Light. You are the Light. We are complete. I am one with God.", tag: "Ultimate Truth" },
  { text: "Nothing real can be threatened. Nothing unreal exists. Herein lies the peace of God.", tag: "Inviolable" },
  { text: "Today you did not react to fear—you responded with royal divine presence.", tag: "Sovereignty" },
  { text: "Rest tonight knowing the universe heard your heart and is working on your behalf.", tag: "Sweet Rest" }
];

const SOUNDS = [
  { id: "singing_bowl", name: "Tibetan Singing Bowl", icon: "🥣" },
  { id: "zen_bell", name: "Zen Crystal Chime", icon: "🔔" },
  { id: "celestial_harp", name: "Celestial Harp", icon: "🎵" },
  { id: "temple_bell", name: "Temple Gong", icon: "⛩️" },
  { id: "mystic_flute", name: "Mystic Flute", icon: "🪈" },
  { id: "morning_light", name: "Morning Light Breeze", icon: "🌅" }
];

// ============================================================================
// 2. WEB AUDIO SYNTHESIS ENGINE (Zero external dependencies)
// ============================================================================

class PositivityAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.unlocked = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 1.0;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  unlockAudio() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.ctx && !this.unlocked) {
      try {
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
        this.unlocked = true;
      } catch (e) {}
    }
  }

  ensureReady(callback) {
    this.init();
    if (this.ctx.state !== 'running') {
      this.ctx.resume().then(() => {
        try { callback(); } catch (e) { console.warn("Audio error:", e); }
      }).catch(() => {
        try { callback(); } catch (e) { console.warn("Audio error:", e); }
      });
    } else {
      try { callback(); } catch (e) { console.warn("Audio error:", e); }
    }
  }

  playTibetanBowl(baseFreq = 432, duration = 4.0) {
    this.init();
    const now = this.ctx.currentTime + 0.02;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc3.type = 'sine';

    osc1.frequency.setValueAtTime(baseFreq, now);
    osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
    osc3.frequency.setValueAtTime(baseFreq * 2.0, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.85, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  }

  playZenChime() {
    this.init();
    const now = this.ctx.currentTime;
    const freqs = [880, 1320, 1760];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.4 / (idx + 1), now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 3.5);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 3.6);
    });
  }

  playCelestialHarp() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    const now = this.ctx.currentTime;
    notes.forEach((freq, i) => {
      const startTime = now + i * 0.15;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.35, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.8);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 3.0);
    });
  }

  playTempleBell() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.9, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 5.2);
  }

  playMysticFlute() {
    this.init();
    const notes = [440, 493.88, 554.37, 659.25];
    const now = this.ctx.currentTime;
    notes.forEach((freq, i) => {
      const startTime = now + i * 0.35;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 1.3);
    });
  }

  playMorningLight() {
    this.init();
    const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
    const now = this.ctx.currentTime;
    notes.forEach((freq, i) => {
      const startTime = now + i * 0.2;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 2.6);
    });
  }

  playSoundById(soundId) {
    this.ensureReady(() => {
      switch (soundId) {
        case 'zen_bell': this.playZenChime(); break;
        case 'celestial_harp': this.playCelestialHarp(); break;
        case 'temple_bell': this.playTempleBell(); break;
        case 'mystic_flute': this.playMysticFlute(); break;
        case 'morning_light': this.playMorningLight(); break;
        case 'singing_bowl':
        default:
          this.playTibetanBowl();
          break;
      }
    });
  }

  playCompletionFanfare() {
    this.ensureReady(() => {
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const startTime = now + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.0);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(startTime);
        osc.stop(startTime + 3.2);
      });
    });
  }
}

const audioEngine = new PositivityAudioEngine();

// ============================================================================
// 3. APPLICATION STATE & PERSISTENCE
// ============================================================================

const STORAGE_KEY = 'magicians_alarm_v1_data';

const DEFAULT_STATE = {
  todayDate: new Date().toISOString().split('T')[0],
  dailyTarget: 5,
  completedCount: 0,
  completedMinutes: 0,
  pendingCount: 0,
  streakDays: 1,
  totalSessionsAllTime: 0,
  totalMinutesAllTime: 0,
  recentToolIds: [], // For smart randomizer anti-repetition
  sessionsLog: [], // Array of completed session objects {id, toolId, timestamp, date, notes}
  unlockedFortunes: [], // Array of unlocked daily fortune cookie objects {id, date, text, tag}
  dailyRewardClaimed: false,
  alarmSound: 'singing_bowl',
  alarms: [
    { id: 1, time: '08:00', enabled: true, label: 'Morning Awakening' },
    { id: 2, time: '11:00', enabled: true, label: 'Mid-Morning Light' },
    { id: 3, time: '14:00', enabled: true, label: 'Afternoon Reset' },
    { id: 4, time: '17:00', enabled: true, label: 'Twilight Alignment' },
    { id: 5, time: '20:00', enabled: true, label: 'Evening Rampage' }
  ],
  bedtimeAlarm: { time: '22:00', enabled: true, label: 'Night Completion Queue' },
  practiceDurationSeconds: 300 // 5 minutes
};

class AppState {
  constructor() {
    this.data = this.load();
    this.checkDayRollOver();
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const loaded = { ...DEFAULT_STATE, ...JSON.parse(raw) };
        // Clean up any duplicate cookies from previous bug
        if (Array.isArray(loaded.unlockedFortunes)) {
          const seen = new Set();
          loaded.unlockedFortunes = loaded.unlockedFortunes.filter(f => {
            const key = `${f.date || ''}_${f.text || ''}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        }
        return loaded;
      }
    } catch (e) {
      console.warn("Error loading local data, fallback to default", e);
    }
    return { ...DEFAULT_STATE };
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Error saving data", e);
    }
  }

  checkDayRollOver() {
    const todayStr = new Date().toISOString().split('T')[0];
    if (this.data.todayDate !== todayStr) {
      // Check if yesterday completed 5 sessions to maintain streak
      if (this.data.completedCount >= this.data.dailyTarget) {
        this.data.streakDays += 1;
      } else if (this.data.completedCount > 0) {
        // Did not finish 5
        this.data.streakDays = 1;
      }
      // Reset daily counts
      this.data.todayDate = todayStr;
      this.data.completedCount = 0;
      this.data.completedMinutes = 0;
      this.data.pendingCount = 0;
      this.data.dailyRewardClaimed = false;
      this.save();
    }
  }

  addCompletedSession(toolId, reflectionNote = "") {
    this.data.completedCount += 1;
    this.data.completedMinutes += 5;
    this.data.totalSessionsAllTime += 1;
    this.data.totalMinutesAllTime += 5;

    // Deduct pending if in evening queue
    if (this.data.pendingCount > 0) {
      this.data.pendingCount -= 1;
    }

    // Anti-repetition tracking
    this.data.recentToolIds.push(toolId);
    if (this.data.recentToolIds.length > 5) {
      this.data.recentToolIds.shift();
    }

    const sessionEntry = {
      id: Date.now(),
      toolId,
      toolName: POSITIVITY_TOOLS.find(t => t.id === toolId)?.name || "Positivity Tool",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: this.data.todayDate,
      reflectionNote
    };

    this.data.sessionsLog.unshift(sessionEntry);
    this.save();
  }

  postponeSession() {
    this.data.pendingCount += 1;
    this.save();
  }

  claimDailyReward(fortune) {
    // Only allow 1 fortune cookie per day
    const alreadySavedToday = this.data.unlockedFortunes.some(f => f.date === this.data.todayDate);
    if (alreadySavedToday || this.data.dailyRewardClaimed) {
      this.data.dailyRewardClaimed = true;
      this.save();
      return;
    }
    this.data.dailyRewardClaimed = true;
    this.data.unlockedFortunes.unshift({
      id: Date.now(),
      date: this.data.todayDate,
      text: fortune.text,
      tag: fortune.tag
    });
    this.save();
  }

  exportData() {
    return JSON.stringify(this.data, null, 2);
  }

  importData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      this.data = { ...DEFAULT_STATE, ...parsed };
      this.save();
      return true;
    } catch (e) {
      return false;
    }
  }
}

const state = new AppState();

// ============================================================================
// 4. SMART RANDOMIZER (Anti-Repetition Spirit Selection)
// ============================================================================

function pickSpiritTool() {
  const recent = state.data.recentToolIds || [];
  // Exclude tools used in the last 3-4 practices if possible
  let available = POSITIVITY_TOOLS.filter(t => !recent.slice(-3).includes(t.id));
  if (available.length === 0) {
    available = POSITIVITY_TOOLS;
  }
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

// ============================================================================
// 5. SESSION TIMER CONTROLLER
// ============================================================================

class SessionTimerController {
  constructor() {
    this.duration = 300; // 5 mins in seconds
    this.timeLeft = this.duration;
    this.isRunning = false;
    this.timerId = null;
    this.currentTool = null;
    this.stepIndex = 0;
    this.stepIntervalId = null;
    this.isPendingEveningSession = false;
  }

  startSession(tool, isPending = false) {
    this.currentTool = tool;
    this.isPendingEveningSession = isPending;
    this.timeLeft = this.duration;
    this.isRunning = true;
    this.stepIndex = 0;

    // Render Practice View
    renderPracticeView(this.currentTool, this.timeLeft);
    switchView('practice-view');

    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);

    // Rotate step guidance every 50 seconds
    if (this.stepIntervalId) clearInterval(this.stepIntervalId);
    this.stepIntervalId = setInterval(() => {
      if (this.isRunning && this.currentTool.steps.length > 0) {
        this.stepIndex = (this.stepIndex + 1) % this.currentTool.steps.length;
        updatePracticeGuideStep(this.currentTool, this.stepIndex);
      }
    }, 50000);
  }

  tick() {
    if (!this.isRunning) return;

    if (this.timeLeft > 0) {
      this.timeLeft -= 1;
      updatePracticeTimerDisplay(this.timeLeft, this.duration);

      // Halfway chime at 2:30 (150s)
      if (this.timeLeft === 150) {
        audioEngine.playZenChime();
        showToast("✨ Halfway there! Deepen into the light...");
      }
    } else {
      this.completeSession();
    }
  }

  pauseResume() {
    this.isRunning = !this.isRunning;
    const playPauseBtn = document.getElementById('btn-timer-toggle');
    if (playPauseBtn) {
      playPauseBtn.innerHTML = this.isRunning ? '⏸️' : '▶️';
    }
    const stateLabel = document.getElementById('timer-state-label');
    if (stateLabel) {
      stateLabel.textContent = this.isRunning ? 'MEDITATING...' : 'PAUSED';
    }
  }

  completeSession() {
    clearInterval(this.timerId);
    clearInterval(this.stepIntervalId);
    this.isRunning = false;

    // Play completion sound
    audioEngine.playCompletionFanfare();

    // Log to state
    state.addCompletedSession(this.currentTool.id);

    // Show completion modal
    renderSessionCompletedModal(this.currentTool);
  }

  cancelOrPostpone() {
    clearInterval(this.timerId);
    clearInterval(this.stepIntervalId);
    this.isRunning = false;
  }
}

const sessionTimer = new SessionTimerController();

// ============================================================================
// 6. UI RENDERERS & VIEW ROUTING
// ============================================================================

function switchView(viewId) {
  document.querySelectorAll('.view-panel').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active');
  }

  // Update nav tabs
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === viewId);
  });

  // Refresh home stats if returning to home
  if (viewId === 'home-view') {
    refreshHomeView();
  } else if (viewId === 'library-view') {
    renderToolsLibrary();
  } else if (viewId === 'history-view') {
    renderHistoryView();
  } else if (viewId === 'alarms-view') {
    renderAlarmsView();
  }
}

function refreshHomeView() {
  state.checkDayRollOver();

  // Progress Circle & Beads
  const count = state.data.completedCount;
  const target = state.data.dailyTarget;
  const minutes = state.data.completedMinutes;
  const streak = state.data.streakDays;

  // Text
  const countEl = document.getElementById('home-completed-count');
  if (countEl) countEl.textContent = `${count}`;

  const minutesEl = document.getElementById('home-minutes-count');
  if (minutesEl) minutesEl.textContent = `${minutes} mins in high vibration`;

  const streakEl = document.getElementById('home-streak-badge');
  if (streakEl) streakEl.innerHTML = `🔥 ${streak} Day Streak`;

  // SVG Progress Stroke
  const circleBar = document.getElementById('home-progress-stroke');
  if (circleBar) {
    const totalCircumference = 440;
    const progressFraction = Math.min(count / target, 1);
    const strokeOffset = totalCircumference - (totalCircumference * progressFraction);
    circleBar.style.strokeDashoffset = strokeOffset;
  }

  // Session Beads
  const beadsContainer = document.getElementById('home-session-beads');
  if (beadsContainer) {
    beadsContainer.innerHTML = '';
    for (let i = 1; i <= target; i++) {
      const bead = document.createElement('div');
      bead.className = `session-bead ${i <= count ? 'completed' : ''}`;
      bead.textContent = i <= count ? '✓' : i;
      beadsContainer.appendChild(bead);
    }
  }

  // Pending / Evening queue alert banner
  const pendingBanner = document.getElementById('home-pending-banner');
  const pendingCountEl = document.getElementById('pending-count-number');
  if (pendingBanner && pendingCountEl) {
    if (state.data.pendingCount > 0) {
      pendingBanner.style.display = 'flex';
      pendingCountEl.textContent = state.data.pendingCount;
    } else {
      pendingBanner.style.display = 'none';
    }
  }

  // Next Alarm Snippet
  updateNextAlarmDisplay();

  // Daily Fortune Cookie Unlocked Banner if 5 completed
  const rewardClaimBox = document.getElementById('daily-reward-claim-box');
  if (rewardClaimBox) {
    if (count >= target && !state.data.dailyRewardClaimed) {
      rewardClaimBox.style.display = 'flex';
      rewardClaimBox.style.background = 'linear-gradient(135deg, rgba(217, 119, 6, 0.4) 0%, rgba(120, 53, 15, 0.6) 100%)';
      rewardClaimBox.style.borderColor = '#ffd700';
      rewardClaimBox.innerHTML = `
        <div class="pending-alert-info">
          <span style="font-size: 26px;">🥠</span>
          <div class="pending-alert-text">
            <h4 style="color:#ffd700;">5/5 Complete! Fortune Ready</h4>
            <p style="color:#fde68a;">Tap to crack open today's divine reward</p>
          </div>
        </div>
        <button class="btn-primary-glow" style="padding: 6px 14px; font-size: 12px; border-radius: 999px;" onclick="openDailyRewardCeremony()">Crack Cookie</button>
      `;
    } else if (count >= target && state.data.dailyRewardClaimed) {
      // Already claimed today: Show collected status and link to Cookie Jar
      rewardClaimBox.style.display = 'flex';
      rewardClaimBox.style.background = 'rgba(245, 195, 68, 0.08)';
      rewardClaimBox.style.borderColor = 'rgba(245, 195, 68, 0.3)';
      rewardClaimBox.innerHTML = `
        <div class="pending-alert-info">
          <span style="font-size: 24px;">✨</span>
          <div class="pending-alert-text">
            <h4 style="color:#ffd700; font-size: 13px;">Today's Reward Collected</h4>
            <p style="color:#cbd5e1; font-size: 11px;">Wisdom saved in your Cookie Jar</p>
          </div>
        </div>
        <button class="btn-secondary-glass" style="padding: 6px 14px; font-size: 12px; border-radius: 999px; color:#ffd700; border-color: rgba(245, 195, 68, 0.4);" onclick="switchView('history-view')">View Jar</button>
      `;
    } else {
      rewardClaimBox.style.display = 'none';
    }
  }
}

function updateNextAlarmDisplay() {
  const nextAlarmEl = document.getElementById('next-alarm-display');
  if (!nextAlarmEl) return;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let nextAlarm = null;
  let minDiff = 24 * 60;

  state.data.alarms.forEach(a => {
    if (a.enabled) {
      const [h, m] = a.time.split(':').map(Number);
      const alarmMinutes = h * 60 + m;
      let diff = alarmMinutes - currentMinutes;
      if (diff <= 0) diff += 24 * 60; // Next day
      if (diff < minDiff) {
        minDiff = diff;
        nextAlarm = a;
      }
    }
  });

  if (nextAlarm) {
    const hoursAway = Math.floor(minDiff / 60);
    const minsAway = minDiff % 60;
    nextAlarmEl.textContent = `${nextAlarm.time} (${hoursAway > 0 ? hoursAway + 'h ' : ''}${minsAway}m away)`;
  } else {
    nextAlarmEl.textContent = "No active alarms";
  }
}

// ============================================================================
// 7. SPIRIT CEREMONY & SELECTION
// ============================================================================

let currentSpiritSelectedTool = null;

function triggerLetSpiritDecide() {
  audioEngine.playZenChime();

  const modal = document.getElementById('spirit-ceremony-modal');
  const orb = document.getElementById('ceremony-orb-icon');
  const title = document.getElementById('ceremony-tool-title');
  const quote = document.getElementById('ceremony-tool-quote');
  const startBtn = document.getElementById('ceremony-start-btn');

  modal.classList.add('active');
  title.textContent = "Seeking Spirit's Guidance...";
  quote.textContent = "Aligning with your highest frequency...";
  startBtn.style.display = 'none';

  // Mystical Shuffling Animation
  let shuffleCount = 0;
  const icons = ['✨', '🕊️', '🙏', '🌸', '🌟', '🌿', '💎', '🤲', '🌈', '👑'];
  const interval = setInterval(() => {
    orb.textContent = icons[shuffleCount % icons.length];
    shuffleCount++;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    currentSpiritSelectedTool = pickSpiritTool();

    orb.textContent = currentSpiritSelectedTool.icon;
    title.textContent = currentSpiritSelectedTool.name;
    quote.textContent = `"${currentSpiritSelectedTool.tagline}"`;
    startBtn.style.display = 'block';

    audioEngine.playCelestialHarp();
  }, 1600);
}

function closeSpiritCeremonyModal() {
  document.getElementById('spirit-ceremony-modal').classList.remove('active');
}

function startPracticeFromSpirit() {
  if (currentSpiritSelectedTool) {
    closeSpiritCeremonyModal();
    sessionTimer.startSession(currentSpiritSelectedTool);
  }
}

// ============================================================================
// 8. PRACTICE VIEW LOGIC
// ============================================================================

function renderPracticeView(tool, timeLeft) {
  document.getElementById('practice-tool-badge').textContent = `Tool #${tool.id} • ${tool.category}`;
  document.getElementById('practice-tool-heading').textContent = tool.name;
  document.getElementById('practice-tool-tagline').textContent = tool.tagline;

  updatePracticeTimerDisplay(timeLeft, 300);
  updatePracticeGuideStep(tool, 0);

  const playPauseBtn = document.getElementById('btn-timer-toggle');
  if (playPauseBtn) playPauseBtn.innerHTML = '⏸️';

  const stateLabel = document.getElementById('timer-state-label');
  if (stateLabel) stateLabel.textContent = 'MEDITATING...';
}

function updatePracticeTimerDisplay(secondsLeft, totalDuration = 300) {
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const digitsEl = document.getElementById('timer-digits');
  if (digitsEl) digitsEl.textContent = timeStr;

  // SVG Progress Fill
  const strokeBar = document.getElementById('timer-fg-fill');
  if (strokeBar) {
    const totalDash = 600;
    const progress = secondsLeft / totalDuration;
    strokeBar.style.strokeDashoffset = totalDash * (1 - progress);
  }
}

function updatePracticeGuideStep(tool, stepIdx) {
  const stepTitleEl = document.getElementById('guide-step-title');
  const stepTextEl = document.getElementById('guide-step-text');
  if (stepTitleEl && stepTextEl && tool.steps) {
    stepTitleEl.textContent = `PRACTICE GUIDANCE (${stepIdx + 1}/${tool.steps.length})`;
    stepTextEl.textContent = tool.steps[stepIdx];
  }
}

function openPostponeModal() {
  document.getElementById('postpone-modal').classList.add('active');
}

function closePostponeModal() {
  document.getElementById('postpone-modal').classList.remove('active');
}

function postponeToTonight() {
  sessionTimer.cancelOrPostpone();
  state.postponeSession();
  closePostponeModal();
  closeSpiritCeremonyModal();
  dismissAlarmRinging();
  showToast("🌙 Practice queued for your evening/bedtime routine.");
  switchView('home-view');
}

function snoozeSession(minutes) {
  sessionTimer.cancelOrPostpone();
  closePostponeModal();
  closeSpiritCeremonyModal();
  dismissAlarmRinging();
  showToast(`⏰ Reminding you in ${minutes} minutes for your practice.`);
  setTimeout(() => {
    triggerAlarmAlert({
      label: `Postponed Positivity Practice (${minutes}m snooze)`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }, minutes * 60 * 1000);
  switchView('home-view');
}

// ============================================================================
// 9. SESSION COMPLETED & DAILY REWARD FORTUNE COOKIE
// ============================================================================

function renderSessionCompletedModal(tool) {
  const modal = document.getElementById('session-completed-modal');
  const heading = document.getElementById('completed-count-heading');
  const subtext = document.getElementById('completed-subtext');
  const dailyRewardSection = document.getElementById('completed-daily-reward-unlock');

  const count = state.data.completedCount;
  const target = state.data.dailyTarget;

  heading.textContent = `${count} of ${target} Completed Today!`;
  subtext.textContent = `You completed 5 minutes of ${tool.name}. Your frequency is soaring!`;

  if (count >= target && !state.data.dailyRewardClaimed) {
    dailyRewardSection.style.display = 'block';
  } else {
    dailyRewardSection.style.display = 'none';
  }

  modal.classList.add('active');
}

function closeCompletedModal() {
  document.getElementById('session-completed-modal').classList.remove('active');
  refreshHomeView();
  switchView('home-view');
}

// FORTUNE COOKIE CRACKING CEREMONY
let currentRevealedFortune = null;
let isCookieCracked = false;

function pickUniqueDailyFortune() {
  const unlockedTexts = new Set((state.data.unlockedFortunes || []).map(f => f.text));
  // Pick exclusively from fortunes user has not unlocked yet!
  let uncollected = FORTUNE_MESSAGES.filter(f => !unlockedTexts.has(f.text));
  if (uncollected.length === 0) {
    // If all 50 collected, restart but exclude the most recent one
    const lastText = state.data.unlockedFortunes[0]?.text;
    uncollected = FORTUNE_MESSAGES.filter(f => f.text !== lastText);
    if (uncollected.length === 0) uncollected = FORTUNE_MESSAGES;
  }
  const randomIndex = Math.floor(Math.random() * uncollected.length);
  return uncollected[randomIndex];
}

function openDailyRewardCeremony() {
  if (state.data.dailyRewardClaimed) {
    showToast("🥠 You have already collected today's fortune! Opening your Cookie Jar...");
    switchView('history-view');
    return;
  }

  isCookieCracked = false;
  const modal = document.getElementById('daily-reward-modal');
  const cookieImg = document.getElementById('fortune-cookie-graphic');
  const fortuneSlip = document.getElementById('revealed-fortune-slip');
  const tapHint = document.getElementById('cookie-tap-hint');

  // Pick unique uncollected fortune
  currentRevealedFortune = pickUniqueDailyFortune();

  cookieImg.style.transform = 'scale(1)';
  cookieImg.style.opacity = '1';
  fortuneSlip.style.display = 'none';
  tapHint.style.display = 'block';

  modal.classList.add('active');
}

function crackFortuneCookie() {
  if (isCookieCracked || state.data.dailyRewardClaimed) return;
  isCookieCracked = true;

  const cookieImg = document.getElementById('fortune-cookie-graphic');
  const fortuneSlip = document.getElementById('revealed-fortune-slip');
  const tapHint = document.getElementById('cookie-tap-hint');
  const slipText = document.getElementById('fortune-slip-quote');
  const slipTag = document.getElementById('fortune-slip-tag');

  audioEngine.playTibetanBowl(432, 2);
  audioEngine.playCelestialHarp();

  // Animation crack
  cookieImg.style.transform = 'scale(1.2) rotate(15deg)';
  cookieImg.style.opacity = '0.3';
  tapHint.style.display = 'none';

  setTimeout(() => {
    slipText.textContent = `"${currentRevealedFortune.text}"`;
    slipTag.textContent = currentRevealedFortune.tag;
    fortuneSlip.style.display = 'block';

    // Claim in state (single claim per day)
    state.claimDailyReward(currentRevealedFortune);
    showToast("✨ Fortune cookie wisdom saved to your Cookie Jar!");
  }, 400);
}

function closeDailyRewardModal() {
  isCookieCracked = false;
  document.getElementById('daily-reward-modal').classList.remove('active');
  refreshHomeView();
}

// ============================================================================
// 10. EVENING / BEDTIME QUEUE WORKFLOW
// ============================================================================

function startEveningQueue() {
  if (state.data.pendingCount <= 0) {
    showToast("🌙 No pending sessions in your queue!");
    return;
  }
  const tool = pickSpiritTool();
  showToast(`🌙 Night Practice: Spirit has selected ${tool.name}`);
  sessionTimer.startSession(tool, true);
}

// ============================================================================
// 11. 10-TOOL LIBRARY
// ============================================================================

function renderToolsLibrary(filterCategory = 'All', searchQuery = '') {
  const container = document.getElementById('tools-library-list');
  if (!container) return;
  container.innerHTML = '';

  const filtered = POSITIVITY_TOOLS.filter(t => {
    const matchesCat = (filterCategory === 'All' || t.category.includes(filterCategory));
    const matchesSearch = (!searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  filtered.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'tool-item-card';
    card.innerHTML = `
      <div class="tool-item-head">
        <span class="tool-item-number">TOOL #${tool.id}</span>
        <span style="font-size: 20px;">${tool.icon}</span>
      </div>
      <div class="tool-item-title">${tool.name}</div>
      <div class="tool-item-summary">${tool.description}</div>
      <div class="tool-item-footer">
        <span>✨ ${tool.category}</span>
        <button class="btn-primary-glow" style="padding: 6px 12px; font-size: 11px; border-radius: 999px;" onclick="startToolFreestyle(${tool.id})">Practice (5m)</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function startToolFreestyle(toolId) {
  const tool = POSITIVITY_TOOLS.find(t => t.id === toolId);
  if (tool) {
    sessionTimer.startSession(tool);
  }
}

// ============================================================================
// 12. ALARMS & SOUND SETTINGS
// ============================================================================

function formatTime12h(time24) {
  if (!time24) return '07:00 AM';
  const parts = time24.split(':');
  let h = parseInt(parts[0], 10);
  const m = parts[1] || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h < 10 ? '0' + h : h}:${m} ${ampm}`;
}

let activeEditingAlarmIndex = null;
let pickerHour12 = 7;
let pickerMinute = 0;
let pickerPeriod = 'AM';

function editAlarmTime(index) {
  activeEditingAlarmIndex = index;
  let currentTime = '07:00';
  if (index === 'bedtime') {
    currentTime = state.data.bedtimeAlarm ? state.data.bedtimeAlarm.time : '22:00';
  } else if (state.data.alarms[index]) {
    currentTime = state.data.alarms[index].time;
  }

  // 1. If running natively in Android APK, open Samsung native TimePickerDialog
  if (isNativeAndroidApp() && window.AndroidAlarmBridge && typeof window.AndroidAlarmBridge.openTimePicker === 'function') {
    window.AndroidAlarmBridge.openTimePicker(index === 'bedtime' ? 999 : index, currentTime);
    return;
  }

  // 2. Open interactive In-App Time Picker Modal
  openTimePickerModal(index, currentTime);
}

// Callback from native Android TimePickerDialog
window.onNativeTimePicked = function(alarmIndex, time24) {
  if (alarmIndex === 999 || alarmIndex === 'bedtime') {
    updateBedtimeAlarm(time24);
  } else if (typeof alarmIndex === 'number' && state.data.alarms[alarmIndex]) {
    updateAlarmTime(alarmIndex, time24);
  }
  renderAlarmsView();
};

function openTimePickerModal(index, currentTime) {
  const modal = document.getElementById('time-picker-modal');
  if (!modal) return;

  const titleEl = document.getElementById('time-picker-title');
  if (titleEl) {
    titleEl.textContent = index === 'bedtime' ? 'Set Bedtime Queue Time' : `Set Reminder #${index + 1} Time`;
  }

  const parts = (currentTime || '07:00').split(':');
  let h = parseInt(parts[0], 10) || 7;
  pickerMinute = parseInt(parts[1], 10) || 0;
  pickerPeriod = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  pickerHour12 = h === 0 ? 12 : h;

  updateTimePickerDisplay();
  modal.classList.add('active');
}

function closeTimePickerModal() {
  const modal = document.getElementById('time-picker-modal');
  if (modal) modal.classList.remove('active');
}

function updateTimePickerDisplay() {
  const hEl = document.getElementById('picker-hour-display');
  const mEl = document.getElementById('picker-min-display');
  const amBtn = document.getElementById('picker-am-btn');
  const pmBtn = document.getElementById('picker-pm-btn');

  const formattedH = pickerHour12 < 10 ? '0' + pickerHour12 : '' + pickerHour12;
  const formattedM = pickerMinute < 10 ? '0' + pickerMinute : '' + pickerMinute;

  if (hEl) {
    if (hEl.tagName === 'INPUT') hEl.value = formattedH;
    else hEl.textContent = formattedH;
  }
  if (mEl) {
    if (mEl.tagName === 'INPUT') mEl.value = formattedM;
    else mEl.textContent = formattedM;
  }

  if (amBtn && pmBtn) {
    amBtn.classList.toggle('active', pickerPeriod === 'AM');
    pmBtn.classList.toggle('active', pickerPeriod === 'PM');
  }
}

function onKeypadHourInput(val) {
  let num = parseInt(val, 10);
  if (!isNaN(num)) {
    if (num > 12) num = 12;
    if (num < 1) num = 1;
    pickerHour12 = num;
  }
}

function onKeypadHourBlur(el) {
  let num = parseInt(el.value, 10);
  if (isNaN(num) || num < 1) num = 12;
  if (num > 12) num = 12;
  pickerHour12 = num;
  el.value = num < 10 ? '0' + num : '' + num;
}

function onKeypadMinuteInput(val) {
  let num = parseInt(val, 10);
  if (!isNaN(num)) {
    if (num > 59) num = 59;
    if (num < 0) num = 0;
    pickerMinute = num;
  }
}

function onKeypadMinuteBlur(el) {
  let num = parseInt(el.value, 10);
  if (isNaN(num) || num < 0) num = 0;
  if (num > 59) num = 59;
  pickerMinute = num;
  el.value = num < 10 ? '0' + num : '' + num;
}

function stepTimePickerHour(delta) {
  pickerHour12 += delta;
  if (pickerHour12 > 12) pickerHour12 = 1;
  if (pickerHour12 < 1) pickerHour12 = 12;
  updateTimePickerDisplay();
}

function stepTimePickerMinute(delta) {
  pickerMinute += delta;
  if (pickerMinute >= 60) pickerMinute = 0;
  if (pickerMinute < 0) pickerMinute = 55;
  updateTimePickerDisplay();
}

function setTimePickerPeriod(p) {
  pickerPeriod = p;
  updateTimePickerDisplay();
}

function setTimePickerExplicit(h, m, p) {
  pickerHour12 = h;
  pickerMinute = m;
  pickerPeriod = p;
  updateTimePickerDisplay();
}

function saveSelectedTimePicker() {
  let h24 = pickerHour12 % 12;
  if (pickerPeriod === 'PM') h24 += 12;
  const timeStr = `${h24 < 10 ? '0' + h24 : h24}:${pickerMinute < 10 ? '0' + pickerMinute : pickerMinute}`;

  if (activeEditingAlarmIndex === 'bedtime') {
    updateBedtimeAlarm(timeStr);
  } else if (typeof activeEditingAlarmIndex === 'number') {
    updateAlarmTime(activeEditingAlarmIndex, timeStr);
  }

  closeTimePickerModal();
  renderAlarmsView();
}

function renderAlarmsView() {
  const alarmList = document.getElementById('alarms-list-container');
  if (alarmList) {
    alarmList.innerHTML = '';
    state.data.alarms.forEach((alarm, idx) => {
      const row = document.createElement('div');
      row.className = 'alarm-row-item';
      row.innerHTML = `
        <div class="alarm-time-group" onclick="editAlarmTime(${idx})" style="cursor: pointer; flex: 1;">
          <button type="button" class="alarm-time-btn" onclick="editAlarmTime(${idx}); event.stopPropagation();" title="Tap to change alarm time">
            <span class="alarm-time-text">${formatTime12h(alarm.time)}</span>
            <span class="alarm-edit-badge">✏️ Edit</span>
          </button>
          <div>
            <div style="font-weight:700; font-size:13.5px; color:white;">Reminder ${idx + 1}</div>
            <div class="alarm-label-text">${alarm.label}</div>
          </div>
        </div>
        <label class="switch" style="margin-left: 10px;">
          <input type="checkbox" ${alarm.enabled ? 'checked' : ''} onchange="toggleAlarmEnabled(${idx}, this.checked)">
          <span class="slider"></span>
        </label>
      `;
      alarmList.appendChild(row);
    });
  }

  // Bedtime alarm
  const bedtimeText = document.getElementById('bedtime-time-text');
  const bedtimeToggle = document.getElementById('bedtime-alarm-toggle');
  if (bedtimeText && state.data.bedtimeAlarm) {
    bedtimeText.textContent = formatTime12h(state.data.bedtimeAlarm.time);
  }
  if (bedtimeToggle && state.data.bedtimeAlarm) {
    bedtimeToggle.checked = state.data.bedtimeAlarm.enabled;
  }

  // Sound selection grid
  renderSoundSelectionGrid();
}

function updateAlarmTime(index, newTime) {
  state.data.alarms[index].time = newTime;
  state.save();
  updateNextAlarmDisplay();
  syncAlarmsToNativeAndroid();
  showToast(`⏰ Reminder #${index + 1} set to ${formatTime12h(newTime)}`);
}

function toggleAlarmEnabled(index, enabled) {
  state.data.alarms[index].enabled = enabled;
  state.save();
  updateNextAlarmDisplay();
  syncAlarmsToNativeAndroid();
  showToast(enabled ? `🔔 Reminder #${index + 1} enabled` : `🔕 Reminder #${index + 1} disabled`);
}

function updateBedtimeAlarm(newTime) {
  state.data.bedtimeAlarm.time = newTime;
  state.save();
  syncAlarmsToNativeAndroid();
  showToast(`🌙 Bedtime alarm set to ${formatTime12h(newTime)}`);
}

function toggleBedtimeAlarm(enabled) {
  state.data.bedtimeAlarm.enabled = enabled;
  state.save();
  syncAlarmsToNativeAndroid();
  showToast(enabled ? "🌙 Bedtime queue enabled" : "🌙 Bedtime queue disabled");
}

function renderSoundSelectionGrid() {
  const grid = document.getElementById('sounds-grid');
  if (!grid) return;
  grid.innerHTML = '';

  SOUNDS.forEach(snd => {
    const isSelected = state.data.alarmSound === snd.id;
    const card = document.createElement('div');
    card.className = `sound-item-pill ${isSelected ? 'selected' : ''}`;
    card.dataset.soundId = snd.id;
    card.innerHTML = `
      <div class="sound-item-info">
        <span>${snd.icon}</span> ${snd.name}
      </div>
      <button class="sound-play-btn" title="Preview Sound">${isSelected ? '🔊' : '▶'}</button>
    `;

    card.onclick = () => {
      // 1. Trigger audio sample immediately within the direct user gesture context
      previewSound(snd.id);

      // 2. Persist state
      state.data.alarmSound = snd.id;
      state.save();

      // 3. Update UI state without tearing down or rebuilding DOM
      document.querySelectorAll('#sounds-grid .sound-item-pill').forEach(el => {
        el.classList.remove('selected');
        const btn = el.querySelector('.sound-play-btn');
        if (btn) btn.textContent = '▶';
      });
      card.classList.add('selected');
      const btn = card.querySelector('.sound-play-btn');
      if (btn) btn.textContent = '🔊';

      showToast(`🎵 Playing: ${snd.name}`);
    };

    grid.appendChild(card);
  });
}

function previewSound(soundId) {
  audioEngine.unlockAudio();
  audioEngine.playSoundById(soundId);
}

// Screen Wake Lock to prevent phone display and audio from sleeping during alarm or practice
let screenWakeLock = null;

async function requestScreenWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      screenWakeLock = await navigator.wakeLock.request('screen');
      screenWakeLock.addEventListener('release', () => {
        screenWakeLock = null;
      });
    } catch (err) {}
  }
}

function releaseScreenWakeLock() {
  if (screenWakeLock) {
    screenWakeLock.release().then(() => { screenWakeLock = null; }).catch(() => {});
  }
}

// Continuous Alarm Sound & Vibration Loop
let alarmRingerInterval = null;
let alarmVibrationInterval = null;

function startAlarmSoundLoop() {
  stopAlarmSoundLoop();
  requestScreenWakeLock();

  // Play sound immediately
  audioEngine.playSoundById(state.data.alarmSound);

  // Vibrate mobile device immediately
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate([600, 200, 600, 200, 1000]);
    } catch (e) {}
  }

  // Loop sound every 3.5 seconds until dismissed
  alarmRingerInterval = setInterval(() => {
    audioEngine.playSoundById(state.data.alarmSound);
  }, 3500);

  // Loop vibration every 2.6 seconds until dismissed
  if ('vibrate' in navigator) {
    alarmVibrationInterval = setInterval(() => {
      try {
        navigator.vibrate([600, 200, 600, 200, 800]);
      } catch (e) {}
    }, 2600);
  }
}

function stopAlarmSoundLoop() {
  if (alarmRingerInterval) {
    clearInterval(alarmRingerInterval);
    alarmRingerInterval = null;
  }
  if (alarmVibrationInterval) {
    clearInterval(alarmVibrationInterval);
    alarmVibrationInterval = null;
  }
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(0);
    } catch (e) {}
  }
  releaseScreenWakeLock();
}

function sendAlarmSystemNotification(alarmObj) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    const title = "🔔 Time for Positivity Practice!";
    const body = `${alarmObj.label || 'Your 5-minute positivity reminder'} (${alarmObj.time})`;
    const options = {
      body: body,
      icon: "icon-192.png",
      badge: "icon-192.png",
      tag: "magicians-alarm",
      renotify: true,
      requireInteraction: true,
      vibrate: [600, 200, 600, 200, 1000]
    };

    if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(title, options);
      }).catch(() => {
        try { new Notification(title, options); } catch (e) {}
      });
    } else {
      try { new Notification(title, options); } catch (e) {}
    }
  }
}

// Robust Live Alarm Watcher (Evaluates every 2s, immune to timer drift)
let lastCheckedAlarmMinute = "";

function startAlarmClockTicker() {
  setInterval(() => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (timeStr === lastCheckedAlarmMinute) {
      return; // Already triggered this minute
    }
    lastCheckedAlarmMinute = timeStr;

    // Check standard alarms
    state.data.alarms.forEach(a => {
      if (a.enabled && a.time === timeStr && state.data.completedCount < state.data.dailyTarget) {
        triggerAlarmAlert(a);
      }
    });

    // Check bedtime alarm
    if (state.data.bedtimeAlarm.enabled && state.data.bedtimeAlarm.time === timeStr) {
      if (state.data.completedCount < state.data.dailyTarget || state.data.pendingCount > 0) {
        triggerAlarmAlert({
          label: "🌙 Bedtime Positivity Queue: Time to finish your 5 daily practices!",
          time: state.data.bedtimeAlarm.time
        });
      }
    }
  }, 2000);
}

function triggerAlarmAlert(alarmObj) {
  // Start repeating sound + vibration loop
  startAlarmSoundLoop();

  const modal = document.getElementById('alarm-ringing-modal');
  const title = document.getElementById('alarm-ringing-title');
  const sub = document.getElementById('alarm-ringing-sub');

  if (title) title.textContent = "Time for Positivity Practice!";
  if (sub) sub.textContent = `${alarmObj.label || 'Your 5-minute positivity reminder'} (${alarmObj.time})`;

  if (modal) modal.classList.add('active');

  sendAlarmSystemNotification(alarmObj);
}

function dismissAlarmRinging() {
  stopAlarmSoundLoop();
  if (window.AndroidAlarmBridge && typeof window.AndroidAlarmBridge.stopNativeAlarmSound === 'function') {
    try { window.AndroidAlarmBridge.stopNativeAlarmSound(); } catch (e) {}
  }
  const modal = document.getElementById('alarm-ringing-modal');
  if (modal) modal.classList.remove('active');
}

function startPracticeFromAlarm() {
  dismissAlarmRinging();
  triggerLetSpiritDecide();
}

function testAlarmSound() {
  triggerAlarmAlert({
    label: "Demo Positivity Reminder",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
}

function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showToast("🔔 Notification permissions enabled!");
      } else {
        showToast("⚠️ Notifications were not allowed.");
      }
    });
  }
}

// ============================================================================
// 13. HISTORY, STATS & COOKIE JAR VAULT
// ============================================================================

function renderHistoryView() {
  // Stats
  document.getElementById('stat-total-sessions').textContent = state.data.totalSessionsAllTime;
  document.getElementById('stat-total-minutes').textContent = `${state.data.totalMinutesAllTime}m`;
  document.getElementById('stat-streak').textContent = `${state.data.streakDays} Days`;

  // Cookie Jar Grid
  const cookieJar = document.getElementById('cookie-jar-grid');
  const titleBadge = document.getElementById('cookie-jar-title-badge');
  if (titleBadge) {
    const totalCollected = (state.data.unlockedFortunes || []).length;
    titleBadge.textContent = `🥠 Unlocked Fortune Cookie Jar (${totalCollected} of ${FORTUNE_MESSAGES.length} Collected)`;
  }
  if (cookieJar) {
    cookieJar.innerHTML = '';
    if (state.data.unlockedFortunes.length === 0) {
      cookieJar.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:var(--text-secondary); font-size:12.5px; padding: 20px;">Complete 5 daily sessions to unlock your first divine fortune cookie! 🥠</div>`;
    } else {
      state.data.unlockedFortunes.forEach(f => {
        const item = document.createElement('div');
        item.className = 'revealed-fortune-slip';
        item.style.display = 'block';
        item.style.marginBottom = '10px';
        item.innerHTML = `
          <div class="slip-tag">${f.tag} • ${f.date}</div>
          <div class="slip-text">${f.text}</div>
        `;
        cookieJar.appendChild(item);
      });
    }
  }

  // Session History Timeline
  const logContainer = document.getElementById('session-history-timeline');
  if (logContainer) {
    logContainer.innerHTML = '';
    if (state.data.sessionsLog.length === 0) {
      logContainer.innerHTML = `<div style="text-align:center; color:var(--text-secondary); font-size:12.5px; padding:20px;">No sessions completed yet today. Let Spirit decide your first tool!</div>`;
    } else {
      state.data.sessionsLog.forEach(s => {
        const row = document.createElement('div');
        row.className = 'history-item-row';
        row.innerHTML = `
          <div>
            <div style="font-weight:700; font-size:13.5px; color:white;">${s.toolName}</div>
            <div style="font-size:11.5px; color:var(--text-secondary);">${s.date} at ${s.timestamp} • 5 mins</div>
          </div>
          <span class="badge-completed-tag">✓ Completed</span>
        `;
        logContainer.appendChild(row);
      });
    }
  }
}

// ============================================================================
// 14. LOCAL BACKUP & RESTORE
// ============================================================================

function exportDataBackup() {
  const jsonStr = state.exportData();
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `magicians_alarm_backup_${state.data.todayDate}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("💾 Backup downloaded successfully!");
}

function importDataBackup(fileInput) {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const success = state.importData(e.target.result);
    if (success) {
      showToast("✅ Backup restored successfully!");
      refreshHomeView();
    } else {
      showToast("❌ Failed to parse backup file.");
    }
  };
  reader.readAsText(file);
}

// ============================================================================
// 15. TOAST NOTIFICATIONS & COSMIC CANVAS
// ============================================================================

function showToast(msg) {
  const toast = document.getElementById('toast-notice');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

function initCosmicCanvas() {
  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const starCount = 65;
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 195, 68, ${s.alpha})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#ffd700';
      ctx.fill();

      s.x += s.dx;
      s.y += s.dy;

      if (s.x < 0) s.x = width;
      if (s.x > width) s.x = 0;
      if (s.y < 0) s.y = height;
      if (s.y > height) s.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ============================================================================
// 15.5. TEACHING DOCUMENT MODAL CONTROLLER
// ============================================================================

function openTeachingModal() {
  const modal = document.getElementById('teaching-doc-modal');
  if (modal) {
    modal.classList.add('active');
    // Scroll body to top whenever opened
    const body = modal.querySelector('.teaching-modal-body');
    if (body) body.scrollTop = 0;
  }
}

function closeTeachingModal() {
  const modal = document.getElementById('teaching-doc-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// ============================================================================
// 15.8. NATIVE ANDROID ALARM BRIDGE (SAMSUNG & ANDROID EXACT WAKE-UP)
// ============================================================================

function isNativeAndroidApp() {
  return typeof window.AndroidAlarmBridge !== 'undefined';
}

function syncAlarmsToNativeAndroid() {
  if (!isNativeAndroidApp()) return;

  try {
    state.data.alarms.forEach(a => {
      window.AndroidAlarmBridge.setNativeAlarm(
        a.id,
        a.time,
        a.label || "Spirit's Positivity Challenge",
        state.data.alarmSound || 'singing_bowl',
        !!a.enabled,
        JSON.stringify([1, 2, 3, 4, 5, 6, 7])
      );
    });

    if (state.data.bedtimeAlarm) {
      window.AndroidAlarmBridge.setNativeAlarm(
        888,
        state.data.bedtimeAlarm.time,
        "🌙 Bedtime Queue: Finish your 5 daily practices",
        state.data.alarmSound || 'singing_bowl',
        !!state.data.bedtimeAlarm.enabled,
        "[]"
      );
    }
    console.log("Synchronized alarms with Android AlarmManager.");
  } catch (err) {
    console.warn("Failed to sync alarms with Android bridge:", err);
  }
}

function checkNativeAndroidPermissions() {
  if (!isNativeAndroidApp()) return;

  try {
    const statusJson = window.AndroidAlarmBridge.getPermissionsStatus();
    const status = JSON.parse(statusJson);

    // Update badges in settings if visible
    const badgeBattery = document.getElementById('perm-badge-battery');
    if (badgeBattery) {
      if (status.batteryOptimizationIgnored) {
        badgeBattery.className = 'permission-badge granted';
        badgeBattery.textContent = '✓ Granted';
      } else {
        badgeBattery.className = 'permission-badge missing';
        badgeBattery.textContent = 'Enable';
      }
    }

    const badgeExact = document.getElementById('perm-badge-exact');
    if (badgeExact) {
      if (status.exactAlarm) {
        badgeExact.className = 'permission-badge granted';
        badgeExact.textContent = '✓ Granted';
      } else {
        badgeExact.className = 'permission-badge missing';
        badgeExact.textContent = 'Enable';
      }
    }

    const badgeNotif = document.getElementById('perm-badge-notif');
    if (badgeNotif) {
      if (status.notifications) {
        badgeNotif.className = 'permission-badge granted';
        badgeNotif.textContent = '✓ Granted';
      } else {
        badgeNotif.className = 'permission-badge missing';
        badgeNotif.textContent = 'Enable';
      }
    }

    const badgeOverlay = document.getElementById('perm-badge-overlay');
    if (badgeOverlay) {
      if (status.overlay) {
        badgeOverlay.className = 'permission-badge granted';
        badgeOverlay.textContent = '✓ Granted';
      } else {
        badgeOverlay.className = 'permission-badge missing';
        badgeOverlay.textContent = 'Enable';
      }
    }

    // Samsung Device Care row
    const rowSamsung = document.getElementById('perm-row-samsung');
    if (rowSamsung && status.isSamsung) {
      rowSamsung.style.display = 'flex';
    }

    // First time onboarding modal
    const hasSeenModal = localStorage.getItem('magicians_native_perm_seen');
    if (!status.allGranted && !hasSeenModal) {
      openNativePermissionsModal();
    }
  } catch (e) {
    console.warn("Error reading native permissions:", e);
  }
}

function openNativePermissionsModal() {
  const modal = document.getElementById('native-permissions-modal');
  if (modal) modal.classList.add('active');
}

function closeNativePermissionsModal() {
  localStorage.setItem('magicians_native_perm_seen', 'true');
  const modal = document.getElementById('native-permissions-modal');
  if (modal) modal.classList.remove('active');
}

function nativeRequestBattery() {
  if (isNativeAndroidApp()) {
    window.AndroidAlarmBridge.requestBatteryOptimization();
    setTimeout(checkNativeAndroidPermissions, 1000);
  } else {
    showToast("Background battery optimization settings are on Android devices.");
  }
}

function nativeRequestExactAlarm() {
  if (isNativeAndroidApp()) {
    window.AndroidAlarmBridge.requestExactAlarmPermission();
    setTimeout(checkNativeAndroidPermissions, 1000);
  }
}

function nativeRequestNotifications() {
  if (isNativeAndroidApp()) {
    window.AndroidAlarmBridge.requestNotificationPermission();
    setTimeout(checkNativeAndroidPermissions, 1000);
  } else {
    requestNotificationPermission();
  }
}

function nativeRequestOverlay() {
  if (isNativeAndroidApp()) {
    window.AndroidAlarmBridge.requestOverlayPermission();
    setTimeout(checkNativeAndroidPermissions, 1000);
  }
}

function nativeOpenSamsungDeviceCare() {
  if (isNativeAndroidApp()) {
    window.AndroidAlarmBridge.openSamsungDeviceCare();
  }
}

function runNative5SecTest() {
  if (isNativeAndroidApp()) {
    window.AndroidAlarmBridge.testNativeAlarm(5);
    showToast("🔔 5-second test alarm scheduled! Lock your phone screen NOW to watch it ring!");
  } else {
    showToast("Testing in browser... Get ready!");
    setTimeout(() => {
      triggerAlarmAlert({
        label: "⚡ Real Phone Alarm 5s Test",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 5000);
  }
}

// ============================================================================
// 16. INITIALIZATION ON DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
