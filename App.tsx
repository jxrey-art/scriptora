import { useState, useCallback, useEffect, useRef } from 'react';
import { categories, tones, generateLetter, formatDate, type Category, type Tone } from './data/letterData';

// ============================================================
// Floating Particles Background
// ============================================================
function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 20,
      size: 2 + Math.random() * 4,
    }))
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// Quill SVG Icon
// ============================================================
function QuillIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M48 4C42 10 30 22 24 36C22 40 20 44 18 48L14 52C13 53 14 55 16 54L22 50C26 48 30 46 34 44C44 38 54 26 58 16C60 10 54 4 48 4Z"
        fill="url(#quill-grad)"
        stroke="#d4a843"
        strokeWidth="1.5"
      />
      <path d="M48 4C48 4 40 12 34 22C28 32 24 40 22 44" stroke="#f0d78c" strokeWidth="1" opacity="0.5" />
      <path d="M14 52L10 56C9 57 10 59 12 58L18 50" stroke="#d4a843" strokeWidth="1.5" fill="none" />
      <defs>
        <linearGradient id="quill-grad" x1="48" y1="4" x2="20" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="0.5" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ============================================================
// Step Indicator
// ============================================================
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ['Catégorie', 'Détails', 'Lettre'];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div
              className={`step-dot ${i <= currentStep ? 'step-dot-active' : ''}`}
            />
            <span className={`text-xs mt-1 transition-colors duration-300 ${
              i <= currentStep ? 'text-gold-light' : 'text-white/30'
            }`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`step-line ${i < currentStep ? 'step-line-active' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Category Card
// ============================================================
function CategoryCard({
  category,
  isSelected,
  onClick,
  index,
}: {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`glass-card rounded-xl p-4 text-left cursor-pointer transition-all duration-300 fade-in-up group ${
        isSelected ? 'glass-card-selected' : ''
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{category.emoji}</span>
        <div>
          <h3 className="font-semibold text-sm text-cream group-hover:text-gold-light transition-colors duration-300">
            {category.label}
          </h3>
          <p className="text-xs text-white/40 mt-0.5">{category.description}</p>
        </div>
      </div>
    </button>
  );
}

// ============================================================
// Tone Chip
// ============================================================
function ToneChip({
  tone,
  isSelected,
  onClick,
}: {
  tone: Tone;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`tone-chip ${isSelected ? 'tone-chip-selected' : ''}`}
    >
      <span className="mr-1">{tone.emoji}</span> {tone.label}
    </button>
  );
}

