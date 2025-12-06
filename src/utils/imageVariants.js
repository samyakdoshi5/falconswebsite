// src/utils/imageVariants.js
const PUBLIC = process.env.PUBLIC_URL || '';

/**
 * deriveVariants('/images/all/Vidhyut-Flight.jpg')
 * -> {
 *    thumb: '/images/all/thumbs/Vidhyut-Flight-thumb.jpg',
 *    jpg_400: '/images/all/Vidhyut-Flight-400.jpg',
 *    jpg_800: '/images/all/Vidhyut-Flight-800.jpg',
 *    jpg_1600: '/images/all/Vidhyut-Flight-1600.jpg',
 *    webp_400: '/images/all/Vidhyut-Flight-400.webp',
 *    webp_800: '/images/all/Vidhyut-Flight-800.webp',
 *    webp_1600: '/images/all/Vidhyut-Flight-1600.webp',
 *    full: '/images/all/Vidhyut-Flight.jpg'
 * }
 */
export function deriveVariants(originalPath) {
    if (!originalPath) return null;
    // strip querystring/hash if present
    const clean = originalPath.split('?')[0].split('#')[0];
    const extMatch = clean.match(/\.(jpg|jpeg|png)$/i);
    if (!extMatch) {
        return { full: clean }; // unknown extension: just return full
    }
    const ext = extMatch[0];
    const base = clean.slice(0, -ext.length); // remove extension
    return {
        thumb: `${base}-thumb.jpg`.replace(PUBLIC, PUBLIC),
        jpg_400: `${base}-400.jpg`.replace(PUBLIC, PUBLIC),
        jpg_800: `${base}-800.jpg`.replace(PUBLIC, PUBLIC),
        jpg_1600: `${base}-1600.jpg`.replace(PUBLIC, PUBLIC),
        webp_400: `${base}-400.webp`.replace(PUBLIC, PUBLIC),
        webp_800: `${base}-800.webp`.replace(PUBLIC, PUBLIC),
        webp_1600: `${base}-1600.webp`.replace(PUBLIC, PUBLIC),
        full: clean
    };
}
