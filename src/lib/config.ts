/**
 * Shared site configuration.
 *
 * Web3Forms powers BOTH the newsletter box (Subscribe.astro) and the
 * submit-a-tool form (SuggestToolForm.astro). Get a free access key at
 * https://web3forms.com and paste it HERE — one place activates both.
 * Until a real key is set, both forms stay hidden so nothing broken
 * ever goes live.
 */
export const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

/** True once a real key has been configured. */
export const web3FormsReady = WEB3FORMS_KEY && !WEB3FORMS_KEY.startsWith('YOUR_');
