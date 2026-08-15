// Simulated game analysis service
// In production, this would parse actual PDF files and extract game information

export const EXAMPLE_GAME = {
  id: "insel-der-pfade-001",
  title: "Die Insel der Pfade",
  description: "Die Spieler erkunden gemeinsam eine Insel, sammeln Wissen und erreichen vor Ablauf der letzten Runde den Leuchtturm.",
  
  basics: {
    playerCount: { min: 2, max: 4 },
    duration: { min: 45, max: 60 },
    complexity: "mittel",
    age: "10+",
  },

  goal: "Die Spieler müssen den Leuchtturm erreichen, bevor die Endphase des Spiels abgelaufen ist. Wer die meisten Wissenspunkte sammelt, gewinnt.",

  material: [
    { name: "1 Spielplan", description: "Die Insel mit verschiedenen Regionen" },
    { name: "4 Spielfiguren", description: "Eine für jeden Spieler" },
    { name: "24 Wissenskarten", description: "Verschiedene Kategorien" },
    { name: "8 Ressourcenmarker", description: "Für Wasser und Proviant" },
    { name: "1 Rundenzähler", description: "Zeigt die Spielphase an" },
    { name: "2 Würfel", description: "Für Bewegung und Aktionen" },
  ],

  setup: {
    title: "Spielaufbau",
    steps: [
      "Legt den Spielplan in die Mitte des Tisches.",
      "Jeder Spieler nimmt eine Spielfigur und stellt sie auf das Startfeld.",
      "Mischt die 24 Wissenskarten und legt sie verdeckt als Stapel bereit.",
      "Verteilt jedem Spieler 2 Ressourcenmarker.",
      "Stellt den Rundenzähler auf '1' (von 6 Runden).",
      "Der jüngste Spieler beginnt.",
    ]
  },

  roundStructure: {
    title: "Rundenablauf",
    phases: [
      {
        name: "Phase 1: Bewegung",
        description: "Würfle mit beiden Würfeln. Du darfst deine Figur um bis zu der Summe der Augenzahl Felder bewegen.",
      },
      {
        name: "Phase 2: Aktion",
        description: "Führe eine Aktion durch: (A) Wissenskarte ziehen, (B) Ressource nutzen, oder (C) Andere Spieler unterstützen.",
      },
      {
        name: "Phase 3: Spielende",
        description: "Der nächste Spieler im Uhrzeigersinn ist an der Reihe.",
      }
    ]
  },

  actions: [
    {
      name: "Wissenskarte ziehen",
      description: "Ziehe die oberste Karte vom Stapel. Du erhältst Punkte entsprechend der Kartenkategorie.",
      cost: "Keine",
    },
    {
      name: "Ressource nutzen",
      description: "Gib einen Ressourcenmarker aus, um eine spezielle Aktion durchzuführen: +2 extra Bewegung in der nächsten Runde oder +1 Wissenskarte sofort.",
      cost: "1 Ressourcenmarker",
    },
    {
      name: "Andere Spieler unterstützen",
      description: "Hilf einem anderen Spieler: Er erhält +1 Bewegung oder +1 Ressourcenmarker. Dafür erhältst du 1 Wissenspunkt.",
      cost: "Keine",
    },
  ],

  specialRules: [
    {
      name: "Leuchtturmfeld",
      description: "Wer das Leuchtturmfeld erreicht, erhält 5 Bonuspunkte und darf eine Wissenskarte extra ziehen.",
    },
    {
      name: "Inselfähre",
      description: "Auf diesem Feld kannst du direkt zu jedem anderen Inselfeld springen. Danach darfst du keine weitere Aktion durchführen.",
    },
    {
      name: "Wissenssammel-Bonus",
      description: "Wenn du 5 Wissenskarten der gleichen Kategorie hast, erhältst du 10 Bonuspunkte und musst 3 Karten zurückgeben.",
    },
  ],

  winConditions: [
    "Die Endphase (Runde 6) ist abgelaufen.",
    "Ein Spieler hat den Leuchtturm erreicht.",
    "Der Spieler mit den meisten Wissenspunkten gewinnt.",
    "Gleichstand: Der Spieler näher am Leuchtturm gewinnt.",
  ],

  beginnerMistakes: [
    {
      mistake: "Zu früh zum Leuchtturm gehen",
      why: "Du verlierst Zeit beim Sammeln von Wissenskarten. Diese geben mehr Punkte.",
      solution: "Sammle mindestens 3 Karten, bevor du zum Leuchtturm gehst.",
    },
    {
      mistake: "Ressourcenmarker ignorieren",
      why: "Sie ermöglichen Bonusaktionen und können spielentscheidend sein.",
      solution: "Nutze Ressourcen strategisch — nicht alle auf einmal.",
    },
    {
      mistake: "Andere Spieler nicht unterstützen",
      why: "Du verlierst Chancen, selbst Punkte zu sammeln und Allianzen zu bilden.",
      solution: "Helfe anderen, wenn es dir selbst nützt oder dir zeitlich passt.",
    },
  ],

  strategies: [
    {
      name: "Wissens-Strategie",
      description: "Konzentriere dich darauf, so viele Wissenskarten wie möglich der gleichen Kategorie zu sammeln. Das gibt einen großen Bonusbonus.",
    },
    {
      name: "Schnell-Strategie",
      description: "Gehe schnell zum Leuchtturm und nutze Ressourcen, um extra Bewegung zu bekommen. Riskanter, aber schneller Sieg.",
    },
    {
      name: "Kooperativ-Strategie",
      description: "Unterstütze andere Spieler häufig. Das gibt dir eine gute Reputation und Bonuspunkte.",
    },
  ],

  uploadedAt: new Date().toISOString(),
};

