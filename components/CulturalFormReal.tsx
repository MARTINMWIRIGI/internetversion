"use client"

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

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

type ProgressDataType = {
  wordId: number
  english: string
  language: string
  translation: string
  pronunciationScore: number
  isPerfect: boolean
  timestamp: string
  sessionId: string
  audioRecording?: string
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

// Complete words database (100 words)
const LANGUAGE_ONTOLOGY_WORDS: WordType[] = [
  // Lexical Ontology - People & Family (1-25)
  { id: 1, english: "person", category: "people_family", partOfSpeech: "noun" },
  { id: 2, english: "man", category: "people_family", partOfSpeech: "noun" },
  { id: 3, english: "woman", category: "people_family", partOfSpeech: "noun" },
  { id: 4, english: "child", category: "people_family", partOfSpeech: "noun" },
  { id: 5, english: "baby", category: "people_family", partOfSpeech: "noun" },
  { id: 6, english: "father", category: "people_family", partOfSpeech: "noun" },
  { id: 7, english: "mother", category: "people_family", partOfSpeech: "noun" },
  { id: 8, english: "son", category: "people_family", partOfSpeech: "noun" },
  { id: 9, english: "daughter", category: "people_family", partOfSpeech: "noun" },
  { id: 10, english: "brother", category: "people_family", partOfSpeech: "noun" },
  { id: 11, english: "sister", category: "people_family", partOfSpeech: "noun" },
  { id: 12, english: "grandfather", category: "people_family", partOfSpeech: "noun" },
  { id: 13, english: "grandmother", category: "people_family", partOfSpeech: "noun" },
  { id: 14, english: "family", category: "people_family", partOfSpeech: "noun" },
  { id: 15, english: "friend", category: "people_family", partOfSpeech: "noun" },
  { id: 16, english: "neighbor", category: "people_family", partOfSpeech: "noun" },
  { id: 17, english: "guest", category: "people_family", partOfSpeech: "noun" },
  { id: 18, english: "stranger", category: "people_family", partOfSpeech: "noun" },
  { id: 19, english: "leader", category: "people_family", partOfSpeech: "noun" },
  { id: 20, english: "elder", category: "people_family", partOfSpeech: "noun" },
  { id: 21, english: "teacher", category: "people_family", partOfSpeech: "noun" },
  { id: 22, english: "student", category: "people_family", partOfSpeech: "noun" },
  { id: 23, english: "farmer", category: "people_family", partOfSpeech: "noun" },
  { id: 24, english: "hunter", category: "people_family", partOfSpeech: "noun" },
  { id: 25, english: "warrior", category: "people_family", partOfSpeech: "noun" },
  // Nature & Environment (26-50)
  { id: 26, english: "sun", category: "nature_environment", partOfSpeech: "noun" },
  { id: 27, english: "moon", category: "nature_environment", partOfSpeech: "noun" },
  { id: 28, english: "star", category: "nature_environment", partOfSpeech: "noun" },
  { id: 29, english: "sky", category: "nature_environment", partOfSpeech: "noun" },
  { id: 30, english: "cloud", category: "nature_environment", partOfSpeech: "noun" },
  { id: 31, english: "rain", category: "nature_environment", partOfSpeech: "noun" },
  { id: 32, english: "water", category: "nature_environment", partOfSpeech: "noun" },
  { id: 33, english: "river", category: "nature_environment", partOfSpeech: "noun" },
  { id: 34, english: "lake", category: "nature_environment", partOfSpeech: "noun" },
  { id: 35, english: "mountain", category: "nature_environment", partOfSpeech: "noun" },
  { id: 36, english: "forest", category: "nature_environment", partOfSpeech: "noun" },
  { id: 37, english: "tree", category: "nature_environment", partOfSpeech: "noun" },
  { id: 38, english: "flower", category: "nature_environment", partOfSpeech: "noun" },
  { id: 39, english: "grass", category: "nature_environment", partOfSpeech: "noun" },
  { id: 40, english: "earth", category: "nature_environment", partOfSpeech: "noun" },
  { id: 41, english: "stone", category: "nature_environment", partOfSpeech: "noun" },
  { id: 42, english: "fire", category: "nature_environment", partOfSpeech: "noun" },
  { id: 43, english: "wind", category: "nature_environment", partOfSpeech: "noun" },
  { id: 44, english: "animal", category: "nature_environment", partOfSpeech: "noun" },
  { id: 45, english: "bird", category: "nature_environment", partOfSpeech: "noun" },
  { id: 46, english: "fish", category: "nature_environment", partOfSpeech: "noun" },
  { id: 47, english: "lion", category: "nature_environment", partOfSpeech: "noun" },
  { id: 48, english: "elephant", category: "nature_environment", partOfSpeech: "noun" },
  { id: 49, english: "cow", category: "nature_environment", partOfSpeech: "noun" },
  { id: 50, english: "goat", category: "nature_environment", partOfSpeech: "noun" },
  // Food & Agriculture (51-75)
  { id: 51, english: "food", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 52, english: "bread", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 53, english: "meat", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 54, english: "milk", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 55, english: "egg", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 56, english: "vegetable", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 57, english: "fruit", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 58, english: "maize", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 59, english: "rice", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 60, english: "bean", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 61, english: "potato", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 62, english: "banana", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 63, english: "coffee", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 64, english: "tea", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 65, english: "salt", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 66, english: "sugar", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 67, english: "honey", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 68, english: "farm", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 69, english: "seed", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 70, english: "harvest", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 71, english: "field", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 72, english: "garden", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 73, english: "market", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 74, english: "shop", category: "food_agriculture", partOfSpeech: "noun" },
  { id: 75, english: "meal", category: "food_agriculture", partOfSpeech: "noun" },
  // Actions & Verbs (76-100)
  { id: 76, english: "to be", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 77, english: "to have", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 78, english: "to go", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 79, english: "to come", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 80, english: "to see", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 81, english: "to hear", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 82, english: "to speak", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 83, english: "to eat", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 84, english: "to drink", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 85, english: "to sleep", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 86, english: "to walk", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 87, english: "to run", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 88, english: "to work", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 89, english: "to play", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 90, english: "to learn", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 91, english: "to teach", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 92, english: "to love", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 93, english: "to help", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 94, english: "to give", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 95, english: "to take", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 96, english: "to make", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 97, english: "to build", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 98, english: "to grow", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 99, english: "to know", category: "actions_verbs", partOfSpeech: "verb" },
  { id: 100, english: "to understand", category: "actions_verbs", partOfSpeech: "verb" },
];

// Sample translations for all 100 words
const SAMPLE_TRANSLATIONS = {
  meru: {
    1: "mũndũ", 2: "mũthuri", 3: "mũtumia", 4: "kaana", 5: "gakaa",
    6: "baba", 7: "mama", 8: "mwana wa mũthuri", 9: "mwana wa mũtumia", 10: "mũrũwa",
    11: "mũrũwa", 12: "gũkũrũ", 13: "gũkũrũ", 14: "mbarĩ", 15: "mũrata",
    16: "mũthoni", 17: "mũeni", 18: "mũndũ wa gũtari", 19: "mũtongoria", 20: "mũkũrũ",
    21: "mũrutani", 22: "mũrutwo", 23: "mũrimi", 24: "mũtoi", 25: "mũgoji",
    26: "rũũa", 27: "mweri", 28: "nyenjera", 29: "rũũũ", 30: "itu",
    31: "mbura", 32: "maĩ", 33: "rũũĩ", 34: "harĩa", 35: "kĩrĩma",
    36: "gĩthaka", 37: "mũtĩ", 38: "ĩũa", 39: "nyeki", 40: "nthĩ",
    41: "igũrũ", 42: "mwaki", 43: "rũhuho", 44: "nyamũ", 45: "nyoni",
    46: "thambĩ", 47: "njerũ", 48: "njogu", 49: "ng'ombe", 50: "mbũri",
    51: "irio", 52: "mũgate", 53: "nyama", 54: "ĩrakũ", 55: "itumbi",
    56: "mboga", 57: "itunda", 58: "mbembe", 59: "mũceere", 60: "mboco",
    61: "warũ", 62: "irigũ", 63: "kahawa", 64: "chai", 65: "cũngwa",
    66: "sukari", 67: "ũkĩ", 68: "mũgũnda", 69: "mbegu", 70: "kũhoya",
    71: "shamba", 72: "mũgũnda", 73: "soko", 74: "nduka", 75: "kĩrio",
    76: "kũrĩ", 77: "kũrĩ na", 78: "gũthiĩ", 79: "gũkũ", 80: "gũona",
    81: "gũigua", 82: "gũtema", 83: "gũrĩa", 84: "gũnyua", 85: "gũkonja",
    86: "gũtambara", 87: "gũthii", 88: "gũtuma", 89: "gũthaka", 90: "gũthoma",
    91: "gũrutania", 92: "gũkena", 93: "gũtethia", 94: "gũtura", 95: "gũtwaro",
    96: "gũtuma", 97: "gũtungira", 98: "gũkura", 99: "gũmenya", 100: "gũtũma"
  },
  kikuyu: {
    1: "mũndũ", 2: "mũthuri", 3: "mũtumia", 4: "kana", 5: "gakaa",
    6: "baba", 7: "mama", 8: "mwana wa mũthuri", 9: "mwana wa mũtumia", 10: "mũrũwa",
    11: "mũrũwa", 12: "gũkũrũ", 13: "gũkũrũ", 14: "mbarĩ", 15: "mũrata",
    16: "mũthoni", 17: "mũeni", 18: "mũndũ wa gũtari", 19: "mũtongoria", 20: "mũkũrũ",
    21: "mũrutani", 22: "mũrutwo", 23: "mũrimi", 24: "mũtoi", 25: "mũgoji",
    26: "rũũa", 27: "mweri", 28: "nyenjera", 29: "rũũũ", 30: "itu",
    31: "mbura", 32: "maĩ", 33: "rũũĩ", 34: "harĩa", 35: "kĩrĩma",
    36: "gĩthaka", 37: "mũtĩ", 38: "ĩũa", 39: "nyeki", 40: "nthĩ",
    41: "igũrũ", 42: "mwaki", 43: "rũhuho", 44: "nyamũ", 45: "nyoni",
    46: "thambĩ", 47: "njerũ", 48: "njogu", 49: "ng'ombe", 50: "mbũri",
    51: "irio", 52: "mũgate", 53: "nyama", 54: "ĩrakũ", 55: "itumbi",
    56: "mboga", 57: "itunda", 58: "mbembe", 59: "mũceere", 60: "mboco",
    61: "warũ", 62: "irigũ", 63: "kahawa", 64: "chai", 65: "cũngwa",
    66: "sukari", 67: "ũkĩ", 68: "mũgũnda", 69: "mbegu", 70: "kũhoya",
    71: "shamba", 72: "mũgũnda", 73: "soko", 74: "nduka", 75: "kĩrio",
    76: "kũrĩ", 77: "kũrĩ na", 78: "gũthiĩ", 79: "gũkũ", 80: "gũona",
    81: "gũigua", 82: "gũtema", 83: "gũrĩa", 84: "gũnyua", 85: "gũkonja",
    86: "gũtambara", 87: "gũthii", 88: "gũtuma", 89: "gũthaka", 90: "gũthoma",
    91: "gũrutania", 92: "gũkena", 93: "gũtethia", 94: "gũtura", 95: "gũtwaro",
    96: "gũtuma", 97: "gũtungira", 98: "gũkura", 99: "gũmenya", 100: "gũtũma"
  },
  swahili: {
    1: "mtu", 2: "mwanaume", 3: "mwanamke", 4: "mtoto", 5: "mtoto mchanga",
    6: "baba", 7: "mama", 8: "mwana wa kiume", 9: "mwana wa kike", 10: "kaka",
    11: "dada", 12: "babu", 13: "bibi", 14: "familia", 15: "rafiki",
    16: "jirani", 17: "mgeni", 18: "mgeni", 19: "kiongozi", 20: "mzee",
    21: "mwalimu", 22: "mwanafunzi", 23: "mkulima", 24: "mwinda", 25: "shujaa",
    26: "jua", 27: "mwezi", 28: "nyota", 29: "mbingu", 30: "wingu",
    31: "mvua", 32: "maji", 33: "mto", 34: "ziwa", 35: "mlima",
    36: "msitu", 37: "mti", 38: "ua", 39: "nyasi", 40: "ardhi",
    41: "jiwe", 42: "moto", 43: "upepo", 44: "mnyama", 45: "ndege",
    46: "samaki", 47: "simba", 48: "tembo", 49: "ng'ombe", 50: "mbuzi",
    51: "chakula", 52: "mkate", 53: "nyama", 54: "maziwa", 55: "yai",
    56: "mboga", 57: "tunda", 58: "mahindi", 59: "mchele", 60: "maharagwe",
    61: "viazi", 62: "ndizi", 63: "kahawa", 64: "chai", 65: "chumvi",
    66: "sukari", 67: "asali", 68: "shamba", 69: "mbegu", 70: "mavuno",
    71: "shamba", 72: "bustani", 73: "soko", 74: "duka", 75: "chakula",
    76: "kuwa", 77: "kuwa na", 78: "kwenda", 79: "kuja", 80: "kuona",
    81: "kusikia", 82: "kusema", 83: "kula", 84: "kunywa", 85: "kulala",
    86: "kutembea", 87: "kukimbia", 88: "kufanya kazi", 89: "kucheza", 90: "kujifunza",
    91: "kufundisha", 92: "kupenda", 93: "kusaidia", 94: "kupa", 95: "kuchukua",
    96: "kufanya", 97: "kujenga", 98: "kukua", 99: "kujua", 100: "kuelewa"
  },
  sheng: {
    1: "msee", 2: "dude", 3: "chick", 4: "mtoto", 5: "kiddo",
    6: "baba", 7: "mama", 8: "boy child", 9: "girl child", 10: "bro",
    11: "sis", 12: "grandpa", 13: "grandma", 14: "fam", 15: "homie",
    16: "neighbor", 17: "visitor", 18: "stranger", 19: "boss", 20: "mzee",
    21: "teacher", 22: "student", 23: "farmer", 24: "hunter", 25: "warrior",
    26: "sun", 27: "moon", 28: "star", 29: "sky", 30: "cloud",
    31: "rain", 32: "water", 33: "river", 34: "lake", 35: "mountain",
    36: "forest", 37: "tree", 38: "flower", 39: "grass", 40: "earth",
    41: "stone", 42: "fire", 43: "wind", 44: "animal", 45: "bird",
    46: "fish", 47: "lion", 48: "elephant", 49: "cow", 50: "goat",
    51: "food", 52: "bread", 53: "meat", 54: "milk", 55: "egg",
    56: "veggies", 57: "fruit", 58: "maize", 59: "rice", 60: "beans",
    61: "potato", 62: "banana", 63: "coffee", 64: "tea", 65: "salt",
    66: "sugar", 67: "honey", 68: "farm", 69: "seed", 70: "harvest",
    71: "field", 72: "garden", 73: "market", 74: "shop", 75: "meal",
    76: "be", 77: "have", 78: "go", 79: "come", 80: "see",
    81: "hear", 82: "speak", 83: "eat", 84: "drink", 85: "sleep",
    86: "walk", 87: "run", 88: "work", 89: "play", 90: "learn",
    91: "teach", 92: "love", 93: "help", 94: "give", 95: "take",
    96: "make", 97: "build", 98: "grow", 99: "know", 100: "understand"
  }
};
export default function LanguageOntologyTrainer() {
  // Local user ID for tracking progress
  const [localUserId, setLocalUserId] = useState<string>('');

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
  const [userStats, setUserStats] = useState({
    totalWordsCompleted: 0,
    totalRecordings: 0,
    perfectScores: 0,
    languagesTried: new Set<string>(),
  });

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Initialize user ID and load progress
  useEffect(() => {
    // Generate or load user ID
    const storedId = localStorage.getItem('language_trainer_user_id');
    if (storedId) {
      setLocalUserId(storedId);
    } else {
      const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setLocalUserId(newId);
      localStorage.setItem('language_trainer_user_id', newId);
    }
    
    loadUserProgress();
  }, []);

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
        languagesTried: new Set<string>([...prev.languagesTried, selectedLanguage as string])
      }));
    }
  }, [selectedLanguage]);

  const loadUserProgress = async () => {
    try {
      // Load from localStorage
      const savedProgress = JSON.parse(localStorage.getItem('language_progress') || '[]');
      const savedXp = localStorage.getItem('language_trainer_xp');
      const savedAchievements = JSON.parse(localStorage.getItem('language_achievements') || '[]');
      const savedLevel = localStorage.getItem('language_trainer_level');
      const savedStreak = localStorage.getItem('language_trainer_streak');

      // Calculate stats from local storage
      const totalWordsCompleted = savedProgress.length;
      const totalRecordings = savedProgress.filter((p: any) => p.audioRecording).length;
      const perfectScores = savedProgress.filter((p: any) => p.pronunciationScore >= 95).length;
      
      // FIXED: Add explicit type casting
      const languagesTried = new Set<string>(savedProgress.map((p: any) => p.language as string));

      setUserStats({
        totalWordsCompleted,
        totalRecordings,
        perfectScores,
        languagesTried
      });

      // Set XP, level, and streak
      if (savedXp) setXp(parseInt(savedXp));
      if (savedLevel) setLevel(parseInt(savedLevel));
      if (savedStreak) setStreak(parseInt(savedStreak));
      if (savedAchievements.length > 0) setAchievements(savedAchievements);

    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  // Get current word
  const currentWord = LANGUAGE_ONTOLOGY_WORDS[currentWordIndex];
  const currentTranslation = translations[currentWord?.id] || '';

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

  // Convert audio blob to base64
  const audioBlobToBase64 = async (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
// Save word to both localStorage and Supabase
const saveWord = async () => {
  if (!selectedLanguage || !currentWord) {
    console.error('Missing required data:', { selectedLanguage, currentWord });
    alert('Please select a language and word');
    return;
  }

  setSaving(true);

  try {
    // Generate a pronunciation score
    const pronunciationScore = Math.floor(Math.random() * 20) + 80; // 80-100%
    const isPerfect = pronunciationScore >= 95;

    // Convert audio to base64 if recorded
    let audioBase64: string | null = null;
    if (userRecording) {
      try {
        const response = await fetch(userRecording);
        const audioBlob = await response.blob();
        audioBase64 = await audioBlobToBase64(audioBlob);
      } catch (audioError) {
        console.error('Error converting audio to base64:', audioError);
      }
    }

    // Prepare data for localStorage
    const progressData: ProgressDataType = {
      wordId: currentWord.id,
      english: currentWord.english,
      language: selectedLanguage as string,
      translation: currentTranslation || '',
      pronunciationScore: pronunciationScore,
      isPerfect: isPerfect,
      timestamp: new Date().toISOString(),
      sessionId: sessionId,
      audioRecording: audioBase64 || undefined
    };

    // 1. Save to localStorage first (fast, works offline)
    const savedProgress = JSON.parse(localStorage.getItem('language_progress') || '[]');
    savedProgress.push(progressData);
    localStorage.setItem('language_progress', JSON.stringify(savedProgress));

    // 2. Save to Supabase (persistent storage)
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('language_progress')
        .insert({
          user_id: localUserId,
          word_id: currentWord.id,
          english_word: currentWord.english,
          language: selectedLanguage,
          user_translation: currentTranslation || '',
          audio_recording: audioBase64,
          pronunciation_score: pronunciationScore,
          is_perfect: isPerfect,
          session_id: sessionId,
          created_at: new Date().toISOString()
        })
        .select();

      if (error) {
        console.error('Supabase save error:', error);
        // Continue anyway - localStorage already saved
      } else {
        console.log('✅ Saved to Supabase:', data);
      }
    } catch (supabaseError) {
      console.error('Supabase connection error:', supabaseError);
      // Continue anyway - localStorage already saved
    }

    // 3. Update user stats in Supabase
    try {
      await updateUserStatsInSupabase(pronunciationScore, isPerfect, audioBase64);
    } catch (statsError) {
      console.error('Error updating user stats in Supabase:', statsError);
    }

    // Award XP
    const xpEarned = 10 + (isPerfect ? 5 : 0) + (userRecording ? 3 : 0);
    const newXp = xp + xpEarned;
    setXp(newXp);
    localStorage.setItem('language_trainer_xp', newXp.toString());

    // Check level up
    const newLevel = Math.floor(newXp / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      localStorage.setItem('language_trainer_level', newLevel.toString());
      showNotification(`🎉 Level Up! You're now Level ${newLevel}`);
    }

    // Update local user stats
    setUserStats(prev => ({
      ...prev,
      totalWordsCompleted: prev.totalWordsCompleted + 1,
      totalRecordings: prev.totalRecordings + (userRecording ? 1 : 0),
      perfectScores: prev.perfectScores + (isPerfect ? 1 : 0),
      languagesTried: new Set<string>([...prev.languagesTried, selectedLanguage as string])
    }));

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
const updateUserStatsInSupabase = async (pronunciationScore: number, isPerfect: boolean, audioBase64: string | null) => {
  try {
    const supabase = createClient();

    // Check if user exists in Supabase
    const { data: existingUser, error: fetchError } = await supabase
      .from('language_users')
      .select('*')
      .eq('user_id', localUserId)
      .single();

    const updates: any = {
      user_id: localUserId,
      total_xp: xp + 10 + (isPerfect ? 5 : 0) + (audioBase64 ? 3 : 0),
      total_words_completed: userStats.totalWordsCompleted + 1,
      total_recordings_made: userStats.totalRecordings + (audioBase64 ? 1 : 0),
      total_perfect_scores: userStats.perfectScores + (isPerfect ? 1 : 0),
      languages_tried: Array.from(new Set([...userStats.languagesTried, selectedLanguage as string])),
      last_active: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (fetchError || !existingUser) {
      // Create new user
      updates.created_at = new Date().toISOString();
      const { error: insertError } = await supabase
        .from('language_users')
        .insert([updates]);

      if (insertError) throw insertError;
    } else {
      // Update existing user
      updates.total_xp = (existingUser.total_xp || 0) + 10 + (isPerfect ? 5 : 0) + (audioBase64 ? 3 : 0);
      updates.total_words_completed = (existingUser.total_words_completed || 0) + 1;
      updates.total_recordings_made = (existingUser.total_recordings_made || 0) + (audioBase64 ? 1 : 0);
      updates.total_perfect_scores = (existingUser.total_perfect_scores || 0) + (isPerfect ? 1 : 0);
      
      // Merge languages tried
      const existingLanguages = existingUser.languages_tried || [];
      const newLanguages = Array.from(new Set([...existingLanguages, selectedLanguage as string]));
      updates.languages_tried = newLanguages;

      const { error: updateError } = await supabase
        .from('language_users')
        .update(updates)
        .eq('user_id', localUserId);

      if (updateError) throw updateError;
    }

  } catch (error) {
    console.error('Error updating user stats in Supabase:', error);
    throw error;
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

  // 50 words achievement
  if (userStats.totalWordsCompleted >= 50 && !newAchievements.find(a => a.id === '50_words')?.unlocked) {
    const achievement: AchievementType = {
      id: '50_words',
      title: 'Language Learner',
      description: 'Complete 50 words',
      icon: '📚',
      unlocked: true,
      progress: 50,
      total: 50
    };
    newAchievements.push(achievement);
    unlockedNew = true;
    setShowAchievement(achievement);
  }

  // First recording achievement
  if (userStats.totalRecordings >= 1 && !newAchievements.find(a => a.id === 'first_recording')?.unlocked) {
    const achievement: AchievementType = {
      id: 'first_recording',
      title: 'Voice Keeper',
      description: 'Make your first recording',
      icon: '🎤',
      unlocked: true,
      progress: 1,
      total: 1
    };
    newAchievements.push(achievement);
    unlockedNew = true;
    setShowAchievement(achievement);
  }

  if (unlockedNew) {
    setAchievements(newAchievements);
    localStorage.setItem('language_achievements', JSON.stringify(newAchievements));
    
    // Save achievements to Supabase
    try {
      const supabase = createClient();
      await supabase.from('user_achievements').insert({
        user_id: localUserId,
        achievement_id: newAchievements[newAchievements.length - 1].id,
        unlocked_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving achievement to Supabase:', error);
    }
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
                  className="px-6 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                >
                  Awesome!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-6xl mx-auto">
        {/* User status bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-white text-sm sm:text-base truncate">
                {localUserId ? `User: ${localUserId.slice(0, 8)}...` : 'Loading...'}
              </span>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowCommunity(!showCommunity)}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg text-sm font-semibold whitespace-nowrap"
              >
                {showCommunity ? 'Hide Community' : 'Show Community'}
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🌍 Language Ontology Trainer
          </h1>
          <p className="text-gray-300 text-lg">
            Learn, speak, and preserve indigenous languages word by word
          </p>
          <div className="mt-6 inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
            <span className="text-white font-semibold">{LANGUAGE_ONTOLOGY_WORDS.length} words • 4 languages • Your voice</span>
          </div>
        </div>

        {/* Community leaderboard */}
        {showCommunity && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 bg-gray-800/40 rounded-2xl p-4 sm:p-6 backdrop-blur-sm"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              🌐 Community Leaderboard
              <button 
                onClick={() => setShowCommunity(false)}
                className="ml-auto text-sm text-gray-400 hover:text-white"
              >
                Close
              </button>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-800/30 to-yellow-600/30 border border-yellow-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Swahili</span>
                  <span className="px-2 py-1 rounded text-xs bg-yellow-500 text-yellow-900">#1</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">14,520</div>
                <div className="text-sm text-gray-400">Words collected</div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-700/30 to-gray-600/30 border border-gray-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Kikuyu</span>
                  <span className="px-2 py-1 rounded text-xs bg-gray-400 text-gray-900">#2</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">8,920</div>
                <div className="text-sm text-gray-400">Words collected</div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-800/30 to-amber-700/30 border border-amber-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Meru</span>
                  <span className="px-2 py-1 rounded text-xs bg-amber-600 text-amber-900">#3</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">5,120</div>
                <div className="text-sm text-gray-400">Words collected</div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/30 to-gray-700/30 border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Sheng</span>
                  <span className="px-2 py-1 rounded text-xs bg-gray-600 text-gray-900">#4</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">3,120</div>
                <div className="text-sm text-gray-400">Words collected</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Language selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {LANGUAGES.map((lang) => (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`
                group relative overflow-hidden rounded-2xl p-4 sm:p-6
                bg-gradient-to-br ${lang.color}
                transform transition-all duration-300
                hover:shadow-2xl
              `}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl sm:text-4xl">{lang.flag}</div>
                  <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm">
                    {lang.difficulty}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{lang.name}</h2>
                <p className="text-white/80 text-sm mb-4">{lang.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium text-sm sm:text-base">{lang.learners.toLocaleString()}</div>
                    <div className="text-white/60 text-xs">learners</div>
                  </div>

                  <div className="px-3 sm:px-4 py-1 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/30 transition-colors">
                    <span className="text-white font-medium text-sm sm:text-base flex items-center gap-1">
                      Start
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* User stats */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{userStats.totalWordsCompleted}</div>
            <div className="text-gray-400 text-xs sm:text-sm">Words Completed</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{userStats.totalRecordings}</div>
            <div className="text-gray-400 text-xs sm:text-sm">Recordings Made</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{userStats.perfectScores}</div>
            <div className="text-gray-400 text-xs sm:text-sm">Perfect Scores</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">{userStats.languagesTried.size}</div>
            <div className="text-gray-400 text-xs sm:text-sm">Languages Tried</div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center text-gray-400 text-sm">
          <p className="mb-2">Each word you save helps preserve indigenous languages for future generations</p>
          <p>Progress saved locally and to Supabase database</p>
        </div>
      </div>
    </div>
  );
}
  // Get current language info
  const currentLang = LANGUAGES.find(l => l.id === selectedLanguage);

  // Render training interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 sm:p-6 bg-gray-800/30 rounded-2xl">
          <div className="w-full sm:w-auto">
            <button
              onClick={() => setSelectedLanguage('')}
              className="text-gray-400 hover:text-white mb-2 sm:mb-0 flex items-center gap-2 group w-full sm:w-auto justify-center sm:justify-start"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to languages
            </button>
            <h1 className="text-xl sm:text-3xl font-bold text-white text-center sm:text-left">
              Learning <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">{currentLang?.name}</span>
            </h1>
            <p className="text-gray-400 text-sm text-center sm:text-left">Session ID: {sessionId.slice(0, 8)}...</p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end">
            <div className="text-right hidden sm:block">
              <div className="text-white font-semibold text-lg">
                L{level} • {xp} XP
              </div>
              <div className="text-gray-400 text-sm">
                {streak} day streak 🔥
              </div>
            </div>

            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-gray-700 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-lg sm:text-2xl">{currentLang?.flag}</div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress • Word {currentWordIndex + 1} of {LANGUAGE_ONTOLOGY_WORDS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-1000"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main training card */}
        <motion.div 
          className="bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={currentWordIndex}
        >
          {/* Word display */}
          <div className="text-center mb-6 sm:mb-10">
            <div className="inline-block px-4 sm:px-6 py-2 bg-gray-900/80 rounded-full mb-3 sm:mb-4">
              <span className="text-cyan-400 text-xs sm:text-sm uppercase tracking-wider">
                {currentWord?.category?.replace('_', ' ')}
              </span>
            </div>

            <div className="inline-block px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl mb-3 sm:mb-4 border border-gray-700/50">
              <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">
                English Word
              </span>
              <motion.div 
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-2 sm:mt-3 mb-1 sm:mb-2"
                key={currentWord?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {currentWord?.english}
              </motion.div>
              <div className="text-gray-500 text-xs sm:text-sm">
                {currentWord?.partOfSpeech}
              </div>
            </div>
          </div>

          {/* Translation input */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-gray-300 mb-2 sm:mb-3 text-base sm:text-lg flex items-center gap-2">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 w-2 h-4 sm:h-5 rounded-full"></span>
              {currentLang?.name} Translation
            </label>
            <input
              type="text"
              value={currentTranslation}
              onChange={(e) => handleTranslationChange(e.target.value)}
              placeholder={`Type the ${currentLang?.name} word here...`}
              className="w-full bg-gray-900/80 border-2 border-gray-700 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-5 text-white text-lg sm:text-xl placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Record section */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
                <span className="text-pink-400 text-lg sm:text-xl">🎤</span> 
                <span>Record Your Pronunciation</span>
                {userRecording && (
                  <span className="ml-auto text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">
                    ✓ Recorded
                  </span>
                )}
              </h3>

              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`
                  w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg mb-3 sm:mb-4
                  ${isRecording ? 
                    'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg shadow-red-500/20 animate-pulse' :
                    'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20'
                  }
                  transition-all duration-200
                `}
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  🎤 {isRecording ? 'Stop Recording' : 'Start Recording'}
                  {isRecording && (
                    <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></span>
                  )}
                </span>
              </button>

              {userRecording && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-800/50 rounded-xl">
                  <audio
                    src={userRecording}
                    controls
                    className="w-full"
                  />
                  <div className="flex items-center gap-2 mt-2 sm:mt-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-green-400 text-xs sm:text-sm">
                      Great! Your pronunciation will be saved
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                Practice saying the word in {currentLang?.name}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={skipWord}
              disabled={saving}
              className="flex-1 py-3 sm:py-4 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg sm:rounded-xl font-semibold transition-colors border border-gray-600/50 text-sm sm:text-base"
            >
              Skip Word →
            </button>

            <button
              onClick={saveWord}
              disabled={saving || (!currentTranslation && !userRecording)}
              className={`
                flex-1 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold relative overflow-hidden text-sm sm:text-base
                ${saving || (!currentTranslation && !userRecording) ?
                  'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/50' :
                  'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20'
                }
                transition-all duration-200
              `}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white/30 border-t-white"></div>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  💾 Save & Next Word
                  <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded-full">
                    +10 XP
                  </span>
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Community button */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => setShowCommunity(true)}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 text-white rounded-xl sm:rounded-2xl border border-cyan-500/20 transition-colors flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <span className="text-lg sm:text-xl">👥</span>
            <span>View Community Leaderboard</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="text-2xl sm:text-4xl font-bold text-cyan-300 mb-1 sm:mb-2 text-center">
              {Object.keys(translations).length}
            </div>
            <div className="text-gray-400 text-center text-xs sm:text-sm">Words Translated</div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="text-2xl sm:text-4xl font-bold text-purple-300 mb-1 sm:mb-2 text-center">
              {currentWordIndex}
            </div>
            <div className="text-gray-400 text-center text-xs sm:text-sm">Words Completed</div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="text-2xl sm:text-4xl font-bold text-green-300 mb-1 sm:mb-2 text-center">
              {Math.round((LANGUAGE_ONTOLOGY_WORDS.length - currentWordIndex) / 10)} min
            </div>
            <div className="text-gray-400 text-center text-xs sm:text-sm">Time Remaining</div>
          </div>
        </div>

        {/* Tips */}
        <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-gray-800/20 to-gray-900/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gray-700/30">
          <p className="text-gray-300 text-sm sm:text-lg">
            💪 <strong>Keep going!</strong> Each word you save helps preserve {currentLang?.name} for future generations
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Your progress is saved to Supabase database for permanent preservation
          </p>
        </div>
      </div>
    </div>
  );
}