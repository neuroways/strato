import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { pb } from '../lib/pb.js';
import { SongNavigation } from './Navigation.jsx';

function parseLyrics(lyricsText) {
  if (!lyricsText) return [];

  const lines = lyricsText.split('\n');
  const sections = [];
  let currentSection = null;

  const sectionTitles = [
    'Intro', 'Verse', 'Strophe', 'Pre-Chorus', 'Pre-Chorus', 'Refrain',
    'Chorus', 'Bridge', 'Instrumental', 'Outro', 'Intro', 'Verse 1',
    'Verse 2', 'Verse 3', 'Verse 4', 'Verse 5', 'Verse 6',
  ];

  lines.forEach((line) => {
    const trimmed = line.trim();
    
    // Check if this line is a section title
    const isSectionTitle = sectionTitles.some(
      (title) => trimmed.toLowerCase() === title.toLowerCase()
    );

    if (isSectionTitle) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: trimmed,
        lines: [],
      };
    } else if (currentSection) {
      if (trimmed) {
        currentSection.lines.push(trimmed);
      }
    }
  });

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

export function SongPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        // Load the specific song
        const songData = await pb.collection('songs').getOne(id, {
          signal: controller.signal,
        });
        setSong(songData);

        // Load all songs to determine prev/next
        if (songData.album) {
          const allSongs = await pb.collection('songs').getList(1, 100, {
            filter: `album="${songData.album}"`,
            sort: 'trackNumber',
            signal: controller.signal,
          });
          setSongs(allSongs.items);
        }
      } catch (err) {
        if (err?.isAbort || err?.name === 'AbortError') {
          return;
        }
        setError(err?.message || 'Song nicht gefunden');
      } finally {
        setLoading(false);
      }
    }

    loadData();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="max-w-reading w-full">
          <div className="h-12 rounded mb-6 animate-pulse" style={{ backgroundColor: 'rgba(57, 52, 61, 0.1)' }} />
          <div className="space-y-4 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 rounded animate-pulse" style={{ backgroundColor: 'rgba(57, 52, 61, 0.1)' }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !song) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="text-center max-w-md">
          <h2 style={{ color: 'var(--color-dark-text)' }} className="text-2xl font-bold mb-4">Song nicht gefunden</h2>
          <p style={{ color: 'var(--color-dark-text)' }} className="mb-6">
            Dieser Song konnte nicht geladen werden.
          </p>
          <Link
            to="/"
            style={{ color: 'var(--color-dark-purple)' }}
            className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Trackliste
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = songs.findIndex((s) => s.id === song.id);
  const previousSong = currentIndex > 0 ? songs[currentIndex - 1] : null;
  const nextSong = currentIndex < songs.length - 1 ? songs[currentIndex + 1] : null;

  const sections = parseLyrics(song.lyrics);

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-reading mx-auto px-4 md:px-6">
        {/* Back button */}
        <Link
          to="/"
          style={{ color: 'var(--color-dark-purple)' }}
          className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Trackliste
        </Link>

        {/* Song header */}
        <div className="mb-12">
          <p style={{ color: 'var(--color-graphite)' }} className="text-sm mb-2 uppercase tracking-wide">
            Track {song.trackNumber}
          </p>
          <h1 className="mb-3">{song.title}</h1>
          
          {song.subtitle && (
            <p style={{ color: 'var(--color-graphite)' }} className="text-lg mb-6">{song.subtitle}</p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 pt-6" style={{ borderTopColor: 'rgba(57, 52, 61, 0.1)', borderTopWidth: '1px' }}>
            {song.key && (
              <div>
                <p style={{ color: 'var(--color-graphite)' }} className="text-xs uppercase tracking-wide">Tonart</p>
                <p style={{ color: 'var(--color-dark-text)' }} className="font-serif">{song.key}</p>
              </div>
            )}
            {song.bpm && (
              <div>
                <p style={{ color: 'var(--color-graphite)' }} className="text-xs uppercase tracking-wide">Tempo</p>
                <p style={{ color: 'var(--color-dark-text)' }} className="font-serif">{song.bpm} BPM</p>
              </div>
            )}
            {song.mood && (
              <div>
                <p style={{ color: 'var(--color-graphite)' }} className="text-xs uppercase tracking-wide">Stimmung</p>
                <p style={{ color: 'var(--color-dark-text)' }} className="font-serif">{song.mood}</p>
              </div>
            )}
          </div>
        </div>

        {/* Lyrics */}
        <div className="mb-16">
          {song.lyrics ? (
            <div className="space-y-8">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <h3 style={{ color: 'var(--color-graphite)', backgroundColor: 'var(--color-cream)' }} className="text-sm font-bold uppercase tracking-widest mb-4 sticky top-24 py-2">
                    {section.title}
                  </h3>
                  <div style={{ color: 'var(--color-dark-text)' }} className="text-lg leading-relaxed whitespace-pre-wrap">
                    {section.lines.join('\n')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--color-dark-text)' }} className="italic">Für diesen Song ist noch kein Songtext hinterlegt.</p>
          )}
        </div>

        {/* Navigation */}
        <SongNavigation
          previousId={previousSong?.id}
          nextId={nextSong?.id}
        />
      </div>
    </div>
  );
}
