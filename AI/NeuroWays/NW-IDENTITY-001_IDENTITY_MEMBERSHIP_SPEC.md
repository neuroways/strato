# NW-IDENTITY-001 — NeuroWays Identity & Membership Specification

**Dokumentcode:** NW-IDENTITY-001  
**Version:** 1.0.0  
**Status:** draft  
**Erstellt:** 2026-07-23  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Plattform-Spezifikation — referenziert NW-STD-000 normativ, NW-STD-001 normativ, NW-STD-003 normativ  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstfassung | NeuroWays Core |

---

## Referenzen

| Dokument | Titel | Art |
|---------|-------|-----|
| NW-STD-000 | Standards Framework Standard | normativ |
| NW-STD-001 | Naming Standard | normativ |
| NW-STD-003 | Database Standard | normativ |
| NW-KAS-001 | Knowledge Asset Standard | informativ |
| NW-ROLE-001 | Role & Permission Specification | informativ (geplant) |
| NW-CONSENT-001 | Consent & Privacy Specification | informativ (geplant) |
| NW-DASH-001 | Dashboard Specification | informativ (geplant) |

---

## Geltungsbereich

Diese Spezifikation gilt für alle Bestandteile der NeuroWays-Plattform, die Benutzeridentität, Mitgliedschaft oder organisatorischen Kontext verwenden.

Sie gilt technologieunabhängig — die fachlichen Regeln gelten gleichermaßen für Oracle APEX, React, Flutter, .NET oder jede andere Implementierungstechnologie.

Sie regelt ausschließlich die Identitätsschicht. Berechtigungen, Datenschutzfreigaben, Dashboards und Module folgen in separaten Spezifikationen.

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Detailliertes Berechtigungsmodell | Welche Aktionen sind pro Rolle erlaubt? | NW-ROLE-001 |
| Datenschutz und Einwilligung | Welche Daten darf die Plattform über wen speichern? | NW-CONSENT-001 |
| Externer Identity Provider (Konfiguration) | Welche konkreten Provider werden unterstützt? | Implementierungsdokument |
| MFA-Implementierungsdetails | TOTP, SMS, Hardware-Token | Implementierungsdokument |
| Gastnutzung ohne Konto | Anonymer Zugang zu bestimmten Bereichen | NW-IDENTITY-001 v1.1.0 |

---

## Kapitel 1 — Vision

### 1.1 Warum Identität die Grundlage der gesamten Plattform bildet

Jede Interaktion eines Menschen mit NeuroWays beginnt mit einer einzigen Frage: *Wer ist da?*

Ohne eine klare Antwort auf diese Frage ist alles andere unmöglich. Es gibt keine personalisierten Ergebnisse, weil niemand weiß, zu wem sie gehören. Es gibt keinen Datenschutz, weil niemand weiß, wessen Daten gespeichert werden. Es gibt keine Rollen, weil niemand weiß, in welchem Kontext jemand handelt.

Identität ist nicht ein Feature unter vielen. Sie ist der Ausgangspunkt der gesamten Plattformarchitektur. Alles andere — Methoden, Dashboards, Module, Datenschutzregeln — setzt voraus, dass Identität gelöst ist.

### 1.2 Die fünf Kernbegriffe — und warum sie niemals vermischt werden dürfen

Diese fünf Begriffe beschreiben fünf völlig verschiedene Konzepte. Sie klingen verwandt. Sie sind es nicht.

#### Identität

> *Wer ist jemand — unabhängig davon, wo er gerade ist und was er gerade darf.*

Die Identität ist die unveränderliche Grundlage. Ein Mensch hat genau eine Identität in der Plattform. Sie besteht aus seinen persönlichen Attributen (Name, E-Mail, Sprache) und ist nicht von einem organisatorischen Kontext abhängig. Ob jemand in einem Unternehmen tätig ist oder privat die App nutzt — seine Identität bleibt dieselbe.

Identität ist **kontextfrei**. Sie trägt keine Berechtigungen. Sie weiß nicht, was jemand darf.

#### Mitgliedschaft

> *Die Verbindung zwischen einer Identität und einer Organisation — mit Beginn, Ende und Status.*

Eine Mitgliedschaft entsteht, wenn ein Benutzer einer Organisation beitritt. Sie hat einen Lebenszyklus: Sie beginnt, sie kann pausieren, sie endet. Durch die Mitgliedschaft erhält ein Benutzer einen organisatorischen Kontext. Durch die Mitgliedschaft werden Rollen vergeben.

Mitgliedschaft ist **kontextgebunden**. Ohne Organisation gibt es keine Mitgliedschaft.

