import React, { useState, useRef } from 'react';
import { pb } from '../lib/pb';
import '../styles/DataUploader.css';

export default function DataUploader({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
        setFile(selectedFile);
        setError('');
        setMessage('');
      } else {
        setError('Bitte wählen Sie eine Excel-Datei (.xlsx oder .xls)');
        setFile(null);
      }
    }
  };

  const parseExcelFile = async (file) => {
    const { Workbook } = await import('xlsx');
    const XLSX = require('xlsx');
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          const publishers = [];
          const games = [];
          
          // Parse publishers
          const publisherSheet = workbook.Sheets['Verlage'];
          if (publisherSheet) {
            const pubData = XLSX.utils.sheet_to_json(publisherSheet);
            publishers.push(...pubData);
          }
          
          // Parse games
          const gamesSheet = workbook.Sheets['Spiele und Anleitungen'];
          if (gamesSheet) {
            const gamesData = XLSX.utils.sheet_to_json(gamesSheet);
            games.push(...gamesData);
          }
          
          resolve({ publishers, games });
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const syncData = async (publishers, games) => {
    try {
      // Sync publishers
      const totalItems = publishers.length + games.length;
      let processed = 0;

      for (const pub of publishers) {
        processed++;
        setProgress(Math.round((processed / totalItems) * 100));

        const record = {
          id: pub['Verlag-ID'],
          publisher_id: pub['Verlag-ID'],
          name: pub['Verlag'],
          priority: pub['Priorität'],
          country: pub['Land'],
          website: pub['Startseite'],
          games_overview_url: pub['Spieleübersicht'],
          rules_source: pub['Anleitungsquelle'],
          relevance: pub['Relevanz'],
          status: pub['Status'],
          note: pub['Hinweis']
        };

        try {
          // Try to update if exists
          await pb.collection('publishers').update(pub['Verlag-ID'], record);
        } catch {
          // Create if doesn't exist
          try {
            await pb.collection('publishers').create(record);
          } catch (e) {
            // Record already exists
          }
        }
      }

      // Sync games
      for (const game of games) {
        processed++;
        setProgress(Math.round((processed / totalItems) * 100));

        const record = {
          id: game['Datensatz-ID'],
          dataset_id: game['Datensatz-ID'],
          title: game['Spiel'],
          publisher: game['Verlag / Marke'],
          category: game['Kategorie'],
          language: game['Sprache'],
          link_type: game['Linktyp'],
          rules_url: game['Anleitung / Regelquelle'],
          product_page_url: game['Produkt- oder Katalogseite'],
          article_number: game['Artikelnummer / EAN'],
          review_status: game['Prüfstatus'],
          reviewed_on: game['Geprüft am'],
          note: game['Hinweis'],
          metadata_status: game['Metadatenstatus'],
          rules_status: game['Anleitungsstatus'],
          min_players: game['Spielerzahl min.'] ? parseInt(game['Spielerzahl min.']) : null,
          max_players: game['Spielerzahl max.'] ? parseInt(game['Spielerzahl max.']) : null,
          min_duration_min: game['Spieldauer min. (Min.)'] ? parseInt(game['Spieldauer min. (Min.)']) : null,
          max_duration_min: game['Spieldauer max. (Min.)'] ? parseInt(game['Spieldauer max. (Min.)']) : null,
          min_age: game['Mindestalter'] ? parseInt(game['Mindestalter']) : null,
          complexity: game['Komplexität'],
          game_type: game['Spieltyp'],
          mechanics: game['Mechaniken'],
          language_dependent: game['Sprachabhängigkeit'],
          original_title: game['Originaltitel'],
          german_edition: game['Deutsche Edition'],
          bgg_id: game['BGG-ID'],
          product_type: game['Produkttyp'],
          base_game_id: game['Basisspiel-ID'],
          base_game_title: game['Basisspiel-Titel'],
          german_publisher: game['Deutscher Verlag / Ausgabe'],
          publisher_source: game['Verlagsquelle'],
          assignment_status: game['Zuordnungsstatus'],
          canonical_publisher: game['Kanonischer Verlag'],
          other_publishers: game['Weitere Verlage / Partner'],
          consolidation_status: game['Konsolidierungsstatus'],
          duplicate_review: game['Dublettenprüfung']
        };

        try {
          await pb.collection('games').update(game['Datensatz-ID'], record);
        } catch {
          try {
            await pb.collection('games').create(record);
          } catch (e) {
            // Record already exists
          }
        }
      }

      return { publishers: publishers.length, games: games.length };
    } catch (err) {
      throw err;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Bitte wählen Sie eine Datei aus');
      return;
    }

    try {
      setUploading(true);
      setError('');
      setMessage('Datei wird analysiert...');
      setProgress(0);

      const { publishers, games } = await parseExcelFile(file);
      setMessage(`${publishers.length} Verlage und ${games.length} Spiele gefunden. Synchronisiere Datenbank...`);

      const result = await syncData(publishers, games);
      
      setMessage(`✓ Erfolgreich abgeschlossen! ${result.publishers} Verlage und ${result.games} Spiele wurden synchronisiert.`);
      setProgress(100);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(`Fehler beim Upload: ${err.message}`);
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="uploader">
      <div className="uploader-card">
        <h2 className="uploader-title">Katalog aktualisieren</h2>
        <p className="uploader-description">
          Laden Sie eine neue Excel-Datei hoch, um den Katalog zu aktualisieren. 
          Die Datenbank wird automatisch synchronisiert.
        </p>

        <div className="upload-zone">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            disabled={uploading}
            className="file-input"
          />
          <div className="upload-content">
            <span className="upload-icon">📄</span>
            <p className="upload-text">
              {file ? (
                <>
                  <strong>{file.name}</strong>
                  <br />
                  <span className="upload-hint">Klicken zum Ändern</span>
                </>
              ) : (
                <>
                  Klicken zum Hochladen oder Datei hierher ziehen
                  <br />
                  <span className="upload-hint">.xlsx oder .xls Dateien</span>
                </>
              )}
            </p>
          </div>
        </div>

        {(message || error) && (
          <div className={`upload-message ${error ? 'error' : 'success'}`}>
            {error || message}
          </div>
        )}

        {uploading && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-text">{progress}% abgeschlossen</p>
          </div>
        )}

        <div className="uploader-actions">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="upload-button"
          >
            {uploading ? '⏳ Wird hochgeladen...' : '⬆️ Hochladen & Synchronisieren'}
          </button>
          {file && !uploading && (
            <button
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="cancel-button"
            >
              ✕ Abbrechen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
