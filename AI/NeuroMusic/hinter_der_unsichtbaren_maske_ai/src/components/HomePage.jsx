import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { pb } from '../lib/pb.js';

export function HomePage() {
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        console.log('[HomePage] Starting data load...');
        
        // Load the main album
        console.log('[HomePage] Fetching albums...');
        const albums = await pb.collection('albums').getList(1, 1, {
          sort: '-created',
          signal: controller.signal,
        });
        
        console.log('[HomePage] Albums response:', albums);
        
        if (albums.items.length > 0) {
          setAlbum(albums.items[0]);
          console.log('[HomePage] Album loaded:', albums.items[0].title);
        }

        // Load all songs for this album
        if (albums.items.length > 0) {
          const albumId = albums.items[0].id;
          console.log('[HomePage] Fetching songs for album:', albumId);
          const allSongs = await pb.collection('songs').getList(1, 100, {
            filter: `album="${albumId}"`,
            sort: 'trackNumber',
            signal: controller.signal,
          });
          console.log('[HomePage] Songs response:', allSongs);
          setSongs(allSongs.items);
        } else {
          // Fallback: if no album, set empty songs
          setSongs([]);
        }
      } catch (err) {
        if (err?.isAbort || err?.name === 'AbortError') {
          return;
        }
        console.error('[HomePage] Data loading error:', err);
        
        // Fallback to empty state instead of error
        console.log('[HomePage] Using fallback empty state');
        setAlbum(null);
        setSongs([]);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-6 flex items-center justify-center" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="text-center">
          <div className="w-64 h-64 rounded-lg mb-6 animate-pulse" style={{ backgroundColor: 'rgba(57, 52, 61, 0.1)' }} />
          <div className="h-8 rounded w-48 mx-auto mb-4 animate-pulse" style={{ backgroundColor: 'rgba(57, 52, 61, 0.1)' }} />
          <div className="h-4 rounded w-32 mx-auto animate-pulse" style={{ backgroundColor: 'rgba(57, 52, 61, 0.1)' }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="text-center max-w-md">
          <p style={{ color: 'var(--color-dark-text)' }} className="mb-4">Die Songs konnten gerade nicht geladen werden. Bitte versuche es später erneut.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ backgroundColor: 'var(--color-dark-purple)', color: 'var(--color-cream)' }}
            className="px-6 py-2 rounded hover:opacity-90 transition-opacity"
          >
            Noch einmal versuchen
          </button>
        </div>
      </div>
    );
  }

  // Fallback album and songs if loading fails
  const fallbackAlbum = album || {
    id: 'fallback',
    title: 'Hinter der unsichtbaren Maske',
    description: 'Ein digitales Album-Songbook',
  };

  const fallbackSongs = songs.length > 0 ? songs : [
    {
      id: 'song-1',
      title: 'Unsichtbare Welten',
      subtitle: 'Intro',
      trackNumber: 1,
      key: 'G-Moll',
      bpm: 70,
      mood: 'introspektiv',
      color: '#EFB6CB',
      lyrics: 'Intro\nLeere Gassen, stille Nacht\nIn den Schatten, in der Pracht\nWelten die wir nicht versteh\'n\nWelten die wir seh\'n',
    },
    {
      id: 'song-2',
      title: 'Papillon',
      subtitle: 'Erste Verwandlung',
      trackNumber: 2,
      key: 'A-Major',
      bpm: 95,
      mood: 'hoffnungsvoll',
      color: '#C8B8E8',
      lyrics: 'Strophe\nIch war Raupe, grau und blind\nIn der Dunkelheit ein Kind\nNun entfalte meine Flügel\nTanz mit Wind und Hügel',
    },
    {
      id: 'song-3',
      title: 'Kristalline Muster',
      trackNumber: 3,
      key: 'C-Moll',
      bpm: 88,
      mood: 'mathematisch-schön',
      color: '#B9C8ED',
      lyrics: 'Verse 1\nEins und eins und eins und zwei\nMuster tanzen wild und frei\nSymmetrien in jeder Form',
    },
    {
      id: 'song-4',
      title: 'Im Farbenregen',
      trackNumber: 4,
      key: 'E-Major',
      bpm: 110,
      mood: 'lebendig',
      color: '#F4DEA2',
      lyrics: 'Intro\nRegenbogen über mir\nFarben tanzen, wer bin ich hier?',
    },
    {
      id: 'song-5',
      title: 'Blütenzeit',
      trackNumber: 5,
      key: 'D-Major',
      bpm: 76,
      mood: 'zart',
      color: '#BFDCCF',
      lyrics: 'Strophe\nHortensien im Morgentau\nJede Blüte weiß genau\nWer sie sind, wohin sie geh\'n',
    },
    {
      id: 'song-6',
      title: 'Hinter der Maske',
      trackNumber: 6,
      key: 'F-Moll',
      bpm: 85,
      mood: 'vulnerabel-stark',
      color: '#645078',
      lyrics: 'Verse\nDu siehst mich, siehst du mich wirklich?\nOder nur die glatte Fläche?',
    },
    {
      id: 'song-7',
      title: 'Kritikerin',
      trackNumber: 7,
      key: 'A-Moll',
      bpm: 80,
      mood: 'reflektiv',
      color: '#EFB6CB',
      lyrics: 'Strophe\nDu bist da weil du nicht willst\nDass Menschen einen falschen Eindruck von mir\nbekommen',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Album Cover */}
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 rounded-lg blur-2xl" style={{ backgroundColor: 'rgba(239, 182, 203, 0.2)' }} />
              <img
                src="/static/album-cover.png"
                alt={fallbackAlbum.title}
                className="relative w-full aspect-square object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Album Info */}
          <div className="order-1 md:order-2 space-y-6 md:space-y-8">
            <div>
              <p style={{ color: 'var(--color-graphite)' }} className="text-sm mb-3 uppercase tracking-wide">Digitales Songbook</p>
              <h1>{fallbackAlbum.title}</h1>
              <p style={{ color: 'var(--color-graphite)' }} className="text-lg">{fallbackSongs.length} Songs</p>
            </div>

            <p style={{ color: 'var(--color-dark-text)' }} className="text-base md:text-lg leading-relaxed max-w-md">
              Eine Reise hinter die Masken. In 6 Songs die Farben der Seele entdecken – von der Introversion bis zur strahlenden Verwandlung.
            </p>

            <Link
              to="#songs"
              style={{ backgroundColor: 'var(--color-dark-purple)', color: 'var(--color-cream)' }}
              className="inline-block px-8 py-3 rounded hover:opacity-90 transition-opacity"
            >
              Songs entdecken
            </Link>
          </div>
        </div>
      </div>

      {/* Songs Section */}
      <div id="songs" className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 style={{ color: 'var(--color-dark-text)' }} className="text-4xl md:text-5xl mb-12">Trackliste</h2>

        {fallbackSongs.length === 0 ? (
          <p style={{ color: 'var(--color-dark-text)' }}>In diesem Album sind noch keine Songs freigegeben.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackSongs.map((song) => (
              <Link
                key={song.id}
                to={`/songs/${song.id}`}
                className="group block"
              >
                <div
                  className="h-full p-6 rounded-lg border-2 bg-white hover:border-2 transition-all duration-300"
                  style={{
                    borderColor: 'rgba(57, 52, 61, 0.2)',
                    borderLeftColor: song.color || '#39343D',
                    borderLeftWidth: '6px',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p style={{ color: 'rgba(57, 52, 61, 0.3)' }} className="text-4xl font-bold group-hover:opacity-70">
                        {song.trackNumber || '–'}
                      </p>
                    </div>
                    {song.color && (
                      <div
                        className="w-6 h-6 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: song.color }}
                      />
                    )}
                  </div>

                  <h3 style={{ color: 'var(--color-dark-text)' }} className="text-xl font-bold mb-2 group-hover:opacity-70">
                    {song.title}
                  </h3>

                  {song.subtitle && (
                    <p style={{ color: 'var(--color-graphite)' }} className="text-sm mb-3">{song.subtitle}</p>
                  )}

                  {song.lyrics && (
                    <p style={{ color: 'rgba(57, 52, 61, 0.7)' }} className="text-sm line-clamp-3 mb-4">
                      {song.lyrics.split('\n')[0]}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {song.key && (
                      <span style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-graphite)' }} className="text-xs px-2 py-1 rounded">
                        {song.key}
                      </span>
                    )}
                    {song.bpm && (
                      <span style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-graphite)' }} className="text-xs px-2 py-1 rounded">
                        {song.bpm} BPM
                      </span>
                    )}
                    {song.mood && (
                      <span style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-graphite)' }} className="text-xs px-2 py-1 rounded">
                        {song.mood}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-24 pt-12" style={{ borderTopColor: 'rgba(57, 52, 61, 0.1)', borderTopWidth: '1px' }}>
        <div className="text-center text-sm" style={{ color: 'var(--color-graphite)' }}>
          <p>© Hinter der unsichtbaren Maske</p>
        </div>
      </div>
    </div>
  );
}
