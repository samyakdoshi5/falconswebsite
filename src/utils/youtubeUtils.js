/**
 * YouTube Utilities - Extract video ID and generate thumbnail URLs
 */

/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 */
export const extractYoutubeId = (url) => {
    if (!url) return null;

    try {
        // youtu.be/ID format
        if (url.includes('youtu.be/')) {
            const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
            if (match) return match[1];
        }

        // youtube.com/watch?v=ID format
        if (url.includes('youtube.com/watch')) {
            const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
            if (match) return match[1];
        }

        // youtube.com/embed/ID format
        if (url.includes('youtube.com/embed/')) {
            const match = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
            if (match) return match[1];
        }

        // If it's already just an ID (11 characters, alphanumeric + _ -)
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
            return url;
        }
    } catch (e) {
        // Silently handle error
    }

    return null;
};

/**
 * Get YouTube video thumbnail URL
 * Quality options: 'maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'
 */
export const getYoutubeThumbnail = (videoId, quality = 'maxresdefault') => {
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Check if a URL is a YouTube URL
 */
export const isYoutubeUrl = (url) => {
    if (typeof url !== 'string') return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
};

/**
 * Check if an item is a video (YouTube URL)
 */
export const isVideo = (item) => {
    if (typeof item === 'string') {
        return isYoutubeUrl(item);
    }
    return false;
};

/**
 * Get embed URL for iframe
 */
export const getEmbedUrl = (videoId) => {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?rel=0`;
};