#### Rolle

> *Die Funktion, die jemand innerhalb einer bestimmten Mitgliedschaft ausübt.*

Eine Rolle beschreibt, was jemand in einer Organisation ist — kein Mitarbeiter im allgemeinen Sinne, sondern: Manager in Organisation A, einfaches Mitglied in Organisation B. Rollen sind immer an eine Mitgliedschaft gebunden, niemals direkt an einen Benutzer.

Rollen sind **funktionsbeschreibend**. Sie tragen noch keine Berechtigungen — das ist Aufgabe von NW-ROLE-001.

#### Berechtigung

> *Was jemand in einem bestimmten Kontext tun darf.*

Berechtigungen entstehen aus der Kombination von Rolle und Kontext. Sie regeln den Zugriff auf Funktionen, Daten und Module. Berechtigungen sind das Ergebnis einer Auswertung — sie werden nicht gespeichert, sondern berechnet.

Berechtigungen sind **aktionsbezogen**. Sie antworten auf die Frage: „Darf ich das?" — nicht auf „Wer bin ich?"

**→ Berechtigungen sind nicht Bestandteil dieser Spezifikation. Sie folgen in NW-ROLE-001.**

#### Datenschutzfreigabe

> *Die explizite Einwilligung eines Benutzers zur Nutzung seiner Daten für einen bestimmten Zweck.*

Datenschutzfreigaben sind unabhängig von Rollen. Ein Benutzer mit Administratorrechten kann bestimmte Datennutzungen abgelehnt haben. Ein Benutzer mit minimalen Rechten kann umfangreiche Freigaben erteilt haben. Beides ist möglich und gleichzeitig gültig.

Datenschutzfreigaben folgen dem Prinzip der expliziten Einwilligung — sie sind niemals implizit aus einer Rolle ableitbar.

**→ Datenschutzfreigaben sind nicht Bestandteil dieser Spezifikation. Sie folgen in NW-CONSENT-001.**

---

## Kapitel 2 — Grundprinzipien

Die folgenden Prinzipien sind verbindlich für alle Bestandteile der NeuroWays-Plattform. Sie dürfen durch keine Implementierungsentscheidung aufgehoben werden.

### 2.1 Ein Benutzer — eine Identität

Jeder Mensch hat in NeuroWays genau eine Identität. Es gibt keine Konten-Duplikate, keine Schatten-Identitäten, keine plattforminternen Mehrfachkonten.

Wenn jemand die Plattform privat und beruflich nutzt, verwendet er dieselbe Identität — in unterschiedlichen Mitgliedschaftskontexten.

### 2.2 Ein Benutzer kann Mitglied mehrerer Organisationen sein

Mitgliedschaft und Identität sind getrennt. Ein Benutzer kann gleichzeitig Mitglied in einem Unternehmen, einem Verein und einer privaten Gruppe sein. Jede Mitgliedschaft hat ihre eigene Rolle, ihren eigenen Status und ihre eigene Gültigkeitsdauer.

### 2.3 Eine Organisation besitzt viele Benutzer

Organisationen sind Sammlungen von Mitgliedschaften. Sie kennen ihre Mitglieder durch die Mitgliedschaftsbeziehung, nicht durch direkte Benutzerzuordnung.

### 2.4 Rollen gehören niemals direkt zum Benutzer

Ein Benutzer trägt keine Rollen als persönliche Eigenschaft. Rollen entstehen ausschließlich durch Mitgliedschaften. Ohne Mitgliedschaft — keine Rolle.

Diese Trennung ermöglicht es, dass derselbe Mensch in Kontext A Manager und in Kontext B normales Mitglied ist — ohne dass seine Identität sich verändert.

### 2.5 Rollen gehören immer zur Mitgliedschaft

Jede Rollenzuweisung ist an eine konkrete Mitgliedschaft gebunden. Wenn eine Mitgliedschaft endet, erlöschen alle damit verbundenen Rollen automatisch.

### 2.6 Datenschutzfreigaben gehören niemals zu Rollen

Eine Rolle gibt keine Rechte über die Daten anderer Personen. Datenschutzfreigaben werden ausschließlich durch explizite, informierte Zustimmung des betroffenen Benutzers erteilt.

Kein organisatorischer Kontext, keine Rolle und keine administrative Funktion kann eine fehlende Einwilligung ersetzen.

---

## Kapitel 3 — Benutzer (User)

### 3.1 Definition

Ein Benutzer ist eine natürliche Person, die eine verifizierte Identität in der NeuroWays-Plattform besitzt.