// ============================================================
// Letter Display Component
// ============================================================
function LetterDisplay({
  letter,
  destinataire,
  expediteur,
  category,
  onRegenerate,
  onNewLetter,
}: {
  letter: string;
  destinataire: string;
  expediteur: string;
  category: Category;
  onRegenerate: () => void;
  onNewLetter: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = letter;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [letter]);

  const paragraphs = letter.split('\n\n');

  return (
    <div className="letter-reveal w-full max-w-2xl mx-auto">
      {/* Action bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onNewLetter}
          className="btn-ghost text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Nouvelle lettre
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={onRegenerate}
            className="btn-ghost text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Régénérer
          </button>
          <button
            onClick={handleCopy}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              copied
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'btn-gold'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copié !
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copier
              </>
            )}
          </button>
        </div>
      </div>

      {/* Letter */}
      <div className="letter-paper rounded-xl p-8 sm:p-12 letter-scroll max-h-[70vh] overflow-y-auto" ref={letterRef}>
        {/* Date */}
        <p className="text-right text-sm text-ink/50 mb-6 italic">{formatDate()}</p>

        {/* Category emoji */}
        <div className="flex justify-center mb-4">
          <span className="text-2xl">{category.emoji}</span>
        </div>

        {/* Letter content */}
        <div className="pl-8 sm:pl-14">
          {paragraphs.map((paragraph, i) => {
            // First paragraph is usually the greeting
            if (i === 0) {
              return (
                <p key={i} className="text-lg font-semibold text-ink/90 mb-6">
                  {paragraph}
                </p>
              );
            }
            // Last paragraph is usually the signature
            if (i === paragraphs.length - 1 && paragraph.includes('\n')) {
              const lines = paragraph.split('\n');
              return (
                <div key={i} className="mt-8">
                  {lines.map((line, j) => (
                    <p key={j} className={`${j === lines.length - 1 ? 'font-semibold italic text-ink/80' : 'text-ink/70'}`}>
                      {line}
                    </p>
                  ))}
                </div>
              );
            }
            // Regular paragraphs
            return (
              <p key={i} className="text-ink/80 leading-relaxed mb-4 text-[15px]">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Wax seal decoration */}
        <div className="flex justify-end mt-8 pr-4">
          <div className="wax-seal">
            <span>📜</span>
          </div>
        </div>
      </div>

      {/* Letter meta */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-white/30">
        <span>De : {expediteur}</span>
        <span>•</span>
        <span>À : {destinataire}</span>
        <span>•</span>
        <span>{category.label}</span>
      </div>
    </div>
  );
}

// ============================================================
// Main App
// ============================================================
export default function App() {
  const [step, setStep] = useState(0); // 0: hero, 1: category, 2: details, 3: letter
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTone, setSelectedTone] = useState<Tone | null>(null);
  const [destinataire, setDestinataire] = useState('');
  const [expediteur, setExpediteur] = useState('');
  const [letter, setLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleSelectCategory = useCallback((cat: Category) => {
    setSelectedCategory(cat);
    setTimeout(() => setStep(2), 300);
  }, []);

  const handleGenerate = useCallback(() => {
    if (!selectedCategory || !selectedTone || !destinataire.trim() || !expediteur.trim()) return;

    setIsGenerating(true);
    // Simulate generation delay for effect
    setTimeout(() => {
      const generated = generateLetter(selectedCategory.id, selectedTone.id, destinataire, expediteur);
      setLetter(generated);
      setIsGenerating(false);
      setStep(3);
    }, 1500);
  }, [selectedCategory, selectedTone, destinataire, expediteur]);

  const handleRegenerate = useCallback(() => {
    if (!selectedCategory || !selectedTone) return;
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateLetter(selectedCategory.id, selectedTone.id, destinataire, expediteur);
      setLetter(generated);
      setIsGenerating(false);
    }, 800);
  }, [selectedCategory, selectedTone, destinataire, expediteur]);

  const handleNewLetter = useCallback(() => {
    setStep(1);
    setLetter('');
  }, []);

  const handleStartOver = useCallback(() => {
    setStep(0);
    setSelectedCategory(null);
    setSelectedTone(null);
    setDestinataire('');
    setExpediteur('');
    setLetter('');
  }, []);

  const canGenerate = selectedCategory && selectedTone && destinataire.trim() && expediteur.trim();

  return (
    <div className="min-h-screen bg-animated relative">
      <Particles />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-6 px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={step > 0 ? handleStartOver : undefined}
              className={`flex items-center gap-3 ${step > 0 ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <QuillIcon className="w-8 h-8 quill-animate" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-light via-gold to-accent-purple bg-clip-text text-transparent">
                  Scriptora
                </h1>
                <p className="text-[10px] text-white/30 tracking-widest uppercase">
                  Générateur de lettres
                </p>
              </div>
            </button>

            {step > 0 && step < 3 && (
              <StepIndicator currentStep={step - 1} />
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 pb-12">
          <div className="max-w-4xl mx-auto">

            {/* ============================================ */}
            {/* HERO / LANDING */}
            {/* ============================================ */}
            {step === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[70vh] text-center fade-in-up">
                <div className="mb-8">
                  <QuillIcon className="w-20 h-20 mx-auto quill-animate" />
                </div>
                <h2 className="text-5xl sm:text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-gold-light via-gold to-accent-purple bg-clip-text text-transparent">
                    Scriptora
                  </span>
                </h2>
                <p className="text-xl text-white/60 mb-2">
                  Générateur intelligent de lettres personnalisées
                </p>
                <p className="text-sm text-white/30 mb-12 max-w-md">
                  Exprimez vos émotions avec élégance. Choisissez une catégorie, un ton, et laissez la magie opérer.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="btn-gold text-lg px-8 py-4 flex items-center gap-3 animate-pulse"
                >
                  <span>Commencer à écrire</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                {/* Feature highlights */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
                  {[
                    { emoji: '✍️', title: '12 catégories', desc: 'Amour, amitié, excuses, et plus' },
                    { emoji: '🎭', title: '8 tons', desc: 'Romantique, drôle, poétique...' },
                    { emoji: '💌', title: 'Lettres uniques', desc: 'Chaque génération est différente' },
                  ].map((f, i) => (
                    <div key={i} className={`glass-card rounded-xl p-5 text-center fade-in-up-delay-${i + 1}`}>
                      <span className="text-3xl mb-2 block">{f.emoji}</span>
                      <h3 className="font-semibold text-gold-light text-sm">{f.title}</h3>
                      <p className="text-xs text-white/40 mt-1">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* CATEGORY SELECTION */}
            {/* ============================================ */}
            {step === 1 && (
              <div className="fade-in-up">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-cream mb-2">
                    Choisissez votre catégorie
                  </h2>
                  <p className="text-white/40 text-sm">
                    Quelle type de lettre souhaitez-vous écrire ?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((cat, i) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      isSelected={selectedCategory?.id === cat.id}
                      onClick={() => handleSelectCategory(cat)}
                      index={i}
                    />
                  ))}
                </div>

                {selectedCategory && (
                  <div className="mt-8 text-center fade-in-up">
                    <p className="text-white/50 text-sm mb-3">
                      Sélectionné : <span className="text-gold-light font-semibold">{selectedCategory.emoji} {selectedCategory.label}</span>
                    </p>
                    <button
                      onClick={() => setStep(2)}
                      className="btn-primary"
                    >
                      Continuer
                      <svg className="w-4 h-4 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ============================================ */}
            {/* DETAILS FORM */}
            {/* ============================================ */}
            {step === 2 && (
              <div className="fade-in-up max-w-lg mx-auto">
                <div className="text-center mb-8">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-white/40 hover:text-gold transition-colors mb-4 flex items-center gap-1 mx-auto"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour aux catégories
                  </button>
                  <h2 className="text-3xl font-bold text-cream mb-2">
                    Personnalisez votre lettre
                  </h2>
                  <p className="text-white/40 text-sm">
                    {selectedCategory?.emoji} {selectedCategory?.label}
                  </p>
                </div>

                {/* Names */}
                <div className="space-y-5 mb-10">
                  <div>
                    <label className="block text-sm font-medium text-gold-light mb-2">
                      ✉️ Votre nom (l'expéditeur)
                    </label>
                    <input
                      type="text"
                      value={expediteur}
                      onChange={(e) => setExpediteur(e.target.value)}
                      placeholder="Ex : Marie, Thomas..."
                      className="input-elegant w-full px-4 py-3 rounded-xl text-lg"
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gold-light mb-2">
                      💌 Nom du destinataire
                    </label>
                    <input
                      type="text"
                      value={destinataire}
                      onChange={(e) => setDestinataire(e.target.value)}
                      placeholder="Ex : Julien, Camille..."
                      className="input-elegant w-full px-4 py-3 rounded-xl text-lg"
                      maxLength={50}
                    />
                  </div>
                </div>

                {/* Tone Selection */}
                <div className="mb-10">
                  <label className="block text-sm font-medium text-gold-light mb-4">
                    🎭 Choisissez le ton de votre lettre
                  </label>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {tones.map((tone) => (
                      <ToneChip
                        key={tone.id}
                        tone={tone}
                        isSelected={selectedTone?.id === tone.id}
                        onClick={() => setSelectedTone(tone)}
                      />
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center">
                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate || isGenerating}
                    className="btn-gold text-lg px-10 py-4 disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Génération en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <QuillIcon className="w-5 h-5" />
                        Générer ma lettre
                      </span>
                    )}
                  </button>

                  {!canGenerate && !isGenerating && (
                    <p className="text-xs text-white/30 mt-3">
                      Veuillez remplir tous les champs et choisir un ton
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* LETTER DISPLAY */}
            {/* ============================================ */}
            {step === 3 && letter && !isGenerating && (
              <LetterDisplay
                letter={letter}
                destinataire={destinataire}
                expediteur={expediteur}
                category={selectedCategory!}
                onRegenerate={handleRegenerate}
                onNewLetter={handleNewLetter}
              />
            )}

            {/* Generating overlay */}
            {isGenerating && step === 3 && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] fade-in-up">
                <QuillIcon className="w-16 h-16 quill-animate mb-6" />
                <p className="text-gold-light text-lg font-semibold animate-pulse">
                  Votre lettre prend forme...
                </p>
                <p className="text-white/30 text-sm mt-2">
                  L'inspiration est en marche ✨
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/20 text-xs">
              <QuillIcon className="w-4 h-4" />
              <span>Scriptora © {new Date().getFullYear()}</span>
            </div>
            <p className="text-white/15 text-xs">
              Fait avec ❤️ pour les belles lettres
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
