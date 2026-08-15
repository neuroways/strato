import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pb';

export default function Contact() {
  const [tournament, setTournament] = useState(null);
  const [location, setLocation] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Get tournament
        const tournaments = await pb.collection('tournaments').getFullList();
        if (tournaments.length > 0) {
          const t = tournaments[0];
          setTournament(t);

          // Get location
          const locations = await pb.collection('locations').getFullList({
            filter: `tournament_id = "${t.id}"`
          });
          if (locations.length > 0) {
            setLocation(locations[0]);
          }

          // Get contacts
          const contactList = await pb.collection('contacts').getFullList({
            filter: `tournament_id = "${t.id}"`
          });
          setContacts(contactList);
        }
      } catch (error) {
        console.error('Error loading contact data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-green-600">Kontaktdaten werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-12 text-center">Kontakt & Anfahrt</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Location Card */}
          {location && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-900 mb-6">📍 Veranstaltungsort</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-green-900">Ort</h3>
                  <p className="text-gray-700">{location.name}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-green-900">Adresse</h3>
                  <p className="text-gray-700">
                    {location.street}<br />
                    {location.zip} {location.city}
                  </p>
                </div>

                {location.parking_information && (
                  <div>
                    <h3 className="font-semibold text-green-900">🅿️ Parken</h3>
                    <p className="text-gray-700">{location.parking_information}</p>
                  </div>
                )}

                {location.arrival_information && (
                  <div>
                    <h3 className="font-semibold text-green-900">🚗 Anfahrt</h3>
                    <p className="text-gray-700">{location.arrival_information}</p>
                  </div>
                )}
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg p-8 text-center text-gray-600">
                Google Maps Integration
              </div>
            </div>
          )}

          {/* Contacts Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">📞 Kontakt</h2>
            
            {contacts.length > 0 ? (
              <div className="space-y-6">
                {contacts.map(contact => (
                  <div key={contact.id} className="border-l-4 border-green-600 pl-4">
                    <h3 className="font-bold text-green-900 mb-2">{contact.name}</h3>
                    {contact.phone && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Telefon</p>
                        <p className="text-green-900 font-medium">
                          <a href={`tel:${contact.phone}`} className="hover:underline">
                            {contact.phone}
                          </a>
                        </p>
                      </div>
                    )}
                    {contact.email && (
                      <div>
                        <p className="text-sm text-gray-600">E-Mail</p>
                        <p className="text-green-900 font-medium">
                          <a href={`mailto:${contact.email}`} className="hover:underline">
                            {contact.email}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600">
                <p className="mb-2">Noch keine Kontaktpersonen eingetragen.</p>
                <p className="text-sm">Bitte versuchen Sie es später erneut oder nutzen Sie die Anfahrtsinformationen oben.</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-green-100 border-l-4 border-green-600 text-green-900 p-6 rounded-lg">
          <h3 className="font-bold mb-2">ℹ️ Weitere Informationen</h3>
          <ul className="text-sm space-y-1">
            <li>• Bitte kommen Sie ca. 30 Minuten vor Ihrem Spielbeginn vor Ort an</li>
            <li>• Für Fragen nutzen Sie bitte die Kontaktdaten oben</li>
            <li>• Der genaue Spielplan wird vor dem Turnier veröffentlicht</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
