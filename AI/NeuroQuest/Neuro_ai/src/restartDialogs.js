// Dialoge für den sicheren Neustart eines Tages

export const getRestartDialog = (currentRound, isDayComplete) => {
  if (isDayComplete) {
    // Tag bereits abgeschlossen
    return {
      stage: 'confirm',
      caspar: [
        "Diesen Tag haben wir schon vollständig entdeckt.",
      ],
      lumi: [
        "Du kannst die Geschichte jederzeit noch einmal lesen.",
        "Wenn du den Tag neu beginnst, werden alle fünf Runden dieses Tages zurückgesetzt.",
      ],
      primaryButton: "Geschichte noch einmal lesen",
      secondaryButton: "Tag wirklich neu beginnen",
      showSecondStep: true,
    };
  }

  if (currentRound === 0) {
    // Tag noch nicht begonnen - kein Dialog nötig
    return null;
  }

  // Tag teilweise bearbeitet
  return {
    stage: 'confirm',
    caspar: [
      "Darf ich dich kurz etwas fragen?",
      "Wir haben heute schon ein Stück unseres Weges entdeckt.",
    ],
    lumi: [
      "Wenn wir den Tag neu beginnen, starten wir wieder beim ersten Schritt.",
      "Unsere bisher entdeckten Teile würden dann zurückgesetzt.",
    ],
    caspanFollowUp: "Möchtest du lieber dort weitermachen, wo wir gerade sind?",
    primaryButton: "Dort weitermachen",
    secondaryButton: "Tag wirklich neu beginnen",
    showSecondStep: true,
  };
};

export const getSecondConfirmDialog = () => {
  return {
    stage: 'final',
    caspar: [
      "Dann beginnen wir den heutigen Weg noch einmal ganz von vorn.",
    ],
    lumi: [
      "Die bereits freigeschalteten Teile dieses Tages werden zurückgesetzt.",
    ],
    primaryButton: "Doch lieber weitermachen",
    secondaryButton: "Ja, neu beginnen",
    showSecondStep: false,
  };
};