Juristische Personen, Systeme oder automatisierte Prozesse sind keine Benutzer im Sinne dieser Spezifikation.

### 3.2 Pflichtattribute

| Attribut | Beschreibung | Bedingungen |
|----------|-------------|-------------|
| `user_id` | Unveränderlicher, systemgenerierter Primärschlüssel | Automatisch vergeben |
| `email` | Primäre Kontaktadresse, eindeutig im System | Muss verifiziert werden |
| `display_name` | Anzeigename — frei wählbar | Nicht systemweit eindeutig |
| `status` | Aktueller Kontostatus | Pflicht, aus definiertem Wertebereich |
| `created_at` | Zeitstempel der Kontoerstellung | Automatisch, unveränderlich |
| `email_verified` | Wurde die E-Mail-Adresse bestätigt? | Boolean |
| `preferred_language` | Bevorzugte Sprache für die Oberfläche | ISO 639-1 Code |

### 3.3 Optionale Attribute

| Attribut | Beschreibung |
|----------|-------------|
| `first_name` | Vorname |
| `last_name` | Nachname |
| `avatar_url` | URL zu einem Profilbild |
| `phone` | Telefonnummer (für MFA oder Benachrichtigungen) |
| `timezone` | Bevorzugte Zeitzone |
| `accessibility_preferences` | Nutzereinstellungen für Barrierefreiheit |
| `updated_at` | Zeitstempel der letzten Änderung |
| `last_login_at` | Zeitstempel des letzten erfolgreichen Logins |

### 3.4 Statusmodell

| Status | Bedeutung | Darf sich einloggen? | Daten sichtbar? |
|--------|-----------|---------------------|-----------------|
| `active` | Konto vollständig aktiv | ✅ ja | ✅ ja |
| `inactive` | Konto existiert, wurde lange nicht genutzt | ✅ ja | ✅ ja |
| `suspended` | Konto vorübergehend gesperrt | ❌ nein | für Admins: ✅ |
| `deleted` | Logisch gelöscht — Daten in Aufbewahrungsfrist | ❌ nein | für Admins: eingeschränkt |
| `archived` | Aufbewahrungsfrist abgelaufen, Daten anonymisiert | ❌ nein | ❌ nein |

Übergänge:

```
active ──→ inactive ──→ active (erneuter Login)
active ──→ suspended ──→ active (Sperrung aufgehoben)
active ──→ deleted ──→ archived (nach Aufbewahrungsfrist)
suspended ──→ deleted
inactive ──→ deleted
```

### 3.5 Lebenszyklus

**Aktiv:** Der Benutzer kann sich einloggen, Organisationen beitreten, Methoden durchführen und Daten einsehen. Alle Mitgliedschaften sind wirksam.

**Inaktiv:** Das Konto existiert und ist technisch nutzbar, wurde aber innerhalb eines definierten Zeitraums nicht verwendet. Keine automatischen Folgen — dient der Übersicht.

**Gesperrt:** Das Konto ist temporär oder dauerhaft gesperrt. Alle Sitzungen werden beendet. Mitgliedschaften bleiben erhalten, aber die Rollen sind nicht aktiv. Eine Sperrung hat immer einen dokumentierten Grund.

**Gelöscht:** Der Benutzer hat sein Konto gelöscht oder wurde gelöscht. Die Identität ist logisch entfernt. Transaktionsdaten (z. B. abgeschlossene Check-ins) können in anonymisierter Form erhalten bleiben, soweit gesetzlich erforderlich. Die Aufbewahrungsfrist ist durch NW-CONSENT-001 geregelt.

**Archiviert:** Die Aufbewahrungsfrist ist abgelaufen. Alle personenbezogenen Daten wurden anonymisiert oder gelöscht. Der Datensatz kann noch aus statistischen oder buchhalterischen Gründen in aggregierter Form vorliegen.

---

## Kapitel 4 — Organisation

### 4.1 Definition

Eine Organisation ist jede Form einer sozialen Einheit, die in NeuroWays Mitglieder verwaltet und gemeinsame Kontexte schafft.

NeuroWays unterscheidet bewusst nicht zwischen verschiedenen Organisationstypen auf Datenbankebene. Das Modell ist neutral.

### 4.2 Organisationstypen (informativ, nicht normativ)

| Typ | Beispiel |
|-----|---------|
| Unternehmen | GmbH, AG, Einzelunternehmen |
| Haushalt | Privater Familienverbund |
| Verein | Sportverein, Kulturverein |
| Schule | Schulklasse, Schulzweig |
| Behörde | Abteilung, Projektgruppe |
| Community | Selbsthilfegruppe, Online-Community |
| Projektgruppe | Temporäres Team |

