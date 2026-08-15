import { useState } from "react";
import "./App.css";

import CoverPage from "./pages/CoverPage";
import WelcomePage from "./pages/WelcomePage";
import DaySelectPage from "./pages/DaySelectPage";
import SentenceStartPage from "./pages/SentenceStartPage";
import TaskStep1Page from "./pages/TaskStep1Page";
import TaskStep2Page from "./pages/TaskStep2Page";
import TaskStep3Page from "./pages/TaskStep3Page";
import TaskStep4Page from "./pages/TaskStep4Page";
import StoryRevealPage from "./pages/StoryRevealPage";
import DayCompletePage from "./pages/DayCompletePage";

function App() {
  const [currentPage, setCurrentPage] = useState("cover");
  const [currentDay, setCurrentDay] = useState(1);
  const [currentSentence, setCurrentSentence] = useState(1);
  const [completedSentences, setCompletedSentences] = useState({});
  const [dialogState, setDialogState] = useState(null);

  const goToPage = (pageName, day = currentDay, sentence = currentSentence) => {
    setCurrentPage(pageName);
    if (day !== undefined) setCurrentDay(day);
    if (sentence !== undefined) setCurrentSentence(sentence);
  };

  const handleSentenceComplete = () => {
    const key = `${currentDay}-${currentSentence}`;
    setCompletedSentences(prev => ({ ...prev, [key]: true }));
    handleNextSentence();
  };

  const handleNextSentence = () => {
    if (currentSentence < 5) {
      goToPage("sentenceStart", currentDay, currentSentence + 1);
    } else {
      goToPage("dayComplete", currentDay, 5);
    }
  };

  const trySelectDay = (day) => {
    if (day === currentDay) {
      return;
    }
    const isCurrent = completedSentences[`${currentDay}-5`] === undefined;
    if (isCurrent) {
      setDialogState('switchDay');
    } else {
      goToPage("sentenceStart", day, 1);
      setCurrentDay(day);
      setCurrentSentence(1);
      setDialogState(null);
    }
  };

  let DialogOverlay = null;
  if (dialogState === 'switchDay') {
    DialogOverlay = (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}>
        <div style={{
          backgroundColor: 'var(--color-cream)',
          borderRadius: '16px',
          padding: '32px 24px',
          maxWidth: '90%',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '18px', color: 'var(--color-forest)', marginBottom: '16px', fontWeight: '600' }}>
            Darf ich dich kurz etwas fragen?
          </p>
          <p style={{ fontSize: '16px', color: 'var(--color-text)', marginBottom: '32px', lineHeight: '1.7' }}>
            Ich glaube, wir haben hier heute noch etwas zu entdecken. Natürlich kannst du jederzeit einen anderen Tag wählen. Unser heutiges Abenteuer wartet aber geduldig auf uns.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => { setDialogState(null); }}
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--color-forest)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              🌿 Weiter im Abenteuer
            </button>
            <button
              onClick={() => { setDialogState(null); goToPage('daySelect'); }}
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--color-light-text)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              🍂 Trotzdem Tag wechseln
            </button>
          </div>
        </div>
      </div>
    );
  }

  let PageComponent;

  switch (currentPage) {
    case "cover":
      PageComponent = (
        <CoverPage
          onStart={() => goToPage("welcome")}
        />
      );
      break;
    case "welcome":
      PageComponent = (
        <WelcomePage
          onBegin={() => goToPage("daySelect")}
        />
      );
      break;
    case "daySelect":
      PageComponent = (
        <DaySelectPage
          onSelectDay={(day) => goToPage("sentenceStart", day, 1)}
        />
      );
      break;
    case "sentenceStart":
      PageComponent = (
        <SentenceStartPage
          day={currentDay}
          sentence={currentSentence}
          isFirstSentenceOfDay={currentSentence === 1}
          onBegin={() => goToPage("step1", currentDay, currentSentence)}
        />
      );
      break;
    case "step1":
      PageComponent = (
        <TaskStep1Page
          day={currentDay}
          sentence={currentSentence}
          onContinue={() => goToPage("step2", currentDay, currentSentence)}
        />
      );
      break;
    case "step2":
      PageComponent = (
        <TaskStep2Page
          day={currentDay}
          sentence={currentSentence}
          onContinue={() => goToPage("step3", currentDay, currentSentence)}
        />
      );
      break;
    case "step3":
      PageComponent = (
        <TaskStep3Page
          day={currentDay}
          sentence={currentSentence}
          onContinue={() => goToPage("step4", currentDay, currentSentence)}
        />
      );
      break;
    case "step4":
      PageComponent = (
        <TaskStep4Page
          day={currentDay}
          sentence={currentSentence}
          onContinue={() => goToPage("story", currentDay, currentSentence)}
        />
      );
      break;
    case "story":
      PageComponent = (
        <StoryRevealPage
          day={currentDay}
          sentence={currentSentence}
          onContinue={handleNextSentence}
        />
      );
      break;
    case "dayComplete":
      PageComponent = (
        <DayCompletePage
          day={currentDay}
          onNextDay={() => goToPage("daySelect")}
          onHome={() => goToPage("cover")}
        />
      );
      break;
    default:
      PageComponent = <CoverPage onStart={() => goToPage("welcome")} />;
  }

  return (
    <div className="neuroquest-app">
      {PageComponent}
      {DialogOverlay}
    </div>
  );
}

export default App;
