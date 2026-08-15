export function ErrorPage({ code = 'error', title, message }) {
  const errors = {
    404: { title: 'Seite nicht gefunden', message: 'Die angeforderte Seite existiert nicht.' },
    403: { title: 'Zugriff verweigert', message: 'Du hast keine Berechtigung, diese Seite zu sehen.' },
    500: { title: 'Fehler', message: 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.' },
  };

  const error = errors[code] || errors[500];
  const displayTitle = title || error.title;
  const displayMessage = message || error.message;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-red-500 mb-4">{code}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{displayTitle}</h1>
        <p className="text-gray-500 mb-6">{displayMessage}</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-medium bg-nw-navy text-nw-white text-base font-bold hover:bg-nw-teal transition-colors duration-fast"
        >
          Zurück zur Übersicht
        </a>
      </div>
    </div>
  );
}
