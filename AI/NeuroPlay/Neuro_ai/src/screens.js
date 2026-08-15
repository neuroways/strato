// NeuroQuest Screens - wie Buchseiten
// Jeder Screen zeigt genau eine Aufgabe

export const STEPS = [
  {
    id: 1,
    title: "Prüfe das Satzende",
    description: "Wo endet der Satz? Mit Punkt · Fragezeichen · oder Ausrufezeichen!",
    hint: "Schau auf das letzte Zeichen",
  },
  {
    id: 2,
    title: "Schreibe den Satz",
    description: "Schreibe jedes Wort sorgfältig auf.",
    hint: "Nimm dir Zeit bei jedem Buchstaben",
  },
  {
    id: 3,
    title: "Kontrolliere jedes Wort",
    description: "Lies langsam durch. Stimmt jedes Wort?",
    hint: "Vergleiche mit dem Original",
  },
  {
    id: 4,
    title: "Unterstreiche den Satz",
    description: "Markiere deinen fertigen Satz mit dem Lineal.",
    hint: "Das Besondere für gute Arbeit",
  },
  {
    id: 5,
    title: "Moment der Freude",
    description: "Deine Geschichte wächst!",
    hint: "Ein neuer Satz ist vollendet",
  },
];

export const SCREEN_TYPES = {
  DAY_TITLE: 'dayTitle',           // Tagesüberschrift + Geschichte-Intro
  STEP_EXPLAIN: 'stepExplain',     // Regel erklären (z.B. "Prüfe das Satzende")
  STEP_WORK: 'stepWork',           // Kind arbeitet (Button "Schritt erledigt")
  STEP_STORY: 'stepStory',         // Geschichte freischalten (nach Schritt 4)
  DAY_COMPLETE: 'dayComplete',     // Tagesgeschichte komplett (scrollbar)
  ALL_DAYS_COMPLETE: 'allDaysComplete', // Alle 5 Tage fertig
};

export const getInitialScreen = () => ({
  type: SCREEN_TYPES.DAY_TITLE,
  day: 0,
  round: 0,
  step: 0,
});

export const getNextScreen = (current) => {
  const { type, day, round, step } = current;

  // Übersicht nach Schritt 4 - Story zeigen
  if (type === SCREEN_TYPES.STEP_WORK && step === 4) {
    return { type: SCREEN_TYPES.STEP_STORY, day, round, step };
  }

  // Nach Story - nächste Runde oder Tagesabschluss
  if (type === SCREEN_TYPES.STEP_STORY) {
    if (round < 4) {
      // Nächste Runde
      return { type: SCREEN_TYPES.DAY_TITLE, day, round: round + 1, step: 0 };
    } else {
      // Tag komplett
      return { type: SCREEN_TYPES.DAY_COMPLETE, day, round, step };
    }
  }

  // Nach Tagesabschluss - nächster Tag oder alles fertig
  if (type === SCREEN_TYPES.DAY_COMPLETE) {
    if (day < 4) {
      return { type: SCREEN_TYPES.DAY_TITLE, day: day + 1, round: 0, step: 0 };
    } else {
      return { type: SCREEN_TYPES.ALL_DAYS_COMPLETE, day, round, step };
    }
  }

  // Standard: Schritt erklären → arbeiten → story
  if (type === SCREEN_TYPES.DAY_TITLE) {
    return { type: SCREEN_TYPES.STEP_EXPLAIN, day, round, step };
  }

  if (type === SCREEN_TYPES.STEP_EXPLAIN) {
    return { type: SCREEN_TYPES.STEP_WORK, day, round, step };
  }

  return current;
};