Diese Liste ist nicht abschließend. Neue Typen entstehen ohne Änderung am Datenmodell — der Typ ist ein frei konfigurierbares Attribut.

### 4.3 Pflichtattribute

| Attribut | Beschreibung |
|----------|-------------|
| `org_id` | Unveränderlicher Primärschlüssel |
| `name` | Anzeigename der Organisation |
| `code` | Stabiler, eindeutiger Business-Code (z. B. `ORG-ACME`) |
| `status` | Aktueller Status (active, suspended, archived) |
| `created_at` | Erstellungszeitpunkt |
| `owner_user_id` | Initialer Eigentümer — natürliche Person |

### 4.4 Optionale Attribute

| Attribut | Beschreibung |
|----------|-------------|
| `org_type` | Freitext — Unternehmensart, Verein, Schule etc. |
| `description` | Kurzbeschreibung |
| `logo_url` | Organisationslogo |
| `website` | Webadresse |
| `contact_email` | Allgemeine Kontaktadresse |
| `timezone` | Standardzeitzone der Organisation |
| `preferred_language` | Standardsprache |
| `max_members` | Maximale Mitgliederzahl (für Lizenzierung) |

### 4.5 Organisationsstatusmodell

| Status | Bedeutung |
|--------|-----------|
| `active` | Organisation aktiv, alle Mitgliedschaften wirksam |
| `suspended` | Temporär gesperrt, keine Logins für Mitglieder |
| `archived` | Organisation aufgelöst, historisch erhalten |

Wenn eine Organisation archiviert wird, werden alle aktiven Mitgliedschaften beendet. Historische Daten (Check-ins, Ergebnisse) bleiben gemäß Datenschutzregeln erhalten.

### 4.6 Persönlicher Bereich

Jeder Benutzer besitzt implizit einen persönlichen Bereich — eine virtuelle Organisation, die nur ihn selbst enthält. Dieser Bereich wird bei der Kontoerstellung automatisch angelegt.

Der persönliche Bereich ermöglicht die Nutzung von NeuroWays ohne explizite Organisationsmitgliedschaft — für Privatnutzende, die keine Organisation verbinden möchten.

---

## Kapitel 5 — Mitgliedschaften

### 5.1 Definition

Eine Mitgliedschaft ist die formale Verbindung zwischen einem Benutzer und einer Organisation. Sie entsteht durch explizite Einladung oder Registrierung und hat einen definierten Lebenszyklus.

### 5.2 Pflichtattribute

| Attribut | Beschreibung |
|----------|-------------|
| `membership_id` | Unveränderlicher Primärschlüssel |
| `user_id` | Verweis auf den Benutzer |
| `org_id` | Verweis auf die Organisation |
| `status` | Aktueller Mitgliedschaftsstatus |
| `joined_at` | Zeitpunkt des Beitritts |
| `created_at` | Zeitpunkt der Anlage des Datensatzes |

### 5.3 Optionale Attribute

| Attribut | Beschreibung |
|----------|-------------|
| `valid_from` | Beginn der Mitgliedschaft (wenn in der Zukunft) |
| `valid_to` | Ende der Mitgliedschaft (wenn befristet) |
| `invited_by` | Benutzer-ID, die die Einladung ausgesprochen hat |
| `invitation_code` | Einladungsschlüssel |
| `roles` | Liste der zugewiesenen Rollen innerhalb dieser Mitgliedschaft |
| `is_primary` | Ist dies die primäre Mitgliedschaft des Benutzers? |
| `notes` | Interne Anmerkungen (nur für Manager sichtbar) |

### 5.4 Statusmodell

| Status | Bedeutung |
|--------|-----------|
| `pending` | Einladung ausgesprochen, noch nicht angenommen |
| `active` | Mitgliedschaft aktiv, Rollen wirksam |
| `paused` | Mitgliedschaft temporär pausiert (z. B. Elternzeit) |
| `expired` | `valid_to` ist überschritten — Mitgliedschaft abgelaufen |
| `revoked` | Mitgliedschaft durch Organisation entzogen |
| `left` | Benutzer hat die Organisation selbst verlassen |
| `archived` | Historisch erhalten, keine Wirksamkeit mehr |

Übergänge:

```
pending ──→ active (Einladung angenommen)
pending ──→ revoked (Einladung zurückgezogen)
active ──→ paused ──→ active
active ──→ revoked
active ──→ left
active ──→ expired (bei Fristablauf)
revoked / left / expired ──→ archived
```

### 5.5 Aktiver Kontext

