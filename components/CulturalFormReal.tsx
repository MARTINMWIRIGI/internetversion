"use client"

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

import { motion, AnimatePresence } from 'framer-motion'

// Add this function instead:
const triggerConfetti = () => {
  if (typeof window !== 'undefined') {
    import('canvas-confetti').then((module) => {
      const confetti = module.default;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    });
  }
};

// Then replace all confetti() calls with triggerConfetti()
// Types
type LanguageType = 'meru' | 'kikuyu' | 'swahili' | 'sheng'
type WordType = {
  id: number
  english: string
  category: string
  partOfSpeech: string
}

type AchievementType = {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  total: number
}

type CommunityScoreType = {
  language: string
  totalWords: number
  rank: number
  activeUsers: number
}

// Voice presets for different languages
const VOICE_PRESETS = {
  meru: { rate: 0.9, pitch: 1, lang: 'sw-KE' },
  kikuyu: { rate: 0.9, pitch: 1, lang: 'sw-KE' },
  swahili: { rate: 1, pitch: 1, lang: 'sw-KE' },
  sheng: { rate: 1.1, pitch: 1.1, lang: 'en-KE' },
};

// Language options with enhanced metadata
const LANGUAGES = [
  { 
    id: 'meru' as LanguageType, 
    name: 'Meru', 
    flag: '🌄', 
    color: 'from-green-800 to-emerald-600',
    difficulty: 'Medium',
    description: 'Preserve Meru traditions and vocabulary',
    learners: 1250
  },
  { 
    id: 'kikuyu' as LanguageType, 
    name: 'Kikuyu', 
    flag: '🏔️', 
    color: 'from-blue-800 to-purple-600',
    difficulty: 'Medium',
    description: 'Learn the largest Kenyan indigenous language',
    learners: 2800
  },
  { 
    id: 'swahili' as LanguageType, 
    name: 'Swahili', 
    flag: '🏖️', 
    color: 'from-yellow-800 to-orange-600',
    difficulty: 'Easy',
    description: 'East Africa\'s lingua franca',
    learners: 5600
  },
  { 
    id: 'sheng' as LanguageType, 
    name: 'Sheng', 
    flag: '🏙️', 
    color: 'from-gray-800 to-pink-600',
    difficulty: 'Hard',
    description: 'Modern urban slang and expressions',
    learners: 890
  },
];
// Complete 1000 words database (truncated for example - you'd expand this)
const LANGUAGE_ONTOLOGY_WORDS: WordType[] = [
  // Lexical Ontology - People & Family (1-50)
  { id: 1, english: "person", category: "people_family", partOfSpeech: "noun" },
  { id: 2, english: "man", category: "people_family", partOfSpeech: "noun" },
  { id: 3, english: "woman", category: "people_family", partOfSpeech: "noun" },
  { id: 4, english: "child", category: "people_family", partOfSpeech: "noun" },
  { id: 5, english: "baby", category: "people_family", partOfSpeech: "noun" },
  { id: 6, english: "boy", category: "people_family", partOfSpeech: "noun" },
  { id: 7, english: "girl", category: "people_family", partOfSpeech: "noun" },
  { id: 8, english: "father", category: "people_family", partOfSpeech: "noun" },
  { id: 9, english: "mother", category: "people_family", partOfSpeech: "noun" },
  { id: 10, english: "parent", category: "people_family", partOfSpeech: "noun" },
  // Continue with all 1000 words...
  { id: 990, english: "social media", category: "modern_tech", partOfSpeech: "noun" },
  { id: 991, english: "app", category: "modern_tech", partOfSpeech: "noun" },
  { id: 992, english: "data/bundles", category: "modern_tech", partOfSpeech: "noun" },
  { id: 993, english: "cool/awesome", category: "modern_tech", partOfSpeech: "adjective" },
  { id: 994, english: "boring/lame", category: "modern_tech", partOfSpeech: "adjective" },
  { id: 995, english: "friend/buddy (slang)", category: "modern_tech", partOfSpeech: "noun" },
  { id: 996, english: "money (slang)", category: "modern_tech", partOfSpeech: "noun" },
  { id: 997, english: "problem/trouble (slang)", category: "modern_tech", partOfSpeech: "noun" },
  { id: 998, english: "internet", category: "modern_tech", partOfSpeech: "noun" },
  { id: 999, english: "smartphone", category: "modern_tech", partOfSpeech: "noun" },
  { id: 1000, english: "goodbye", category: "greetings", partOfSpeech: "expression" },
];

