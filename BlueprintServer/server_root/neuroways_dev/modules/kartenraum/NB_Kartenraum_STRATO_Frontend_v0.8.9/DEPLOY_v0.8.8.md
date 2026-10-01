# Room of Cards v0.8.8

Profile-settings fix:
- separate `profile-settings.js`
- loaded after the settings overlay exists
- reads the same session token from `nb_kartenraum_frontend_v070`
- calls Backend v0.6.3 `profile-preferences.php` directly
- capture-phase events override obsolete experimental listeners in app.js
- exact API errors are shown in the settings dialog

No backend or DB changes.