Nach dem Login wählt ein Benutzer mit mehreren aktiven Mitgliedschaften einen aktiven Kontext. Der aktive Kontext bestimmt:

- Welche Organisation gerade aktiv ist
- Welche Rollen gelten
- Welche Module zur Verfügung stehen
- Welche Daten sichtbar sind

Der Wechsel des aktiven Kontexts erfordert keinen erneuten Login. Der persönliche Bereich ist immer verfügbar, unabhängig vom aktiven Kontext.

### 5.6 Eindeutigkeit

Ein Benutzer kann in einer Organisation immer nur eine aktive Mitgliedschaft haben. Historische (archivierte) Mitgliedschaften bleiben erhalten, zählen aber nicht als aktive Mitgliedschaft.

---

## Kapitel 6 — Rollenmodell

### 6.1 Grundprinzip

Rollen beschreiben die Funktion eines Benutzers innerhalb einer Mitgliedschaft. Sie sind immer kontextgebunden — eine Rolle gilt nur innerhalb der Mitgliedschaft, durch die sie vergeben wurde.

Rollen tragen in dieser Spezifikation noch keine konkreten Berechtigungen. Das ist Aufgabe von NW-ROLE-001.

### 6.2 Grundrollen

| Rolle | Code | Beschreibung |
|-------|------|--------------|
| **Mitglied** | `member` | Basisrolle — jeder aktive Teilnehmer einer Organisation |
| **Manager** | `manager` | Kann Mitglieder einladen, Mitgliedschaften verwalten und Rollen innerhalb seiner Zuständigkeit vergeben |
| **Organisationsverantwortlicher** | `org_owner` | Vollständige Kontrolle über die Organisation — kann alle Mitgliedschaften und Rollen verwalten |

### 6.3 Mehrfachrollen

Ein Benutzer kann innerhalb einer Mitgliedschaft mehrere Rollen gleichzeitig tragen. Beispiel: Ein Benutzer ist sowohl `member` (für seine eigene Nutzung) als auch `manager` (für die Verwaltung einer Untergruppe).

Mehrfachrollen werden additiv ausgewertet — die weitreichendste Berechtigung gilt.

### 6.4 Rollenübertragung

- Die Rolle `org_owner` kann von genau einer Person gehalten werden oder bewusst auf mehrere verteilt werden — je nach Konfiguration der Organisation.
- Rollen können innerhalb der Berechtigungsgrenzen delegiert werden.
- Keine Rolle kann über die eigene Rollenstufe hinaus vergeben werden.

### 6.5 Rollenende

Wenn eine Mitgliedschaft endet (status: left, revoked, expired), erlöschen alle damit verbundenen Rollen automatisch und sofort. Keine manuelle Bereinigung erforderlich.

---

## Kapitel 7 — Authentifizierung

### 7.1 Grundsatz

Authentifizierung ist der Prozess, durch den eine Identität technisch bestätigt wird. Er ist getrennt von Autorisierung (Was darf jemand?) und Identitätsverwaltung (Wer ist jemand?).

Diese Spezifikation beschreibt die Authentifizierungsflüsse auf fachlicher Ebene. Konkrete Protokolle (OAuth 2.0, OIDC, SAML) und Bibliotheken folgen in Implementierungsdokumenten.

### 7.2 Login

Der Login-Prozess bestätigt, dass der Benutzer derjenige ist, der er behauptet zu sein.

Mindeststufen:
1. Identifikator (E-Mail-Adresse)
2. Geheimnis (Passwort) oder externer Provider-Token
3. Optional: zweiter Faktor (MFA)

Nach erfolgreichem Login wird eine Sitzung eröffnet. Die Sitzung enthält den Benutzerkontext (Kapitel 8).

### 7.3 Registrierung

Die Registrierung legt eine neue Identität an. Pflichtschritte:

1. E-Mail-Adresse eingeben
2. Passwort wählen (Mindestkomplexität nach Implementierungsrichtlinie)
3. E-Mail-Verifizierung durchführen
4. Anzeigenamen wählen

Nach Abschluss: Status `active`, `email_verified = true`. Persönlicher Bereich wird automatisch angelegt.

### 7.4 Passwort vergessen

1. Benutzer gibt seine E-Mail-Adresse an
2. Wenn die Adresse im System bekannt ist, wird ein zeitlich begrenzter Reset-Link gesendet
3. Der Link ist einmalig verwendbar
4. Neues Passwort muss Mindestkomplexität erfüllen
5. Alle aktiven Sitzungen werden nach Passwortreset beendet

