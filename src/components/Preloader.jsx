import React, { useEffect, useState, useRef } from "react";
import { AIRCRAFT_DATA, HERO_DATA, SPONSORS_LOGOS, TEAM_INFO, GALLERY_CATEGORIES } from "../data";

/**
 * Preloader
 */
export default function Preloader({
    assets = [
        TEAM_INFO.logo,
        TEAM_INFO.smalllogo,
        HERO_DATA.posterImage,
        TEAM_INFO.gif,
        HERO_DATA.posterImage,
        ...SPONSORS_LOGOS.map((s) => s.logoUrl),
        ...AIRCRAFT_DATA.map((a) => a.coverImage),
        ...GALLERY_CATEGORIES.flatMap((c) => c.images),
    ],
    timeoutMs = 10000,
    showProgress = false,
    spinnerSrc = TEAM_INFO.gif,
    minDisplayMs = 800, // minimum time spinner must be visible
    fadeOutMs = 300, // fade-out duration in ms
    children,
}) {
    // kept minimal: progress removed (showProgress currently unused)
    const [isDone, setIsDone] = useState(false);
    const [exiting, setExiting] = useState(false); // controls CSS fade

    // Two guards: assetsReady && minElapsed must both be true to finish
    const assetsReadyRef = useRef(false);
    const minElapsedRef = useRef(false);

    // track timers so we can clear them
    const timersRef = useRef(new Set());
    const exitStartedRef = useRef(false); // ensure exit only runs once

    useEffect(() => {
        // snapshot of timers reference for use throughout the effect & cleanup
        const timers = timersRef.current;

        // reset state and refs for each run
        setIsDone(false);
        setExiting(false);
        assetsReadyRef.current = false;
        minElapsedRef.current = false;
        exitStartedRef.current = false;

        // clear any leftover timers from previous run (defensive)
        for (const t of timers) clearTimeout(t);
        timers.clear();

        const assetsList = assets || [];

        let active = true;
        let settled = 0;
        const total = assetsList.length;

        // helper to initiate fade-out and final unmount
        const initiateExit = () => {
            if (!active) return;
            if (exitStartedRef.current) return; // already started
            exitStartedRef.current = true;
            setExiting(true);

            // after fadeOutMs, consider it done (unmount children)
            const exitTimer = setTimeout(() => {
                if (active) setIsDone(true);
                timers.delete(exitTimer);
            }, fadeOutMs);
            timers.add(exitTimer);
        };

        // start min timer always (so minElapsed will become true after minDisplayMs)
        const minTimer = setTimeout(() => {
            if (!active) return;
            minElapsedRef.current = true;
            // if assets are already ready, begin exit (so fade will play)
            if (assetsReadyRef.current) initiateExit();
            timers.delete(minTimer);
        }, minDisplayMs);
        timers.add(minTimer);

        // helper to finish when both guards are true
        const tryFinishIfReady = () => {
            if (!active) return;
            if (assetsReadyRef.current && minElapsedRef.current) {
                initiateExit();
            }
        };

        // If there are no assets, mark assetsReady but still wait for minElapsed
        if (total === 0) {
            assetsReadyRef.current = true;
            // Also start a timeout guard so that we don't hang indefinitely
            const guard = setTimeout(() => {
                if (!active) return;
                tryFinishIfReady();
                timers.delete(guard);
            }, timeoutMs);
            timers.add(guard);

            return () => {
                active = false;
                for (const t of timers) clearTimeout(t);
                timers.clear();
            };
        }

        // timeout guard for asset loading
        const timeoutHandle = setTimeout(() => {
            if (!active) return;
            // consider ready so we don't hang
            assetsReadyRef.current = true;
            tryFinishIfReady();
            timers.delete(timeoutHandle);
        }, timeoutMs);
        timers.add(timeoutHandle);

        const markOne = () => {
            if (!active) return;
            settled += 1;

            if (settled >= total) {
                assetsReadyRef.current = true;
                // clear the timeout guard since everything loaded
                if (timers.has(timeoutHandle)) {
                    clearTimeout(timeoutHandle);
                    timers.delete(timeoutHandle);
                }
                // slight throttle to avoid ultra-fast flicker, then try finish
                const t = setTimeout(() => {
                    if (!active) return;
                    tryFinishIfReady();
                    timers.delete(t);
                }, 120);
                timers.add(t);
            }
        };

        assetsList.forEach((src) => {
            try {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = src;

                if (img.decode) {
                    img.decode().then(markOne).catch(markOne);
                } else {
                    img.onload = markOne;
                    img.onerror = markOne;
                }
            } catch (e) {
                markOne();
            }
        });

        return () => {
            active = false;
            for (const t of timers) clearTimeout(t);
            timers.clear();
        };
    }, [assets, timeoutMs, minDisplayMs, fadeOutMs]);

    if (isDone) return <>{children}</>;

    // overlay styles: we use transitionOpacity + inline duration so Tailwind not required for dynamic ms
    const overlayStyle = {
        transitionProperty: "opacity",
        transitionDuration: `${fadeOutMs}ms`,
    };

    return (
        <div
            aria-busy="true"
            aria-live="polite"
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-tech-900 text-white ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            style={overlayStyle}
        >
            <div className="flex flex-col items-center gap-4 p-6">
                <img
                    src={spinnerSrc}
                    alt="Loading..."
                    className="w-60 h-60 object-contain"
                    onError={(e) => {
                        // defensive fallback if spinner fails to load
                        try {
                            const img = e?.target;
                            if (img && typeof img === "object") {
                                // @ts-ignore
                                img.onerror = null;
                                // @ts-ignore
                                img.src =
                                    "data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='24' cy='24' r='20' stroke='%2360A5FA' stroke-width='4' stroke-linecap='round' stroke-dasharray='31.4 31.4' stroke-dashoffset='0'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' from='0 24 24' to='360 24 24'/%3E%3C/circle%3E%3C/svg%3E";
                            }
                        } catch (err) {
                            // swallow
                        }
                    }}
                />
            </div>
        </div>
    );
}
