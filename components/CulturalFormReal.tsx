"use client"

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { useWalletAuth } from '@/lib/hooks/useWalletAuth'

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

// Language options
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
// Complete 1000 words database (truncated for example)
const LANGUAGE_ONTOLOGY_WORDS: WordType[] = [
  // Lexical Ontology - People & Family (1-50)
  { id: 1, english: "person", category: "people_family", partOfSpeech: "noun" },
  { id: 2, english: "man", category: "people_family", partOfSpeech: "noun" },
  { id: 3, english: "woman", category: "people_family", partOfSpeech: "noun" },
  { id: 4, english: "child", category: "people_family", partOfSpeech: "noun" },
  { id: 5, english: "baby", category: "people_family", partOfSpeech: "noun" },
  // Continue with all 1000 words...
  { id: 999, english: "problem/trouble (slang)", category: "modern_tech", partOfSpeech: "noun" },
  { id: 1000, english: "cool/awesome", category: "modern_tech", partOfSpeech: "adjective" },
];

// Sample translations
const SAMPLE_TRANSLATIONS = {
  meru: {
    1: "mũndũ", 2: "mũthuri", 3: "mũtumia", 4: "kaana", 5: "gakaa",
    999: "smartifooni", 1000: "nĩwega mũno"
  },
  kikuyu: {
    1: "mũndũ", 2: "mũthuri", 3: "mũtumia", 4: "kana", 5: "gakaa",
    999: "thimũ ikũrũ", 1000: "nĩ mwega"
  },
  swahili: {
    1: "mtu", 2: "mwanaume", 3: "mwanamke", 4: "mtoto", 5: "mtoto mchanga",
    999: "simu mkononi", 1000: "poa"
  },
  sheng: {
    1: "msee", 2: "dude", 3: "chick", 4: "mtoto", 5: "kiddo",
    999: "smart", 1000: "safi"
  }
};

export default function LanguageOntologyTrainer() {
  // Wallet authentication
  const { 
    walletAddress, 
    userId, 
    loading: walletLoading, 
    connectWallet, 
    isConnected 
  } = useWalletAuth()

  // State management
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | ''>('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [translations, setTranslations] = useState<Record<number, string>>({});
  const [userRecording, setUserRecording] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [showAchievement, setShowAchievement] = useState<AchievementType | null>(null);
  const [showCommunity, setShowCommunity] = useState(false);
  const [wordCompletionAnim, setWordCompletionAnim] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [userStats, setUserStats] = useState({
    totalWordsCompleted: 0,
    totalRecordings: 0,
    perfectScores: 0,
    languagesTried: new Set<string>(),
  });
  
  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
// Initialize session
useEffect(() => {
  if (selectedLanguage) {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    setCurrentWordIndex(0);
    setTranslations({});
    setUserRecording('');
    setProgress(0);
    
    // Load sample translations
    const langTranslations = SAMPLE_TRANSLATIONS[selectedLanguage as keyof typeof SAMPLE_TRANSLATIONS] || {};
    setTranslations(langTranslations);
    
    // Update languages tried
    setUserStats(prev => ({
      ...prev,
      languagesTried: new Set([...prev.languagesTried, selectedLanguage])
    }));
  }
}, [selectedLanguage]);

// Load user progress
useEffect(() => {
  if (userId) {
    loadUserProgress();
  }
}, [userId]);

const loadUserProgress = async () => {
  try {
    const supabase = createClient();
    
    // Load user stats
    const { data: userData } = await supabase
      .from('users')
      .select('total_xp, current_level, current_streak, total_words_completed, total_recordings_made, total_perfect_scores, languages_tried')
      .eq('id', userId)
      .single();

    if (userData) {
      setXp(userData.total_xp || 0);
      setLevel(userData.current_level || 1);
      setStreak(userData.current_streak || 0);
      setUserStats({
        totalWordsCompleted: userData.total_words_completed || 0,
        totalRecordings: userData.total_recordings_made || 0,
        perfectScores: userData.total_perfect_scores || 0,
        languagesTried: new Set(userData.languages_tried || [])
      });
    }
  } catch (error) {
    console.error('Error loading user progress:', error);
  }
};

// Get current word
const currentWord = LANGUAGE_ONTOLOGY_WORDS[currentWordIndex];
const currentTranslation = translations[currentWord?.id] || '';
// Start recording
const startRecording = async () => {
  if (!isConnected) {
    setShowWalletModal(true);
    return;
  }

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
    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
  }
};

// Handle translation input
const handleTranslationChange = (value: string) => {
  setTranslations(prev => ({
    ...prev,
    [currentWord.id]: value
  }));
};
// Save word to Supabase
const saveWord = async () => {
  // Check wallet connection
  if (!isConnected) {
    setShowWalletModal(true);
    return;
  }

  if (!selectedLanguage || !currentWord || !userId) {
    console.error('Missing required data:', { selectedLanguage, currentWord, userId });
    alert('Please make sure you are connected and have selected a language');
    return;
  }
  
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
      .from('user_word_progress')
      .insert({
        user_id: userId,
        word_id: currentWord.id,
        language: selectedLanguage,
        user_translation: currentTranslation || '',
        audio_recording: audioBase64,
        pronunciation_score: pronunciationScore,
        is_perfect: isPerfect,
        session_id: sessionId,
        completed_at: new Date().toISOString()
      })
      .select();
    
    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }
    
    console.log('✅ Saved word to Supabase:', data);
    
    // Award XP
    const xpEarned = 10 + (isPerfect ? 5 : 0) + (userRecording ? 3 : 0);
    setXp(prev => prev + xpEarned);
    
    // Update user stats in Supabase
    await updateUserStats(xpEarned, isPerfect);
    
    // Check and award achievements
    checkAchievements();
    
    // Trigger completion animation
    triggerWordCompletion();
    
    // Move to next word
    setTimeout(() => goToNextWord(), 1000);
    
  } catch (error: any) {
    console.error('Error saving word:', error);
    alert(`Failed to save word: ${error.message || 'Unknown error'}`);
  } finally {
    setSaving(false);
  }
};

