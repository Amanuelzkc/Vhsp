import React, { useState, useEffect } from 'react';
import './vhs.css'; 

const VhsWrapper = ({ children }) => {
    const [isGlitching, setIsGlitching] = useState(false);

    // useEffect hook to handle the periodic glitch
    useEffect(() => {
        const interval = setInterval(() => {
            // 1. Activate the glitch state
            setIsGlitching(true);

            // 2. Deactivate the glitch state quickly after 50ms
            setTimeout(() => {
                setIsGlitching(false);
            }, 50);

            // 3. Set the interval for the next glitch (random time between 2s and 5s)
        }, Math.random() * 3000 + 2000);

        // Cleanup function for the interval
        return () => clearInterval(interval);
    }, []); 

    const glitchClass = isGlitching ? ' glitch-active' : '';

    return (
        <div className={`crt-monitor${glitchClass}`}>
            {/* The main content of the current page */}
            <div className="monitor-content">
                {children}
            </div>
            {/* The persistent scanlines overlay */}
            <div className="scanlines"></div>
        </div>
    );
};

export default VhsWrapper;