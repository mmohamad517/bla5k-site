/**
 * 7,939 of 8,142 tool pages carry this exact `notFor[0]` string, verbatim,
 * from the original bulk-generation pass — the same signal that marks their
 * `example` field, FAQ answers, and markdown body as templated filler with
 * only the tool name swapped in. One reliable field to check rather than
 * pattern-matching prose in five different places.
 */
const GENERIC_NOTFOR_0 = 'You need the absolute best specialist for a highly niche format';

/** True for a bulk-generated page whose body/FAQs/notFor are templated filler. */
export function isGenericToolPage(notFor: string[] | undefined): boolean {
  return notFor?.[0] === GENERIC_NOTFOR_0;
}
