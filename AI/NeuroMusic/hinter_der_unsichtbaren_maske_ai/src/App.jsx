import { createBrowserRouter, RouterProvider } from 'react-router';
import { Navigation } from './components/Navigation.jsx';
import { HomePage } from './components/HomePage.jsx';
import { SongPage } from './components/SongPage.jsx';
import { NotFound } from './components/NotFound.jsx';

// Get the basename from the document's base href
const basename = new URL(document.baseURI).pathname.replace(/\/$/, '') || '/';

const routes = [
  {
    path: '/',
    element: (
      <>
        <Navigation />
        <HomePage />
      </>
    ),
  },
  {
    path: '/songs/:id',
    element: (
      <>
        <Navigation />
        <SongPage />
      </>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Navigation />
        <NotFound />
      </>
    ),
  },
];

const router = createBrowserRouter(routes, { basename });

export default function App() {
  return <RouterProvider router={router} />;
}