// Achievement system
const ACHIEVEMENTS: AchievementType[] = [
  { id: 'first_word', title: 'First Steps', description: 'Complete your first word', icon: '👣', unlocked: false, progress: 0, total: 1 },
  { id: '10_words', title: 'Getting Started', description: 'Complete 10 words', icon: '🎯', unlocked: false, progress: 0, total: 10 },
  { id: '50_words', title: 'Language Explorer', description: 'Complete 50 words', icon: '🧭', unlocked: false, progress: 0, total: 50 },
  { id: '100_words', title: 'Word Master', description: 'Complete 100 words', icon: '🏆', unlocked: false, progress: 0, total: 100 },
  { id: 'record_10', title: 'Voice Contributor', description: 'Record 10 pronunciations', icon: '🎤', unlocked: false, progress: 0, total: 10 },
  { id: 'all_languages', title: 'Polyglot', description: 'Try all 4 languages', icon: '🌍', unlocked: false, progress: 0, total: 4 },
  { id: 'daily_streak', title: 'Consistent Learner', description: '3 days in a row', icon: '🔥', unlocked: false, progress: 0, total: 3 },
  { id: 'perfect_pronunciation', title: 'Perfect Pronunciation', description: 'Get 5 perfect scores', icon: '⭐', unlocked: false, progress: 0, total: 5 },
  { id: 'community_helper', title: 'Community Helper', description: 'Help 3 other learners', icon: '🤝', unlocked: false, progress: 0, total: 3 },
  { id: 'complete_category', title: 'Category Expert', description: 'Complete one category', icon: '🎓', unlocked: false, progress: 0, total: 1 },
];

// Sample community data
const COMMUNITY_SCORES: CommunityScoreType[] = [
  { language: 'Swahili', totalWords: 14520, rank: 1, activeUsers: 560 },
  { language: 'Kikuyu', totalWords: 8920, rank: 2, activeUsers: 280 },
  { language: 'Meru', totalWords: 5120, rank: 3, activeUsers: 125 },
  { language: 'Sheng', totalWords: 3120, rank: 4, activeUsers: 89 },
];
// Sample translations - in production, you'd load these from a database
const SAMPLE_TRANSLATIONS = {
  meru: {
    1: "mũndũ",
    2: "mũthuri",
    3: "mũtumia",
    4: "kaana",
    5: "gakaa",
    6: "kĩrĩgũ",
    7: "karĩgũ",
    8: "baba",
    9: "mama",
    10: "mũthee",
    999: "smartifooni",
    1000: "tuonane"
  },
  kikuyu: {
    1: "mũndũ",
    2: "mũthuri",
    3: "mũtumia",
    4: "kana",
    5: "gakaa",
    6: "kĩrĩgũ",
    7: "karĩgũ",
    8: "baba",
    9: "mama",
    10: "mũthee",
    999: "thimũ ikũrũ",
    1000: "tũonanire"
  },
  swahili: {
    1: "mtu",
    2: "mwanaume",
    3: "mwanamke",
    4: "mtoto",
    5: "mtoto mchanga",
    6: "mvulana",
    7: "msichana",
    8: "baba",
    9: "mama",
    10: "mzazi",
    999: "simu mkononi",
    1000: "kwaheri"
  },
  sheng: {
    1: "msee",
    2: "dude",
    3: "chick",
    4: "mtoto",
    5: "kiddo",
    6: "boyo",
    7: "girl",
    8: "baz",
    9: "maz",
    10: "parent",
    999: "smart",
    1000: "tutaonana"
  }
};

