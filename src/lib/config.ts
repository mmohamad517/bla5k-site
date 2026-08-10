/**
 * Shared site configuration.
 *
 * Web3Forms powers BOTH the newsletter box (Subscribe.astro), the footer
 * subscribe form (Footer.astro) and the submit-a-tool form (SuggestToolForm.astro).
 * Get a free access key at https://web3forms.com and paste it HERE — one place
 * activates them all. Until a real key is set, the forms stay hidden so nothing
 * broken ever goes live.
 */
export const WEB3FORMS_KEY = 'd7996d33-68a6-4fef-8c95-f2af75fbc103';

/** True once a real key has been configured. */
export const web3FormsReady = WEB3FORMS_KEY && !WEB3FORMS_KEY.startsWith('YOUR_');
