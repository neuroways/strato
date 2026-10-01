import PocketBase from 'pocketbase';

// PocketBase configuration for STRATO
const getPBUrl = () => {
  // Your STRATO domain
  const DOMAIN = 'https://sfs-05zwnczjvysr.live-website.com';
  
  // Browser environment
  if (typeof window !== 'undefined') {
    // STRATO dev/prod auto-discovery
    if (window.location.pathname.includes('/.sfs-')) {
      // Already at PocketBase admin
      return window.location.origin;
    }
    // App is on same domain, PocketBase at /.sfs-bd/ or /.sfs-be/
    return DOMAIN;
  }
  return DOMAIN;
};

export const pb = new PocketBase(getPBUrl());