export default function LanguageOntologyTrainer() {
  // State management
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | ''>('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [translations, setTranslations] = useState<Record<number, string>>({});
  const [userRecording, setUserRecording] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [achievements, setAchievements] = useState<AchievementType[]>(ACHIEVEMENTS);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [showAchievement, setShowAchievement] = useState<AchievementType | null>(null);
  const [showCommunity, setShowCommunity] = useState(false);
  const [wordCompletionAnim, setWordCompletionAnim] = useState(false);
  const [userStats, setUserStats] = useState({
    totalWordsCompleted: 0,
    totalRecordings: 0,
    perfectScores: 0,
    languagesTried: new Set<string>(),
  });
  
  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);
// Initialize session
useEffect(() => {
  if (selectedLanguage) {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    setCurrentWordIndex(0);
    setTranslations({});
    setUserRecording('');
    setProgress(0);
    
    // Load sample translations for selected language
    const langTranslations = SAMPLE_TRANSLATIONS[selectedLanguage as keyof typeof SAMPLE_TRANSLATIONS] || {};
    setTranslations(langTranslations);
    
    // Update languages tried
    setUserStats(prev => ({
      ...prev,
      languagesTried: new Set([...prev.languagesTried, selectedLanguage])
    }));
    
    // Request microphone permission
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => console.log('Microphone access granted'))
      .catch(err => console.warn('Microphone access denied:', err));
  }
}, [selectedLanguage]);

// Load user progress from localStorage
useEffect(() => {
  const savedProgress = localStorage.getItem('languageTrainerProgress');
  if (savedProgress) {
    const { xp: savedXp, level: savedLevel, streak: savedStreak, stats } = JSON.parse(savedProgress);
    setXp(savedXp || 0);
    setLevel(savedLevel || 1);
    setStreak(savedStreak || 0);
    if (stats) setUserStats(stats);
  }
  
  // Check streak
  const lastVisit = localStorage.getItem('lastVisit');
  const today = new Date().toDateString();
  if (lastVisit === today) {
    // Already visited today
  } else if (lastVisit && new Date(lastVisit).toDateString() === new Date(Date.now() - 86400000).toDateString()) {
    // Visited yesterday - maintain streak
    setStreak(prev => prev + 1);
  } else {
    // Streak broken or first visit
    setStreak(1);
  }
  localStorage.setItem('lastVisit', today);
}, []);

// Save progress to localStorage
useEffect(() => {
  const progressData = {
    xp,
    level,
    streak,
    stats: userStats,
    achievements: achievements.filter(a => a.unlocked).map(a => a.id),
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem('languageTrainerProgress', JSON.stringify(progressData));
}, [xp, level, streak, userStats, achievements]);

// Get current word
const currentWord = LANGUAGE_ONTOLOGY_WORDS[currentWordIndex];
const currentTranslation = translations[currentWord?.id] || '';

// Calculate level from XP
useEffect(() => {
  const newLevel = Math.floor(xp / 100) + 1;
  if (newLevel > level) {
    setLevel(newLevel);
    triggerConfetti();
    showNotification(`🎉 Level Up! You're now level ${newLevel}`);
  }
}, [xp]);
// Speak the word using browser's speech synthesis
const speakWord = (text: string) => {
  if (!text || isPlaying) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  const preset = VOICE_PRESETS[selectedLanguage as keyof typeof VOICE_PRESETS] || VOICE_PRESETS.swahili;
  
  utterance.rate = preset.rate;
  utterance.pitch = preset.pitch;
  utterance.lang = preset.lang;
  
  utterance.onstart = () => setIsPlaying(true);
  utterance.onend = () => setIsPlaying(false);
  utterance.onerror = () => setIsPlaying(false);
  
  utteranceRef.current = utterance;
  window.speechSynthesis.speak(utterance);
};

// Start recording
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setUserRecording(audioUrl);
      setUserStats(prev => ({ ...prev, totalRecordings: prev.totalRecordings + 1 }));
    };
    
    mediaRecorder.start();
    setIsRecording(true);
  } catch (err) {
    console.error('Error starting recording:', err);
    alert('Could not access microphone. Please check permissions.');
  }
};

