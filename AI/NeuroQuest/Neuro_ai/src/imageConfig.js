// Zentrale Bildkonfiguration für NeuroQuest
// Alle Bilder sind statisch im assets/images/-Ordner organisiert

export const storyImages = {
  day1: {
    title: '/assets/images/story/day-1-title.jpg',
    parts: [
      '/assets/images/story/day-1-part-1.jpg',
      '/assets/images/story/day-1-part-2.jpg',
      '/assets/images/story/day-1-part-3.jpg',
      '/assets/images/story/day-1-part-4.jpg',
      '/assets/images/story/day-1-part-5.jpg',
    ],
  },
  day2: {
    title: '/assets/images/story/day-2-title.jpg',
    parts: ['/assets/images/story/day-2-title.jpg'],
  },
  day3: {
    title: '/assets/images/story/day-3-title.jpg',
    parts: ['/assets/images/story/day-3-title.jpg'],
  },
  day4: {
    title: '/assets/images/story/day-4-title.jpg',
    parts: ['/assets/images/story/day-4-title.jpg'],
  },
  day5: {
    title: '/assets/images/story/day-5-title.jpg',
    parts: ['/assets/images/story/day-5-title.jpg'],
  },
};

export const characters = {
  caspar: '/assets/images/characters/caspar.png',
  lumi: '/assets/images/characters/lumi.png',
  mino: '/assets/images/characters/mino.png',
};

export const ui = {
  forestBackground: '/assets/images/ui/forest-background.jpg',
  magicFiveSymbol: '/assets/images/ui/magic-five-symbol.png',
};

// Bild für einen Tag abrufen
export const getDayImage = (dayIndex) => {
  const days = ['day1', 'day2', 'day3', 'day4', 'day5'];
  if (dayIndex >= 0 && dayIndex < 5) {
    return storyImages[days[dayIndex]];
  }
  return null;
};

// Bild für eine Storypart abrufen
export const getStoryPartImage = (dayIndex, partIndex) => {
  const days = ['day1', 'day2', 'day3', 'day4', 'day5'];
  if (dayIndex >= 0 && dayIndex < 5 && storyImages[days[dayIndex]].parts) {
    const parts = storyImages[days[dayIndex]].parts;
    if (partIndex >= 0 && partIndex < parts.length) {
      return parts[partIndex];
    }
  }
  return null;
};
