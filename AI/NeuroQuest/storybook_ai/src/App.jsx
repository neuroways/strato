import { RouterProvider, createBrowserRouter, useParams } from "react-router";
import Home from "./pages/Home";
import DayWelcome from "./pages/DayWelcome";
import RoundStart from "./pages/RoundStart";
import Step1Check from "./pages/Step1Check";
import Step2Write from "./pages/Step2Write";
import Step3Control from "./pages/Step3Control";
import Step4Underline from "./pages/Step4Underline";
import StoryPart from "./pages/StoryPart";

// Wrapper components to extract params and pass to pages
function DayWelcomeWrapper() {
  const { day } = useParams();
  return <DayWelcome day={parseInt(day) || 1} />;
}

function RoundStartWrapper() {
  const { day, round } = useParams();
  return <RoundStart day={parseInt(day) || 1} round={parseInt(round) || 1} />;
}

function Step1CheckWrapper() {
  const { day, round } = useParams();
  return <Step1Check day={parseInt(day) || 1} round={parseInt(round) || 1} />;
}

function Step2WriteWrapper() {
  const { day, round } = useParams();
  return <Step2Write day={parseInt(day) || 1} round={parseInt(round) || 1} />;
}

function Step3ControlWrapper() {
  const { day, round } = useParams();
  return <Step3Control day={parseInt(day) || 1} round={parseInt(round) || 1} />;
}

function Step4UnderlineWrapper() {
  const { day, round } = useParams();
  return <Step4Underline day={parseInt(day) || 1} round={parseInt(round) || 1} />;
}

function StoryPartWrapper() {
  const { day, round } = useParams();
  return <StoryPart day={parseInt(day) || 1} round={parseInt(round) || 1} />;
}

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/day/:day/welcome",
    element: <DayWelcomeWrapper />,
  },
  {
    path: "/day/:day/round/:round/start",
    element: <RoundStartWrapper />,
  },
  {
    path: "/day/:day/round/:round/step/1",
    element: <Step1CheckWrapper />,
  },
  {
    path: "/day/:day/round/:round/step/2",
    element: <Step2WriteWrapper />,
  },
  {
    path: "/day/:day/round/:round/step/3",
    element: <Step3ControlWrapper />,
  },
  {
    path: "/day/:day/round/:round/step/4",
    element: <Step4UnderlineWrapper />,
  },
  {
    path: "/day/:day/round/:round/story",
    element: <StoryPartWrapper />,
  },
];

const basename = new URL(document.baseURI).pathname.replace(/\/$/, "");
const router = createBrowserRouter(routes, { basename });

export default function App() {
  return <RouterProvider router={router} />;
}