**Sicherheitsprinzip:** Die Plattform gibt niemals zurück, ob eine E-Mail-Adresse registriert ist — die Antwort lautet immer „Wenn die Adresse bekannt ist, erhältst du eine E-Mail." (Schutz vor E-Mail-Enumeration)

### 7.5 E-Mail-Verifizierung

Jede neu registrierte E-Mail-Adresse muss verifiziert werden, bevor vollständige Funktionalität freigeschaltet wird.

- Verifizierungslink ist zeitlich begrenzt (Dauer: Implementierungsrichtlinie)
- Unverifizierte Konten haben eingeschränkten Zugriff
- Neue E-Mail-Adressen (bei Adressänderung) erfordern erneute Verifizierung

### 7.6 MFA-Vorbereitung

Das Modell ist für Multi-Faktor-Authentifizierung vorbereitet. Unterstützte Faktoren (Implementierung folgt):

- TOTP (zeitbasierte Einmalpasswörter, z. B. Authenticator-App)
- E-Mail-OTP (Code per E-Mail)
- SMS-OTP (Code per SMS — optionale Implementierung)
- Hardware-Token (FIDO2/WebAuthn — für zukünftige Phase)

MFA ist optional für Benutzer, kann aber von Organisationen für ihre Mitglieder verpflichtend gesetzt werden.

### 7.7 Externe Identity Provider

Die Plattform unterstützt externe Anbieter für Login ohne eigenes Passwort.

Anforderungen an externe Provider:
- Standardkonformes Protokoll (OAuth 2.0 / OIDC)
- Rückgabe einer verifizierten E-Mail-Adresse
- Keine automatische Kontenanlage bei fehlendem Konto (opt-in erforderlich)

Externe Provider ersetzen das Passwort, nicht die Identität. Wenn ein Benutzer mit einem externen Provider einloggt, wird seine bestehende NeuroWays-Identität verknüpft — keine neue Identität entsteht.

---

## Kapitel 8 — Benutzerkontext

### 8.1 Definition

Der Benutzerkontext ist der vollständige, ausgewertete Zustand, der nach einem erfolgreichen Login und einer Kontextwahl vorliegt. Er beantwortet die vier Grundfragen der Plattform.

### 8.2 Die vier Grundfragen

**Frage 1: Wer bin ich?**

→ Identität des Benutzers: `user_id`, `display_name`, `email`, `preferred_language`, `status`

**Frage 2: Welche Organisation ist aktiv?**

→ Aktive Mitgliedschaft: `org_id`, `org_name`, Mitgliedschaftsstatus

**Frage 3: Welche Rollen gelten?**

→ Rollenliste der aktiven Mitgliedschaft: z. B. `[member, manager]`

**Frage 4: Welche Module stehen zur Verfügung?**

→ Wird berechnet aus: aktiver Organisation + Rollen + Modulkonfiguration der Organisation

Die Antwort auf Frage 4 ist nicht Bestandteil dieser Spezifikation. Sie folgt in NW-MODULE-001.

### 8.3 Kontextwechsel

Wenn ein Benutzer mehrere aktive Mitgliedschaften hat, kann er den aktiven Kontext jederzeit wechseln. Nach dem Wechsel:

- Alle vier Grundfragen werden neu ausgewertet
- Die sichtbaren Daten wechseln in den neuen organisatorischen Kontext
- Persönliche Daten (eigene Check-ins im persönlichen Bereich) bleiben immer zugänglich

### 8.4 Sitzungsmodell

Eine Sitzung beginnt nach erfolgreichem Login und endet durch:

- Aktives Abmelden
- Ablauf der Sitzungsdauer (Implementierungsrichtlinie)
- Passwortreset
- Sperrung des Kontos
- Sperrung der Organisation

Sitzungen sind an Geräte gebunden. Ein Benutzer kann mehrere gleichzeitige Sitzungen auf verschiedenen Geräten haben.

---

## Kapitel 9 — Abgrenzung

Die folgenden Themen sind ausdrücklich nicht Bestandteil dieser Spezifikation. Sie folgen in separaten Dokumenten.

| Thema | Dokument |
|-------|---------|
| **Berechtigungen** — Was darf eine Rolle konkret tun? | NW-ROLE-001 |
| **Datenschutz** — Welche Daten werden wie lange gespeichert? | NW-CONSENT-001 |
| **Freigaben** — Explizite Einwilligungen für Datennutzung | NW-CONSENT-001 |
| **Dashboard** — Welche Inhalte sieht ein Benutzer nach dem Login? | NW-DASH-001 |
| **Module** — Welche Funktionen sind für welche Rollen verfügbar? | NW-MODULE-001 |
| **Knowledge Assets** — Fachliche Wissensobjekte | NW-KAS-001 |
| **Methoden** — Konkrete NeuroWays-Fachmethoden | Methodenspezifikationen |
| **NeuroPlay, NeuroFlow, Flowisaurus** | Modulspezifikationen |
| **Abrechnung und Lizenzen** | Separate Plattformspezifikation |