// Simulate PDF analysis with a delay
export async function analyzeGameDocument(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return the example game data with the file name for context
      resolve({
        success: true,
        game: EXAMPLE_GAME,
        fileName: file.name,
        fileSize: file.size,
      });
    }, 3000); // 3 second simulation
  });
}

// Simulate coach responses
export async function askGameCoach(gameId, question, game) {
  const responses = {
    "was-darf-ich": `In deinem Zug darfst du folgendes tun:\n\n1. **Würfeln und Bewegen** — Würfle mit beiden Würfeln und bewege deine Figur bis zur Summe.\n\n2. **Eine Aktion wählen**: Entweder eine Wissenskarte ziehen, einen Ressourcenmarker nutzen, oder einen anderen Spieler unterstützen.\n\nDas ist dein ganzer Zug. Danach ist der nächste Spieler dran.`,
    
    "wie-gewinne-ich": `Das Spiel endet nach 6 Runden oder wenn jemand den Leuchtturm erreicht.\n\nDein Gewinn wird so berechnet:\n- **Wissenskarten**: Je Karte 1 Punkt\n- **Leuchtturm**: +5 Punkte, wenn du ihn erreichst\n- **Kategorie-Bonus**: +10 Punkte, wenn du 5 Karten der gleichen Kategorie hast\n- **Unterstützungs-Bonus**: +1 Punkt pro Spieler, dem du geholfen hast\n\nWer am Ende die meisten Punkte hat, gewinnt!`,

    "anfaengerfehler": `Die häufigsten Anfängerfehler sind:\n\n1. **Zu schnell zum Leuchtturm**: Das kostet Zeit. Sammle vorher Wissenskarten — die geben mehr Punkte.\n\n2. **Ressourcen ignorieren**: Ressourcenmarker sind wertvoll. Sie geben dir extra Bewegung oder extra Karten.\n\n3. **Allein spielen**: Andere Spieler zu unterstützen gibt dir Punkte und kann nützlich sein. Denk strategisch!`,

    "standard": `Gute Frage! In ${game.title} geht es darum, Wissenspunkte zu sammeln und strategisch zu denken.\n\nWenn du noch spezifische Fragen hast — zu einer Regel, einer Aktion oder einer Strategie — frag einfach!`,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      let category = "standard";
      if (question.toLowerCase().includes("darf")) category = "was-darf-ich";
      if (question.toLowerCase().includes("gewin")) category = "wie-gewinne-ich";
      if (question.toLowerCase().includes("fehler") || question.toLowerCase().includes("anfänger")) category = "anfaengerfehler";

      resolve({
        question,
        answer: responses[category] || responses.standard,
      });
    }, 800);
  });
}