// Stop recording
const stopRecording = () => {
  if (mediaRecorderRef.current && isRecording) {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    
    // Stop all tracks
    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
  }
};

// Save to Supabase
const saveWord = async () => {
  if (!selectedLanguage || !currentWord) return;
  
  setSaving(true);
  
  try {
    const supabase = createClient();
    
    // Convert audio blob to base64 if recorded
    const saveWord = async () => {
  if (!selectedLanguage || !currentWord) return;
  
  setSaving(true);
  
  try {
    const supabase = createClient();
    
    // Convert audio blob to base64 if recorded
    let audioBase64: string | null = null;
    if (userRecording) {
      const response = await fetch(userRecording);
      const audioBlob = await response.blob();
      audioBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(audioBlob);
      });
    }
    
    // Generate a pronunciation score (simulated)
    const pronunciationScore = Math.floor(Math.random() * 20) + 80; // 80-100%
    const isPerfect = pronunciationScore >= 95;
    
    // Save word data
    const { data, error } = await supabase
      .from('language_ontology_words')
      .insert({
        session_id: sessionId,
        language: selectedLanguage,
        word_id: currentWord.id,
        english_word: currentWord.english,
        translated_word: currentTranslation || '',
        user_recording: audioBase64,
        category: currentWord.category,
        part_of_speech: currentWord.partOfSpeech,
        pronunciation_score: pronunciationScore,
        is_perfect: isPerfect,
        progress: progress,
        created_at: new Date().toISOString()
      })
      .select();
    
    if (error) throw error;
    
    console.log('✅ Saved word to Supabase:', data);
    
    // Award XP
    const xpEarned = 10 + (isPerfect ? 5 : 0) + (userRecording ? 3 : 0);
    setXp(prev => prev + xpEarned);
    
    // Update stats
    setUserStats(prev => ({
      ...prev,
      totalWordsCompleted: prev.totalWordsCompleted + 1,
      perfectScores: prev.perfectScores + (isPerfect ? 1 : 0)
    }));
    
    // Check achievements
    checkAchievements();
    
    // Trigger completion animation
    triggerWordCompletion();
    
    // Move to next word
    setTimeout(() => goToNextWord(), 1000);
    
  } catch (error) {
    console.error('Error saving word:', error);
    alert('Failed to save word. Please try again.');
  } finally {
    setSaving(false);
  }
};
    
   
    
   
    
  } catch (error) {
    console.error('Error saving word:', error);
    alert('Failed to save word. Please try again.');
  } finally {
    setSaving(false);
  }
};
// Skip word
const skipWord = () => {
  goToNextWord();
};

// Go to next word
const goToNextWord = () => {
  if (currentWordIndex < LANGUAGE_ONTOLOGY_WORDS.length - 1) {
    setCurrentWordIndex(prev => prev + 1);
    setUserRecording('');
    const newProgress = ((currentWordIndex + 1) / LANGUAGE_ONTOLOGY_WORDS.length) * 100;
    setProgress(newProgress);
  } else {
    // Completed all words
    triggerConfetti();
    showNotification(`🎉 Congratulations! You've completed ${LANGUAGES.find(l => l.id === selectedLanguage)?.name} training session!`);
    
    // Award completion achievement
    unlockAchievement('100_words');
    
    setTimeout(() => {
      setSelectedLanguage('');
    }, 2000);
  }
};

// Handle translation input
const handleTranslationChange = (value: string) => {
  setTranslations(prev => ({
    ...prev,
    [currentWord.id]: value
  }));
};