---

## Kapitel 10 — Beziehungen

### 10.1 Beziehungsmodell (fachlich)

```
USER (Benutzer)
│
├── hat genau eine IDENTITÄT (die USER selbst ist)
│
├── hat genau einen PERSÖNLICHEN BEREICH (automatisch, immer)
│
└── hat 0..n MITGLIEDSCHAFTEN
        │
        ├── jede MITGLIEDSCHAFT gehört zu genau einer ORGANISATION
        │
        ├── jede MITGLIEDSCHAFT hat 0..n ROLLEN
        │        (member, manager, org_owner)
        │
        └── eine MITGLIEDSCHAFT ist zu einem Zeitpunkt der AKTIVE KONTEXT


ORGANISATION
│
├── hat 0..n MITGLIEDSCHAFTEN (ihre Mitglieder)
│
└── hat genau einen ORGANISATIONSVERANTWORTLICHEN
        (mindestens eine aktive Mitgliedschaft mit Rolle org_owner)
```

### 10.2 Kardinalitäten

| Beziehung | Kardinalität | Anmerkung |
|-----------|-------------|-----------|
| User → Mitgliedschaft | 0..n | Benutzer ohne Mitgliedschaft nutzen persönlichen Bereich |
| Mitgliedschaft → User | 1..1 | Jede Mitgliedschaft gehört genau einem Benutzer |
| Mitgliedschaft → Organisation | 1..1 | Jede Mitgliedschaft gehört genau einer Organisation |
| Organisation → Mitgliedschaft | 0..n | Eine Organisation kann keine oder viele Mitglieder haben |
| User → aktiver Kontext | 0..1 | Nach Login: genau einer, davor: keiner |
| Mitgliedschaft → Rollen | 0..n | Auch ohne explizite Rolle: implizit `member` |

### 10.3 Regeln

- Eine Mitgliedschaft ohne Benutzer ist technisch ungültig
- Eine Organisation ohne `org_owner` ist eine Übergangssituation — muss aufgelöst werden
- Ein Benutzer mit Status `deleted` darf keine aktiven Mitgliedschaften mehr haben
- Rollen ohne Mitgliedschaft existieren nicht

---

## Kapitel 11 — Roadmap

Diese Spezifikation bildet die Grundlage für den folgenden Aufbau der NeuroWays-Plattform. Die empfohlene Entwicklungsreihenfolge folgt dem Abhängigkeitsprinzip.

```
NW-IDENTITY-001 (diese Spezifikation) ← ABGESCHLOSSEN (draft)
│
├── NW-ROLE-001 — Rollen & Berechtigungen
│     Was darf wer konkret in welchem Kontext?
│     Abhängig von: NW-IDENTITY-001
│
├── NW-CONSENT-001 — Datenschutz & Einwilligung
│     Welche Daten werden wie lange gespeichert? Welche Freigaben gibt es?
│     Abhängig von: NW-IDENTITY-001
│
├── NW-DASH-001 — Dashboard Specification
│     Welche Inhalte sieht wer nach dem Login?
│     Abhängig von: NW-IDENTITY-001, NW-ROLE-001
│
├── NW-MODULE-001 — Modulverfügbarkeit
│     Welche Module stehen für welche Rollen/Organisationen zur Verfügung?
│     Abhängig von: NW-IDENTITY-001, NW-ROLE-001
│
├── NeuroPlay / NeuroFlow / Flowisaurus
│     Alle Module setzen NW-IDENTITY-001 voraus
│     Abhängig von: NW-IDENTITY-001, NW-MODULE-001
│
└── Knowledge Asset System (NW-KAS-001)
      Wissensobjekte benötigen Owner-Referenzen aus NW-IDENTITY-001
      Für organisationsübergreifende Assets: NW-ROLE-001 erforderlich
```

---

## Kapitel 12 — Kritische Selbstbewertung

### Stärken

- Klare Trennung der fünf Kernbegriffe: Identität, Mitgliedschaft, Rolle, Berechtigung, Datenschutzfreigabe
- Neutrales Organisationsmodell — keine Einschränkung auf Unternehmenstypen
- Persönlicher Bereich als implizite Organisation löst den Privatnutzer-Fall elegant
- Rollenmodell ist erweiterbar, ohne diese Spezifikation zu ändern
- Authentifizierungsflüsse sind vollständig beschrieben ohne Technologiebindung
- Abgrenzung zu Berechtigungen und Datenschutz ist präzise

