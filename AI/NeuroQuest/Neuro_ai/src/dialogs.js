// Dialog-System für NeuroQuest
// Caspar und Lumi begleiten das Kind bei Entscheidungen

export const getDialogByProgress = (currentRound) => {
  // currentRound: 0-4 (wie viele Sätze schon bearbeitet)
  
  if (currentRound === 4) {
    // Alles geschafft - kein Dialog
    return null;
  }
  
  if (currentRound === 3) {
    // Nur noch eine Runde
    return {
      caspar: [
        "Schau mal.",
        "Uns fehlt nur noch ein kleines Stück.",
      ],
      lumi: [
        "Vielleicht wartet direkt dahinter schon das nächste Geheimnis.",
      ],
    };
  }
  
  if (currentRound === 2) {
    // Halb geschafft
    return {
      caspar: [
        "Wir haben heute schon einiges entdeckt.",
        "Möchtest du später genau hier weitermachen?",
      ],
      lumi: [
        "Der Wald merkt sich unseren Weg.",
      ],
    };
  }
  
  if (currentRound <= 1) {
    // Gerade begonnen
    return {
      caspar: [
        "Heute wartet noch ein ganz neues Abenteuer auf uns.",
      ],
      lumi: [
        "Wir können jederzeit wiederkommen.",
      ],
    };
  }
  
  // Standard-Dialog
  return {
    caspar: [
      "Darf ich dich kurz etwas fragen?",
      "Ich glaube, hier gibt es noch etwas zu entdecken.",
      "Aber natürlich entscheidest du selbst.",
    ],
    lumi: [
      "Der Wald läuft nicht weg.",
      "Unsere Geschichte wartet geduldig auf uns.",
      "Wenn du möchtest, können wir sie später gemeinsam weiterlesen.",
    ],
  };
};
