import { useState } from "react";
import { SCREEN_TYPES, getInitialScreen, getNextScreen } from "./screens";
import { DayTitleScreen } from "./screens/DayTitleScreen";
import { StepExplainScreen } from "./screens/StepExplainScreen";
import { StepWorkScreen } from "./screens/StepWorkScreen";
import { StepStoryScreen } from "./screens/StepStoryScreen";
import { DayCompleteScreen } from "./screens/DayCompleteScreen";
import { AllCompleteScreen } from "./screens/AllCompleteScreen";
import { DebugScreen } from "./screens/DebugScreen";

function App() {
  const [screen, setScreen] = useState(() => {
    try {
      return getInitialScreen();
    } catch (e) {
      console.error("App.jsx: Failed to initialize screen:", e);
      return null;
    }
  });

  const handleScreenChange = () => {
    try {
      const nextScreen = getNextScreen(screen);
      setScreen(nextScreen);
    } catch (e) {
      console.error("App.jsx: Error during screen transition:", e);
    }
  };

  const handleRestart = () => {
    try {
      setScreen(getInitialScreen());
    } catch (e) {
      console.error("App.jsx: Error during restart:", e);
    }
  };

  if (!screen) {
    return <DebugScreen />;
  }

  try {
    switch (screen.type) {
      case SCREEN_TYPES.DAY_TITLE:
        return (
          <DayTitleScreen 
            day={screen.day}
            onContinue={handleScreenChange}
          />
        );

      case SCREEN_TYPES.STEP_EXPLAIN:
        return (
          <StepExplainScreen 
            step={screen.step}
            day={screen.day}
            round={screen.round}
            onContinue={handleScreenChange}
          />
        );

      case SCREEN_TYPES.STEP_WORK:
        return (
          <StepWorkScreen 
            step={screen.step}
            day={screen.day}
            round={screen.round}
            onComplete={handleScreenChange}
          />
        );

      case SCREEN_TYPES.STEP_STORY:
        return (
          <StepStoryScreen 
            day={screen.day}
            round={screen.round}
            onContinue={handleScreenChange}
          />
        );

      case SCREEN_TYPES.DAY_COMPLETE:
        return (
          <DayCompleteScreen 
            day={screen.day}
            onContinue={handleScreenChange}
          />
        );

      case SCREEN_TYPES.ALL_DAYS_COMPLETE:
        return (
          <AllCompleteScreen 
            onRestart={handleRestart}
          />
        );

      default:
        console.error("App.jsx: Unknown screen type:", screen.type);
        return <DebugScreen />;
    }
  } catch (e) {
    console.error("App.jsx: Render error:", e);
    return <DebugScreen />;
  }
}

export default App;