// Achievement system
const checkAchievements = () => {
  const newAchievements = [...achievements];
  let unlockedNew = false;
  
  // First word achievement
  if (userStats.totalWordsCompleted >= 1 && !newAchievements[0].unlocked) {
    newAchievements[0].unlocked = true;
    newAchievements[0].progress = 1;
    unlockedNew = true;
    setShowAchievement(newAchievements[0]);
  }
  
  // 10 words achievement
  if (userStats.totalWordsCompleted >= 10 && !newAchievements[1].unlocked) {
    newAchievements[1].unlocked = true;
    newAchievements[1].progress = 10;
    unlockedNew = true;
    setShowAchievement(newAchievements[1]);
  }
  
  // Record 10 pronunciations
  if (userStats.totalRecordings >= 10 && !newAchievements[4].unlocked) {
    newAchievements[4].unlocked = true;
    newAchievements[4].progress = 10;
    unlockedNew = true;
    setShowAchievement(newAchievements[4]);
  }
  
  // All languages tried
  if (userStats.languagesTried.size >= 4 && !newAchievements[5].unlocked) {
    newAchievements[5].unlocked = true;
    newAchievements[5].progress = 4;
    unlockedNew = true;
    setShowAchievement(newAchievements[5]);
  }
  
  // Perfect pronunciation
  if (userStats.perfectScores >= 5 && !newAchievements[7].unlocked) {
    newAchievements[7].unlocked = true;
    newAchievements[7].progress = 5;
    unlockedNew = true;
    setShowAchievement(newAchievements[7]);
  }
  
  if (unlockedNew) {
    setAchievements(newAchievements);
  }
};

const unlockAchievement = (id: string) => {
  setAchievements(prev => prev.map(ach => 
    ach.id === id ? { ...ach, unlocked: true, progress: ach.total } : ach
  ));
};
// Trigger confetti animation
const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

// Trigger word completion animation
const triggerWordCompletion = () => {
  setWordCompletionAnim(true);
  setTimeout(() => setWordCompletionAnim(false), 1000);
};

