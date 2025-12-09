const COOKIE_CONSENT_KEY = 'cookie-consent-v1';

export const hasCookieConsent = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(COOKIE_CONSENT_KEY) === 'true';
  } catch (e) {
    return false;
  }
};

export const setCookieConsent = (value = 'true') => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch (e) {
    // ignore
  }
};

export default hasCookieConsent;
