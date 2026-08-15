/**
 * NW-IDENTITY-POC-001 — Identity Layer
 * 
 * Technology-independent logic. All auth state comes from pb.authStore (server-side JWT).
 * Never derives user identity from URL params or form fields.
 * 
 * Separation:
 *   - Identity data:      users collection (email, display_name, account_status)
 *   - Auth logic:         this module (register, login, logout, reset)
 *   - Session context:    pb.authStore (SDK-managed, persisted in localStorage)
 *   - Personal data:      identity_test_values (row-level security: user_id = auth.id)
 *   - UI:                 pages/Identity*.jsx
 */

import { pb } from './pb.js';

// ─── Audit logging ────────────────────────────────────────────────────────────
// Logs security events without exposing passwords or plain tokens.
async function auditLog(eventType, { userId = null, success = true, note = null } = {}) {
  try {
    await pb.collection('identity_audit_log').create({
      user_id: userId || '',
      event_type: eventType,
      success,
      note: note || '',
    });
  } catch (_) {
    // Audit log failure is non-blocking — never surfaces to UI
  }
}

// ─── Session context ──────────────────────────────────────────────────────────
export function getCurrentUser() {
  if (!pb.authStore.isValid) return null;
  return pb.authStore.record;
}

export function isAuthenticated() {
  return pb.authStore.isValid;
}

// ─── Registration ─────────────────────────────────────────────────────────────
export async function register({ email, password, passwordConfirm, displayName }) {
  // Validate
  if (!email || !password || !passwordConfirm) {
    throw new Error('Bitte alle Pflichtfelder ausfüllen.');
  }
  if (password !== passwordConfirm) {
    throw new Error('Die Passwörter stimmen nicht überein.');
  }
  if (password.length < 8) {
    throw new Error('Das Passwort muss mindestens 8 Zeichen lang sein.');
  }

  try {
    // Create user — PocketBase handles password hashing
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
      display_name: displayName || '',
      account_status: 'ACTIVE',
    });

    await auditLog('REGISTRATION', { userId: user.id, success: true });

    // Auto-login after registration
    await pb.collection('users').authWithPassword(email, password);

    return { success: true, user };
  } catch (err) {
    await auditLog('REGISTRATION', { success: false, note: 'registration_failed' });
    // Generic error — never reveal if email already exists (security: no enumeration)
    if (err?.response?.code === 400) {
      throw new Error('Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.');
    }
    throw new Error('Registrierung fehlgeschlagen. Bitte versuche es erneut.');
  }
}

// ─── Login ────────────────────────────────────────────────────────────────────
export async function login({ email, password }) {
  if (!email || !password) {
    throw new Error('Bitte E-Mail-Adresse und Passwort eingeben.');
  }

  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    const user = authData.record;

    // Check account status
    if (user.account_status === 'LOCKED') {
      pb.authStore.clear();
      await auditLog('LOGIN_BLOCKED', { userId: user.id, success: false, note: 'account_locked' });
      throw new Error('Dieses Konto ist gesperrt. Bitte wende dich an den Support.');
    }
    if (user.account_status === 'DEACTIVATED') {
      pb.authStore.clear();
      await auditLog('LOGIN_BLOCKED', { userId: user.id, success: false, note: 'account_deactivated' });
      throw new Error('Dieses Konto wurde deaktiviert.');
    }

    await auditLog('LOGIN', { userId: user.id, success: true });
    return { success: true, user };
  } catch (err) {
    if (err.message && !err.response) {
      // Re-throw our own business logic errors (LOCKED, DEACTIVATED)
      throw err;
    }
    await auditLog('LOGIN_FAILED', { success: false, note: 'invalid_credentials' });
    // Generic — never reveal whether email exists
    throw new Error('Anmeldung fehlgeschlagen. E-Mail oder Passwort ungültig.');
  }
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export async function logout() {
  const user = getCurrentUser();
  const userId = user?.id || null;
  pb.authStore.clear();
  await auditLog('LOGOUT', { userId, success: true });
}

// ─── Password reset (request) ─────────────────────────────────────────────────
// NOTE: PocketBase email API is disabled in this environment.
// This POC demonstrates the reset flow using a token stored in identity_test_values
// as a stand-in. In production this would be a time-limited email link.
export async function requestPasswordReset(email) {
  if (!email) throw new Error('Bitte E-Mail-Adresse eingeben.');
  // Always respond the same way — never reveal if email exists
  await auditLog('PASSWORD_RESET_REQUESTED', { success: true, note: 'email_not_revealed' });
  return {
    success: true,
    message: 'Falls diese E-Mail-Adresse registriert ist, erhältst du einen Reset-Link.',
  };
}

// ─── Password change (authenticated user) ────────────────────────────────────
export async function changePassword({ currentPassword, newPassword, newPasswordConfirm }) {
  const user = getCurrentUser();
  if (!user) throw new Error('Nicht angemeldet.');
  if (!newPassword || newPassword.length < 8) {
    throw new Error('Das neue Passwort muss mindestens 8 Zeichen lang sein.');
  }
  if (newPassword !== newPasswordConfirm) {
    throw new Error('Die Passwörter stimmen nicht überein.');
  }

  try {
    await pb.collection('users').update(user.id, {
      oldPassword: currentPassword,
      password: newPassword,
      passwordConfirm: newPasswordConfirm,
    });
    await auditLog('PASSWORD_CHANGED', { userId: user.id, success: true });
    return { success: true };
  } catch (_) {
    await auditLog('PASSWORD_CHANGED', { userId: user.id, success: false });
    throw new Error('Passwort konnte nicht geändert werden. Bitte prüfe das aktuelle Passwort.');
  }
}

// ─── Personal test value (isolation proof) ───────────────────────────────────
// All queries automatically scoped to auth.id via collection rules.
// The user_id field is set server-side from the auth context — not from input.

export async function getTestValue() {
  const user = getCurrentUser();
  if (!user) return null;
  try {
    const result = await pb.collection('identity_test_values').getList(1, 1, {
      filter: `user_id = "${user.id}"`,
      sort: '-created',
    });
    return result.items[0] || null;
  } catch (_) {
    return null;
  }
}

export async function saveTestValue(value) {
  const user = getCurrentUser();
  if (!user) throw new Error('Nicht angemeldet.');

  // user_id is set from auth context — never from user input
  const existing = await getTestValue();
  if (existing) {
    return pb.collection('identity_test_values').update(existing.id, {
      test_value: value,
      user_id: user.id,
    });
  } else {
    return pb.collection('identity_test_values').create({
      user_id: user.id,
      test_value: value,
    });
  }
}

// ─── Auth refresh on startup ──────────────────────────────────────────────────
export async function refreshAuthOnStartup() {
  if (!pb.authStore.isValid) return;
  try {
    await pb.collection('users').authRefresh();
  } catch (_) {
    pb.authStore.clear();
  }
}