### Dokumentierte Lücken

**1. Gastnutzung ohne Konto ist nicht definiert**
Die Spezifikation setzt voraus, dass jeder Benutzer eine registrierte Identität hat. Wenn NeuroWays in Zukunft öffentliche Inhalte ohne Login anbietet, fehlt das Modell für anonyme oder Gastzugänge. → NW-IDENTITY-001 v1.1.0.

**2. Einladungsmodell ist beschrieben aber nicht vollständig spezifiziert**
Das Einladungsfeld `invitation_code` ist erwähnt, aber der vollständige Einladungsfluss (Ablaufdaten, mehrfache Nutzung, öffentliche Links) ist nicht definiert. → Implementierungsdokument oder NW-IDENTITY-001 v1.1.0.

**3. Konten-Zusammenführung nicht beschrieben**
Was passiert, wenn jemand zwei Konten angelegt hat (z. B. einmal mit E-Mail, einmal über externen Provider, mit verschiedenen Adressen)? Das Merge-Modell fehlt. → NW-IDENTITY-001 v1.1.0.

**4. Keine Aussage zu Datenhaltung bei Kontoauflösung**
Kapitel 3.4 beschreibt den Status `archived` als „Daten anonymisiert". Die genauen Regeln — was anonymisiert wird, was gelöscht wird, was aggregiert erhalten bleibt — sind nicht definiert. → NW-CONSENT-001.

**5. Sitzungsdauer und Token-Verwaltung offen**
Sitzungsdauer, Refresh-Tokens, simultane Sitzungen pro Gerät — alles Implementierungsdetails, die aber auf fachlicher Ebene Grenzen brauchen (z. B. „maximale Inaktivitätsdauer"). → Sicherheitsrichtlinie oder NW-IDENTITY-001 v1.1.0.

### Gesamtbewertung

**Diese Spezifikation ist ausreichend, damit alle zukünftigen NeuroWays-Komponenten dieselbe Identitätsschicht verwenden können.**

Die fünf Kernbegriffe sind klar definiert und trennscharf. Das Organisationsmodell ist neutral und skaliert. Das Mitgliedschaftsmodell ist vollständig. Das Rollenmodell ist erweiterbar.

Die fünf dokumentierten Lücken betreffen Randfälle und Implementierungsdetails — sie blockieren nicht den Aufbau der nächsten Plattformschicht. NW-ROLE-001 und NW-CONSENT-001 können unmittelbar auf dieser Grundlage entwickelt werden.

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Identität** | Die unveränderliche, kontextfreie Grundlage eines Benutzers in der Plattform |
| **Mitgliedschaft** | Die formale, zeitlich begrenzte Verbindung zwischen einer Identität und einer Organisation |
| **Rolle** | Die Funktion eines Benutzers innerhalb einer Mitgliedschaft — immer kontextgebunden |
| **Berechtigung** | Was jemand in einem bestimmten Kontext tun darf — berechnet, nicht gespeichert |
| **Datenschutzfreigabe** | Die explizite, informierte Einwilligung zur Nutzung personenbezogener Daten |
| **Aktiver Kontext** | Die zum Zeitpunkt einer Sitzung ausgewählte aktive Mitgliedschaft und Organisation |
| **Persönlicher Bereich** | Die implizite Einzelnutzer-Organisation eines jeden Benutzers — immer vorhanden |
| **Sitzung** | Ein authentifizierter, zeitlich begrenzter Zugriffszustand |

---

## Ausnahmen

Keine Ausnahmen bei Erstfassung.

---

## Qualitätsprüfung

| Kriterium | Bestanden |
|-----------|-----------|
| Alle 12 Kapitel vorhanden und vollständig ausformuliert | ✅ |
| Fünf Kernbegriffe klar und trennscharf definiert | ✅ |
| Kein Datenbankschema, keine SQL, keine Implementierung | ✅ |
| Technologieunabhängig formuliert | ✅ |
| Beziehungen fachlich beschrieben (keine Tabellen) | ✅ |
| Abgrenzung zu NW-ROLE-001, NW-CONSENT-001 etc. klar | ✅ |
| Kritische Selbstbewertung mit Lücken | ✅ |
| Roadmap beschreibt Abhängigkeiten | ✅ |

---

*NW-IDENTITY-001 — NeuroWays Identity & Membership Specification v1.0.0 — Status: draft — zur Prüfung vorgelegt — 2026-07-23*
