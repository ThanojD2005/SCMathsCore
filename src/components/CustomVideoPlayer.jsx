import React, { useRef, useEffect } from 'react';
import 'youtube-video-element';
import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaVolumeRange,
    MediaPlaybackRateButton,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
    MediaFullscreenButton,
} from "media-chrome/react";

const CustomVideoPlayer = ({ url, title }) => {
    const playerContainerRef = useRef(null);
    const videoRef = useRef(null);

    // Dynamic sourcing from props
    const videoSource = (url || "").trim();

    // Set source via ref to avoid it showing in static HTML attribute for minor obfuscation
    useEffect(() => {
        if (videoRef.current && videoSource) {
            videoRef.current.src = videoSource;
        }
    }, [videoSource]);

    const handleClick = (event) => {
        console.log('Left click detected!', event.button);
    };

    return (
        <div
            id="videoPlayerContainer"
            onClick={handleClick}
            onContextMenu={(e) => e.preventDefault()}
            ref={playerContainerRef}
            className="video-player-container position-relative overflow-hidden bg-black rounded-3 shadow-lg"
            style={{
                width: '100%',
                aspectRatio: '16/9',
            }}
        >
            <MediaController
                style={{
                    width: "100%",
                    height: "100%",
                    "--media-primary-color": "#0d6efd",
                    "--media-range-track-height": "4px",
                }}
            >
                {/* youtube-video implements the HTMLMediaElement API */}
                <youtube-video
                    id="youtube-video"
                    ref={videoRef}
                    slot="media"
                    // src set via ref in useEffect
                    playsInline
                    crossOrigin="anonymous"
                />
                <MediaControlBar>
                    <MediaPlayButton />
                    <MediaSeekBackwardButton seekOffset={10} />
                    <MediaSeekForwardButton seekOffset={10} />
                    <MediaTimeRange />
                    <MediaTimeDisplay showDuration />
                    <MediaMuteButton />
                    <MediaVolumeRange />
                    <MediaPlaybackRateButton />
                    <MediaFullscreenButton />
                </MediaControlBar>
            </MediaController>

            <style>{`
                .video-player-container {
                    background-color: #000;
                }
                #youtube-video {
                    pointer-events: none;
                }
                /* Optional: Customize Media Chrome aesthetics */
                media-controller {
                    font-family: inherit;
                }
            `}</style>
        </div>
    );
};

export default CustomVideoPlayer;
