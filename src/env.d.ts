interface ImportMetaEnv {
  /** Public origin of the deployed site, e.g. https://example.com (see constants/site.ts). */
  readonly VITE_SITE_URL?: string;
  /** Google Search Console HTML-tag verification token (optional). */
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  /** Bing Webmaster Tools HTML-tag verification token (optional). */
  readonly VITE_BING_SITE_VERIFICATION?: string;
}
