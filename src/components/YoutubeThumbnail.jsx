import React, { useState, useEffect } from 'react';
import { getYoutubeThumbnailUrls } from '../utils/youtubeUtils';

/**
 * YouTube Thumbnail Component with automatic fallback
 * Tries maxresdefault → sddefault → hqdefault → mqdefault → default
 */
const YoutubeThumbnail = ({
    videoId,
    alt = '',
    className = '',
    style = {},
    onLoad,
    onError,
    ...props
}) => {
    const [currentUrl, setCurrentUrl] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!videoId) return;

        const urls = getYoutubeThumbnailUrls(videoId);
        let currentIndex = 0;

        const tryNextUrl = () => {
            if (currentIndex >= urls.length) {
                // All URLs failed, use the last one as fallback
                setCurrentUrl(urls[urls.length - 1]);
                return;
            }

            setCurrentUrl(urls[currentIndex]);
            currentIndex++;
        };

        // Start with the highest quality
        tryNextUrl();
    }, [videoId]);

    const handleImageError = () => {
        if (!videoId) return;

        const urls = getYoutubeThumbnailUrls(videoId);
        const currentIndex = urls.indexOf(currentUrl);

        if (currentIndex < urls.length - 1) {
            // Try the next lower quality
            setCurrentUrl(urls[currentIndex + 1]);
        }
        // If we're at the last URL, it stays as is (default quality always works)
    };

    const handleImageLoad = () => {
        setLoaded(true);
        onLoad?.();
    };

    if (!currentUrl) {
        return (
            <div
                className={`bg-gray-800 flex items-center justify-center ${className}`}
                style={style}
                {...props}
            >
                <div className="text-gray-400 text-sm">Loading...</div>
            </div>
        );
    }

    return (
        <img
            src={currentUrl}
            alt={alt}
            className={className}
            style={{
                ...style,
                transition: 'opacity 0.3s ease',
                opacity: loaded ? 1 : 0.7,
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            {...props}
        />
    );
};

export default YoutubeThumbnail;