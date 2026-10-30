/**
 * Her canonical address, in one place.
 *
 * www, not the apex: the apex has redirected to www since before this build
 * existed, so www is what is linked to and what search engines already hold.
 * The new site keeps that rather than quietly moving the canonical host.
 *
 * Hardcoded on purpose. An environment-variable version of this idea was
 * tried across these repos and reverted — see the note in next.config.ts —
 * because a missing variable failed in the direction that hurts the client.
 */
export const SITE_URL = "https://www.austinwomenscounseling.com";