// Update user stats in Supabase
const updateUserStats = async (xpEarned: number, isPerfect: boolean) => {
  if (!userId) return;

  try {
    const supabase = createClient();
    
    // Get current user stats
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('total_xp, total_words_completed, total_perfect_scores, languages_tried')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    // Update stats
    const updates: any = {
      total_xp: (userData?.total_xp || 0) + xpEarned,
      total_words_completed: (userData?.total_words_completed || 0) + 1,
      total_recordings_made: (userData?.total_recordings_made || 0) + (userRecording ? 1 : 0),
      total_perfect_scores: (userData?.total_perfect_scores || 0) + (isPerfect ? 1 : 0),
      last_active_date: new Date().toISOString().split('T')[0]
    };

    // Update languages tried
    if (selectedLanguage && userData?.languages_tried) {
      const languagesTried = new Set(userData.languages_tried || []);
      languagesTried.add(selectedLanguage);
      updates.languages_tried = Array.from(languagesTried);
    }

    // Update user record
    const { error: updateError } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId);

    if (updateError) throw updateError;

    // Update local state
    setUserStats(prev => ({
      ...prev,
      totalWordsCompleted: prev.totalWordsCompleted + 1,
      totalRecordings: prev.totalRecordings + (userRecording ? 1 : 0),
      perfectScores: prev.perfectScores + (isPerfect ? 1 : 0)
    }));

  } catch (error) {
    console.error('Error updating user stats:', error);
  }
};
// Go to next word
const goToNextWord = () => {
  if (currentWordIndex < LANGUAGE_ONTOLOGY_WORDS.length - 1) {
    setCurrentWordIndex(prev => prev + 1);
    setUserRecording('');
    const newProgress = ((currentWordIndex + 1) / LANGUAGE_ONTOLOGY_WORDS.length) * 100;
    setProgress(newProgress);
  } else {
    triggerConfetti();
    showNotification(`🎉 Congratulations! You've completed ${LANGUAGES.find(l => l.id === selectedLanguage)?.name} training session!`);
    setTimeout(() => {
      setSelectedLanguage('');
    }, 2000);
  }
};

// Skip word
const skipWord = () => {
  goToNextWord();
};

// Achievement system
const checkAchievements = () => {
  // Basic achievement checking
  const newAchievements = [...achievements];
  let unlockedNew = false;
  
  // First word achievement
  if (userStats.totalWordsCompleted >= 1 && !newAchievements.find(a => a.id === 'first_word')?.unlocked) {
    const achievement: AchievementType = {
      id: 'first_word',
      title: 'First Steps',
      description: 'Complete your first word',
      icon: '👣',
      unlocked: true,
      progress: 1,
      total: 1
    };
    newAchievements.push(achievement);
    unlockedNew = true;
    setShowAchievement(achievement);
  }
  
  // 10 words achievement
  if (userStats.totalWordsCompleted >= 10 && !newAchievements.find(a => a.id === '10_words')?.unlocked) {
    const achievement: AchievementType = {
      id: '10_words',
      title: 'Getting Started',
      description: 'Complete 10 words',
      icon: '🎯',
      unlocked: true,
      progress: 10,
      total: 10
    };
    newAchievements.push(achievement);
    unlockedNew = true;
    setShowAchievement(achievement);
  }
  
  if (unlockedNew) {
    setAchievements(newAchievements);
  }
};

// Animation functions
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

const triggerWordCompletion = () => {
  setWordCompletionAnim(true);
  setTimeout(() => setWordCompletionAnim(false), 1000);
};

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
