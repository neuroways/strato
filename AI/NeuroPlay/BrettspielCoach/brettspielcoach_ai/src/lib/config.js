// Configuration for STRATO deployment
// Production domain (live website)
const PROD_DOMAIN = 'https://sfs-05zwnczjvysr.live-website.com';

// Development domain (preview/testing)
const DEV_DOMAIN = 'https://aibuilder-514nc.preview.ai-builder.strato.de';

// Auto-detect current environment
const getEnvironmentDomain = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // If on dev domain, use dev domain, otherwise use prod
    if (hostname.includes('preview.ai-builder.strato.de')) {
      return DEV_DOMAIN;
    }
    return PROD_DOMAIN;
  }
  return PROD_DOMAIN;
};

export const getApiEndpoint = () => {
  // Determine if we're in production or development environment
  if (typeof window !== 'undefined') {
    const domain = getEnvironmentDomain();
    const isProduction = window.location.pathname.includes('/.sfs-be/');
    const endpoint = isProduction ? '/.sfs-be/api' : '/.sfs-bd/api';
    return `${domain}${endpoint}`;
  }
  return `${PROD_DOMAIN}/.sfs-bd/api`;
};

export const getDevEndpoint = () => {
  const domain = getEnvironmentDomain();
  return `${domain}/.sfs-bd/api`;
};

export const getProdEndpoint = () => {
  const domain = getEnvironmentDomain();
  return `${domain}/.sfs-be/api`;
};