// Show notification
const showNotification = (message: string) => {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('animate-slide-out');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

// Render language selection screen
if (!selectedLanguage) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowAchievement(null)}
          >
            <motion.div 
              className="bg-gradient-to-br from-yellow-800 to-orange-600 rounded-2xl p-8 max-w-md mx-4"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{showAchievement.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h3>
                <h4 className="text-xl text-yellow-200 mb-2">{showAchievement.title}</h4>
                <p className="text-gray-200 mb-6">{showAchievement.description}</p>
                <button 
                  onClick={() => setShowAchievement(null)}
                  className="px-6 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30"
                >
                  Awesome!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-6xl mx-auto">
        {/* Header with stats */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              🌍 Language Ontology Trainer
            </h1>
            <p className="text-gray-300">
              Learn, speak, and preserve indigenous languages word by word
            </p>
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="text-center px-4 py-2 bg-gray-800/50 rounded-xl">
              <div className="text-2xl font-bold text-cyan-300">L{level}</div>
              <div className="text-xs text-gray-400">Level</div>
            </div>
            <div className="text-center px-4 py-2 bg-gray-800/50 rounded-xl">
              <div className="text-2xl font-bold text-green-300">{xp} XP</div>
              <div className="text-xs text-gray-400">Experience</div>
            </div>
            <div className="text-center px-4 py-2 bg-gray-800/50 rounded-xl">
              <div className="text-2xl font-bold text-orange-300">{streak}🔥</div>
              <div className="text-xs text-gray-400">Day Streak</div>
            </div>
          </div>
        </div>
        
        {/* Community leaderboard */}
        {showCommunity && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 bg-gray-800/40 rounded-2xl p-6 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              🌐 Community Leaderboard
              <button 
                onClick={() => setShowCommunity(false)}
                className="ml-auto text-sm text-gray-400 hover:text-white"
              >
                Close
              </button>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {COMMUNITY_SCORES.map((lang, index) => (
                <div key={lang.language} className={`p-4 rounded-xl ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-800/30 to-yellow-600/30 border border-yellow-500/30' :
                  index === 1 ? 'bg-gradient-to-r from-gray-700/30 to-gray-600/30 border border-gray-500/30' :
                  index === 2 ? 'bg-gradient-to-r from-amber-800/30 to-amber-700/30 border border-amber-500/30' :
                  'bg-gradient-to-r from-gray-800/30 to-gray-700/30 border border-gray-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{lang.language}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      index === 0 ? 'bg-yellow-500 text-yellow-900' :
                      index === 1 ? 'bg-gray-400 text-gray-900' :
                      index === 2 ? 'bg-amber-600 text-amber-900' :
                      'bg-gray-600 text-gray-900'
                    }`}>
                      #{lang.rank}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{lang.totalWords.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Words collected</div>
                  <div className="text-sm text-cyan-300 mt-2">{lang.activeUsers} active learners</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Achievements preview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              🏆 Your Achievements
              <span className="text-sm text-gray-400">
                ({achievements.filter(a => a.unlocked).length}/{achievements.length})
              </span>
            </h2>
            <button 
              onClick={() => setShowCommunity(!showCommunity)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm"
            >
              {showCommunity ? 'Hide Community' : 'Show Community'}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-3 rounded-xl border ${achievement.unlocked ? 
                  'bg-gradient-to-br from-yellow-900/30 to-yellow-700/30 border-yellow-500/50' :
                  'bg-gray-800/30 border-gray-700/50 opacity-60'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-semibold text-white truncate">{achievement.title}</div>
                <div className="text-xs text-gray-400 mt-1">{achievement.description}</div>
                {!achievement.unlocked && (
                  <div className="h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500"
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Language selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LANGUAGES.map((lang) => (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`
                group relative overflow-hidden rounded-2xl p-6
                bg-gradient-to-br ${lang.color}
                transform transition-all duration-300
                hover:shadow-2xl hover:shadow-${lang.color.split('-')[1]}/20
              `}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{lang.flag}</div>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                    {lang.difficulty}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">{lang.name}</h2>
                <p className="text-white/80 text-sm mb-4">{lang.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{lang.learners.toLocaleString()}</div>
                    <div className="text-white/60 text-xs">learners</div>
                  </div>
                  
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/30 transition-colors">
                    <span className="text-white font-medium flex items-center gap-2">
                      Start Training
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              </div>
            </motion.button>
          ))}
        </div>
        
        {/* User stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{userStats.totalWordsCompleted}</div>
            <div className="text-gray-400 text-sm">Words Completed</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{userStats.totalRecordings}</div>
            <div className="text-gray-400 text-sm">Recordings Made</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{userStats.perfectScores}</div>
            <div className="text-gray-400 text-sm">Perfect Scores</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{userStats.languagesTried.size}</div>
            <div className="text-gray-400 text-sm">Languages Tried</div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-400">
          <p className="mb-2">Each word you save helps preserve indigenous languages for future generations</p>
          <p className="text-sm">Powered by Supabase • Speech Synthesis API • Community Contributions</p>
        </div>
      </div>
    </div>
  );
}
// Get current language info
const currentLang = LANGUAGES.find(l => l.id === selectedLanguage);

// Render training interface
return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
    {/* Achievement popup */}
    <AnimatePresence>
      {showAchievement && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowAchievement(null)}
        >
          <motion.div 
            className="bg-gradient-to-br from-yellow-800 to-orange-600 rounded-2xl p-8 max-w-md mx-4"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{showAchievement.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h3>
              <h4 className="text-xl text-yellow-200 mb-2">{showAchievement.title}</h4>
              <p className="text-gray-200 mb-6">{showAchievement.description}</p>
              <button 
                onClick={() => setShowAchievement(null)}
                className="px-6 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30"
              >
                Awesome!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    
    {/* Word completion animation */}
    <AnimatePresence>
      {wordCompletionAnim && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 2 }}
          className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
        >
          <motion.div 
            className="text-6xl font-bold"
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -50, 0],
              scale: [1, 1.5, 1],
              rotate: [0, 360, 0]
            }}
            transition={{ duration: 1 }}
          >
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              ✓
            </span>
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
    
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
        <div>
          <button
            onClick={() => setSelectedLanguage('')}
            className="text-gray-400 hover:text-white mb-4 md:mb-0 flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to languages
          </button>
          <h1 className="text-3xl font-bold text-white">
            Learning <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">{currentLang?.name}</span>
          </h1>
          <p className="text-gray-400">Session ID: {sessionId.slice(0, 8)}...</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <div className="text-white font-semibold text-lg">
              L{level} • {xp} XP
            </div>
            <div className="text-gray-400 text-sm">
              {streak} day streak 🔥
            </div>
          </div>
          
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-gray-700 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-2xl">{currentLang?.flag}</div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
              {Math.round(progress)}%
            </div>
          </motion.div>
        </div>
      </div>
{/* Progress bar with animation */}
<motion.div className="mb-8" layout>
  <div className="flex justify-between text-sm text-gray-400 mb-2">
    <span>Progress • Word {currentWordIndex + 1} of {LANGUAGE_ONTOLOGY_WORDS.length}</span>
    <span>{Math.round(progress)}%</span>
  </div>
  <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
    <motion.div 
      className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-1000"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
  </div>
</motion.div>

{/* Main training card */}
<motion.div 
  className="bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 md:p-8 mb-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  key={currentWordIndex}
>
  {/* Word display with category */}
  <div className="text-center mb-10">
    <div className="inline-block px-6 py-2 bg-gray-900/80 rounded-full mb-4">
      <span className="text-cyan-400 text-sm uppercase tracking-wider">
        {currentWord?.category?.replace('_', ' ')}
      </span>
    </div>
    
    <motion.div 
      className="inline-block px-8 py-6 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl mb-4 border border-gray-700/50"
      whileHover={{ scale: 1.02 }}
    >
      <span className="text-gray-400 text-sm uppercase tracking-wider">
        English Word
      </span>
      <motion.div 
        className="text-4xl md:text-5xl font-bold text-white mt-3 mb-2"
        key={currentWord?.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {currentWord?.english}
      </motion.div>
      <div className="text-gray-500 text-sm">
        {currentWord?.partOfSpeech}
      </div>
    </motion.div>
  </div>

  {/* Translation input with suggestions */}
  <div className="mb-8">
    <label className="block text-gray-300 mb-3 text-lg flex items-center gap-2">
      <span className="bg-gradient-to-r from-cyan-500 to-blue-500 w-2 h-5 rounded-full"></span>
      {currentLang?.name} Translation
    </label>
    <motion.div whileHover={{ scale: 1.01 }}>
      <input
        type="text"
        value={currentTranslation}
        onChange={(e) => handleTranslationChange(e.target.value)}
        placeholder={`Type the ${currentLang?.name} word here...`}
        className="w-full bg-gray-900/80 border-2 border-gray-700 rounded-2xl px-6 py-5 text-white text-xl placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
      />
    </motion.div>
    
    {/* Translation suggestions */}
    {!currentTranslation && (
      <div className="mt-4 p-4 bg-gray-900/50 rounded-xl">
        <div className="text-gray-400 text-sm mb-2">Need help? Try these:</div>
        <div className="flex flex-wrap gap-2">
          {['mũndũ', 'mtu', 'msee', 'person'].slice(0, 3).map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleTranslationChange(suggestion)}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 text-sm transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
          {/* Interactive audio section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Listen section */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-cyan-400 text-xl">🔊</span> 
                <span>Listen to Pronunciation</span>
                {isPlaying && (
                  <span className="ml-auto text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">
                    Playing...
                  </span>
                )}
              </h3>
              
              <motion.button
                onClick={() => speakWord(currentTranslation || currentWord.english)}
                disabled={isPlaying || !currentTranslation}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-4 rounded-xl font-semibold text-lg
                  ${currentTranslation ? 
                    'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/20' :
                    'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                `}
              >
                {isPlaying ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-white rounded-full"
                          animate={{ height: ['10px', '20px', '10px'] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                    Speaking...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    🔊 Play Sound
                    <span className="text-sm opacity-75">({VOICE_PRESETS[selectedLanguage]?.lang})</span>
                  </span>
                )}
              </motion.button>
              
              <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                Hear how the word should sound in {currentLang?.name}
              </div>
            </motion.div>

            {/* Record section */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-pink-400 text-xl">🎤</span> 
                <span>Record Your Voice</span>
                {userRecording && (
                  <span className="ml-auto text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">
                    ✓ Recorded
                  </span>
                )}
              </h3>
              
              <motion.button
                onClick={isRecording ? stopRecording : startRecording}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-4 rounded-xl font-semibold text-lg mb-4
                  ${isRecording ? 
                    'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg shadow-red-500/20 animate-pulse' :
                    'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20'
                  }
                  transition-all duration-200
                `}
              >
                <span className="flex items-center justify-center gap-3">
                  🎤 {isRecording ? 'Stop Recording' : 'Start Recording'}
                  {isRecording && (
                    <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
                  )}
                </span>
              </motion.button>
              
              {userRecording && (
                <motion.div 
                  className="mt-4 p-4 bg-gray-800/50 rounded-xl"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <audio
                    src={userRecording}
                    controls
                    className="w-full"
                  />
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-green-400 text-sm">
                      Great! Your pronunciation has been saved
                    </p>
                  </div>
                </motion.div>
              )}
              
              <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                Practice saying the word in {currentLang?.name}
              </div>
            </motion.div>
          </div>

          {/* Action buttons with XP display */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={skipWord}
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-4 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl font-semibold transition-colors border border-gray-600/50"
            >
              Skip Word →
            </motion.button>
            
            <motion.button
              onClick={saveWord}
              disabled={saving || (!currentTranslation && !userRecording)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex-1 py-4 rounded-xl font-semibold relative overflow-hidden
                ${saving || (!currentTranslation && !userRecording) ?
                  'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/50' :
                  'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20'
                }
                transition-all duration-200
              `}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  Saving to Database...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  💾 Save & Next Word
                  <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                    +10 XP
                  </span>
                </span>
              )}
              
              {/* Shimmer effect */}
              {!saving && currentTranslation && (
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              )}
            </motion.button>
          </div>
          
          {/* Community stats for this word */}
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <div className="text-center text-gray-400 text-sm">
              <span className="text-cyan-300">{COMMUNITY_SCORES.find(c => c.language.toLowerCase() === selectedLanguage)?.totalWords.toLocaleString() || '0'}</span> 
              {' '}words collected by the community for {currentLang?.name}
            </div>
          </div>
        </motion.div>

        {/* Stats and achievements preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-cyan-300 mb-2 text-center">
              {Object.keys(translations).length}
            </div>
            <div className="text-gray-400 text-center">Words Translated</div>
            <div className="h-1 bg-gray-700 rounded-full mt-3 overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${(Object.keys(translations).length / 1000) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-purple-300 mb-2 text-center">
              {currentWordIndex}
            </div>
            <div className="text-gray-400 text-center">Words Completed</div>
            <div className="h-1 bg-gray-700 rounded-full mt-3 overflow-hidden">
              <motion.div 
                className="h-full bg-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${(currentWordIndex / LANGUAGE_ONTOLOGY_WORDS.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-green-300 mb-2 text-center">
              {Math.round((LANGUAGE_ONTOLOGY_WORDS.length - currentWordIndex) / 10)} min
            </div>
            <div className="text-gray-400 text-center">Estimated Time Remaining</div>
            <div className="h-1 bg-gray-700 rounded-full mt-3">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
            </div>
          </div>
        </div>

        {/* Tips and encouragement */}
        <motion.div 
          className="text-center p-6 bg-gradient-to-r from-gray-800/20 to-gray-900/20 rounded-2xl backdrop-blur-sm border border-gray-700/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-300 text-lg">
            💪 <strong>Keep going!</strong> Each word you save helps preserve {currentLang?.name} for future generations
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Your recordings are stored securely and contribute to training language AI models
          </p>
          
          {/* Social sharing */}
          <div className="mt-4 flex justify-center gap-4">
            <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors">
              📱 Share Progress
            </button>
            <button 
              onClick={() => setShowCommunity(true)}
              className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg transition-colors"
            >
              👥 View Community
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Hidden canvas for confetti */}
      <canvas ref={confettiRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-30" />
    </div>
  );
}