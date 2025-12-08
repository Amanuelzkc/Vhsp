import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

/* -----------------------------
   Color & Data
   ----------------------------- */
const PRIMARY_ACCENT = '#FFF';
const SECONDARY_ACCENT = '#888';
const ERROR_COLOR = '#BBB';

const PROJECT_DATA = [
    // --- CATEGORIES ARE NOW ARRAYS ---
    { 
        id: "001", 
        title: "Awach Rebranding Ad", 
        format: ".MOV", 
        duration: "00:00:20", 
        category: ["ADVERTISEMENT"], 
        embedUrl: "https://www.youtube.com/embed/1kqJgLus3NY",
        client: "Awach Bank", // NEW FIELD
        date: "2023-09-15", // NEW FIELD
        tools: "Premiere Pro, After Effects, DaVinci Resolve (Color)", // NEW FIELD
        description: "A fast-paced, modern commercial aimed at revitalizing the Awach brand identity. Focus was on motion graphics and a vibrant color grade." // NEW FIELD
    },
    { 
        id: "002", 
        title: "March With Deborah Ad", 
        format: ".MP4", 
        duration: "00:01:44", 
        category: ["ADVERTISEMENT"], 
        embedUrl: "https://www.youtube.com/embed/vAKsshZNjDI",
        client: "Deborah Group", // NEW FIELD
        date: "2024-01-20", // NEW FIELD
        tools: "Premiere Pro, Audition", // NEW FIELD
        description: "A longer format advertisement highlighting corporate social responsibility. Required extensive interview cutting and sound design." // NEW FIELD
    },
    { id: "003", title: "Tikur Engeda Ad", format: ".MP4", duration: "00:01:00", category: ["ADVERTISEMENT"], embedUrl: "https://www.youtube.com/embed/vS-2S6uH3DQ" },
    { id: "004", title: "DARE TO DREAM | STOIC RULE OF LIFE", format: ".MOV", duration: "00:00:11", category: ["AI", "YOUTUBE"], embedUrl: "https://www.youtube.com/embed/OCsLtjUD7FQ" },
    { id: "005", title: "THE 1ST RULE OF LIFE | STOIC RULE", format: ".MOV", duration: "00:00:12", category: ["AI"], embedUrl: "https://www.youtube.com/embed/qBg0Nu6mhuo" },
    { id: "006", title: "The Man Who Survived TWO Atomic Bombs", format: ".MOV", duration: "00:06:26", category: ["DOCUMENTARY" ,"YOUTUBE"], embedUrl: "https://www.youtube.com/embed/BQjcxB_wXng" },
    { id: "007", title: "Buna Insurance Doc", format: ".MP4", duration: "00:16:12", category: ["DOCUMENTARY"], embedUrl: "https://www.youtube.com/embed/HFkriRwX7OI" },
    { id: "008", title: "Color Isolation", format: ".MP4", duration: "00:01:29", category: ["COLORGRADING"], embedUrl: "https://www.youtube.com/embed/-SlWNOed9d4" },
    { id: "009", title: "Color Grading", format: ".MP4", duration: "00:00:20", category: ["COLORGRADING"], embedUrl: "https://www.youtube.com/embed/PZ8P1D3t9vI" },
    { id: "010", title: "The 10th Planet: Secret Alien Base Found!", format: ".MP4", duration: "00:05:17", category: ["YOUTUBE"], embedUrl: "https://www.youtube.com/embed/rVWDbCqtJ-U" },
    { id: "011", title: "Holy trinity Cathedral Doc", format: ".MP4", duration: "00:37:30", category: ["DOCUMENTARY"], embedUrl: "https://www.youtube.com/embed/23mlsrtk7w0" },
    { id: "012", title: "Kuriftu Resort ad", format: ".MP4", duration: "00:01:00", category: ["ADVERTISEMENT"], embedUrl: "https://www.youtube.com/embed/RDQ-tNxXE2I" },
    { id: "013", title: "Bar And Restaurant ad", format: ".MP4", duration: "00:00:54", category: ["ADVERTISEMENT"], embedUrl: "https://www.youtube.com/embed/vCfizezuk_g" },
    { id: "015", title: "Meet The Mothers In Law - Yefchi Serg", format: ".MP4", duration: "00:00:30", category: ["MOVIE"], embedUrl: "https://www.youtube.com/embed/QFfpLnCPiJA" },
    { id: "016", title: "Yefchi Serg Drama Teaser", format: ".MP4", duration: "00:00:29", category: ["MOVIE"], embedUrl: "https://www.youtube.com/embed/v-CnYBIvKUQ" },
    { id: "017", title: "Motivational Short", format: ".MP4", duration: "00:00:46", category: ["YOUTUBE"], embedUrl: "https://www.youtube.com/embed/bEpDmjpK3nk" },
    { id: "019", title: "Yefchi Serg Drama Endorsment", format: ".MP4", duration: "00:00:48", category: ["MOVIE"], embedUrl: "https://www.youtube.com/embed/dNh880BeDsk" },
    { id: "020", title: "We Run For Elders", format: ".MP4", duration: "00:01:31", category: ["EVENT"], embedUrl: "https://www.youtube.com/embed/B9t89Y7aFBA" },
    { id: "021", title: "የአለምን RECORD ሰበረ | Zootopia 2 Breaks Global Record", format: ".MP4", duration: "00:05:54", category: ["YOUTUBE"], embedUrl: "https://www.youtube.com/embed/ytUk3HAzR1E" },
    { id: "022", title: "Can 10 Minutes Burn More Fat Than Running?", format: ".MP4", duration: "00:01:48", category: ["YOUTUBE"], embedUrl: "https://www.youtube.com/embed/yNkx-YCE0YU" },
    { id: "023", title: "Yefchi Serg | Ep 1 - 12", format: ".MP4", duration: "00:30:00", category: ["MOVIE"], embedUrl: "https://www.youtube.com/embed/GegyB-wSJg8" },
    { id: "033", title: "Show Up Build Launch", format: ".MP4", duration: "00:00:10", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/e9P9usZVsa0" },
    { id: "024", title: "The Truth", format: ".MP4", duration: "00:00:17", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/el_I8u3cofE" },
    { id: "025", title: "Addis Buna", format: ".MP4", duration: "00:00:12", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/sA8Kepx1luA" },
    { id: "026", title: "Coming Soon", format: ".MP4", duration: "00:00:08", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/jC-kL0ND5fU" },
    { id: "027", title: "The Storm", format: ".MP4", duration: "00:00:09", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/S4kvmCO6Xjg" },
    { id: "028", title: "StarBucks", format: ".MP4", duration: "00:00:15", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/eAtkr6PMehI" },
    { id: "014", title: "Branding", format: ".MP4", duration: "00:00:25", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/oZlzDCkO3VA" },
    { id: "032", title: "Selam Book Launch", format: ".MP4", duration: "00:01:46", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/fK8PQQtWY-c" },
    { id: "018", title: "Divorce invitation Card", format: ".MP4", duration: "00:00:39", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/_DH7RZfwalA" },
    { id: "029", title: "Yefchi Serg Drama Release", format: ".MP4", duration: "00:00:11", category: ["MOTION GRAPHICS"], embedUrl: "https://www.youtube.com/embed/SxCnD96ZD98" },
    { id: "030", title: "Hala's Fashion Show", format: ".MP4", duration: "00:00:31", category: ["EVENT"], embedUrl: "https://www.youtube.com/embed/EnYdrC8Yuiw" },
    { id: "031", title: "The Pop", format: ".MP4", duration: "00:00:36", category: ["AI"], embedUrl: "https://www.youtube.com/embed/pN4-oNU-QaQ" },
];
const CATEGORIES = ['ALL', 'ADVERTISEMENT', 'MOTION GRAPHICS', 'DOCUMENTARY' , 'AI' , 'COLORGRADING' , 'YOUTUBE' , 'MOVIE' , 'EVENT'];

/* -----------------------------
   Global Styles
   ----------------------------- */
const VhsStyles = ({ enableAnimations }) => {
    const scissorCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24'><path fill='%23FFFFFF' d='M10 4V2H8v2H4v4l-2 2 2 2v4h4v2h2v-2h4v-4h2v-2l2-2-2-2V4h-4V2zM6 10h4v2H6zm8 2v-2h4l2 2-2 2h-4z'/></svg>") 14 14, crosshair`;

    return (
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        :root {
            --primary: ${PRIMARY_ACCENT};
            --secondary: ${SECONDARY_ACCENT};
            --error: ${ERROR_COLOR};
            --bg: #1a1a1a;
            --panel: #0a0a0a;
        }

        body {
            margin: 0;
            background-color: var(--bg); 
            background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 100px 50px;
            color: var(--primary);
            font-family: 'VT323', monospace;
            font-size: 1.2rem;
            min-height: 100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:20px;
            box-sizing:border-box;
            cursor: ${scissorCursor};
        }

        a, button, .nav-tool, .filter-button, .bin-item { cursor: ${scissorCursor} !important; }

        .timeline-track { position: fixed; left:50%; transform: translateX(-50%); width:120vw; font-size:2.4rem; white-space:nowrap; opacity:0.06; pointer-events:none; color:var(--primary); z-index:1; text-align:center; }
        .track-label { font-weight:bold; margin-right:10px; opacity:0.45; }

        .crt-monitor-frame {
            position: relative;
            width: clamp(420px, 85vw, 980px);
            height: calc(0.66 * clamp(420px, 85vw, 980px));
            max-height: 85vh;
            background: #2b2b2b;
            border: 4px solid #444;
            border-radius:6px;
            padding: 10px 10px 60px 10px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.9), 0 0 0 1px #000;
            transform: perspective(1500px) rotateX(2deg);
            z-index:500;
            display:flex;
            flex-direction:column;
            overflow: hidden;
        }

        .rec-tally { position:absolute; top:-25px; right:10px; color:var(--secondary); font-weight:bold; display:flex; align-items:center; gap:5px; text-shadow:0 0 5px rgba(255,255,255,0.5); animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0.25} }

        .crt-screen-content { flex-grow:1; position:relative; background-color:#000; border:1px solid #333; background-image:linear-gradient(transparent 90%, rgba(255,255,255,0.05) 90%), linear-gradient(90deg, transparent 90%, rgba(255,255,255,0.05) 90%); background-size:10% 10%; filter:contrast(1.05) brightness(1.05); overflow:hidden; z-index:6; display:flex; flex-direction:column; }
        .monitor-content { padding: 30px; height:100%; width:100%; box-sizing:border-box; overflow-y:auto; position:relative; z-index:2; -webkit-overflow-scrolling: touch; }

        .control-panel-container { position:absolute; bottom:15px; right:15px; display:flex; gap:10px; z-index:501; }

        .frame-control-button { font-size:1.05rem; padding:6px 12px; background:#222; border:1px solid #444; border-radius:4px; color:#FFF; box-shadow: inset 0 0 5px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05); transition: all 0.05s ease; line-height:1.2; font-family: 'VT323', monospace; user-select:none; }
        .frame-control-button:hover { background: #333; }
        .frame-control-button:active { transform:none; background:#111; box-shadow: inset 0 0 8px rgba(0,0,0,1); }

        .power-indicator { display:inline-block; width:8px; height:8px; border-radius:50%; margin-right:6px; vertical-align:middle; transition:all 0.4s; }

        .blackout-screen { position:absolute; top:0; left:0; width:100%; height:100%; background-color:#000; color:var(--secondary); display:flex; justify-content:center; align-items:center; font-size:1.6rem; flex-direction:column; z-index:10; }

        @keyframes crt-off {
            0% { opacity: 1; transform: scaleY(1); }
            40% { opacity: 0.8; transform: scaleY(0.9); }
            65% { opacity: 0.4; transform: scaleY(0.12); }
            85% { opacity: 0.12; transform: scaleY(0.02); }
            100% { opacity: 0; transform: scaleY(0); }
        }

        .blackout-screen.crt-off { animation: crt-off 420ms linear forwards; }

        .nav-toolbar { display:flex; border-bottom:2px solid #555; background:#111; margin-bottom:20px; z-index:5; position:relative; }
        .nav-tool { padding:8px 20px; color:#888; text-decoration:none; border-right:1px solid #333; transition:all 0.15s; display:flex; align-items:center; gap:8px; font-size:1.05rem; }
        .nav-tool:hover { background:#222; color:#FFF; }
        .nav-tool.active { background: var(--primary); color:#000; font-weight:bold; }

        .filter-toolbar { display:flex; background:#222; border-radius:2px; margin-bottom:20px; border:1px solid #444; overflow:hidden; }
        .filter-button { padding:6px 12px; font-size:0.95rem; color:#888; cursor:pointer; border-right:1px solid #333; transition:all 0.1s; flex-grow:1; text-align:center; }
        .filter-button:hover { color:#FFF; background:#333; }
        .filter-button.active-filter { color:#000; font-weight:bold; background: var(--primary); }

        .project-bin { border:1px solid #444; background:var(--panel); max-height:45vh; overflow-y:auto; }
        .bin-header { display:grid; grid-template-columns:110px 3.5fr 1fr 1.5fr; padding:10px; background:#111; color:#888; font-size:1rem; border-bottom:1px solid #444; position:sticky; top:0; z-index:20; }
        .bin-item { 
            display:grid; 
            grid-template-columns:110px 3.5fr 1fr 1.5fr; 
            padding:16px 10px; 
            border-bottom:1px solid #181818; 
            align-items:center; 
            cursor:pointer; 
            transition:background 0.1s, border-left 0.1s, box-shadow 0.1s; 
            border-left:5px solid transparent; 
            text-decoration:none; 
            color:var(--primary); 
            position: relative; 
        }
        .bin-item:hover { 
            background:#222; 
            color:var(--primary); 
            border-left:5px solid var(--primary); 
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1); 
        }
        
        /* Thumbnail Styling */
        .thumb-container {
            position: relative;
            width: 80px; 
            height: 45px;
            border: 2px solid #555;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
            overflow: hidden;
            background: #000;
            transition: transform 0.2s ease-in-out;
            border-radius: 1px;
        }
        
        .bin-thumb { 
            width:100%; 
            height:100%; 
            object-fit:cover; 
            display:block;
            transition: transform 0.2s ease-in-out;
            animation: analogFlicker 0.1s infinite alternate; 
        }
        
        .thumb-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.4);
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.2s;
            z-index: 5;
        }

        .play-icon {
            font-size: 1.8rem;
            color: var(--primary);
            text-shadow: 0 0 8px var(--primary);
            opacity: 0.9;
        }
        
        .bin-item:hover .thumb-container {
            transform: scale(1.05); 
        }
        
        .bin-item:hover .thumb-overlay {
            opacity: 0; 
        }
        
        @keyframes analogFlicker {
            0% { opacity: 1; }
            100% { opacity: 0.98; }
        }

        .bin-details { display:flex; flex-direction:column; gap:4px; }
        .bin-category { 
            font-size: 0.85rem; 
            color: var(--secondary); 
            opacity: 0.7; 
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis; 
            line-height: 1;
        }

        .category-tag {
            position: absolute;
            top: 2px;
            right: 2px;
            font-size: 0.75rem;
            padding: 2px 6px;
            background: rgba(255, 255, 255, 0.2);
            color: #000;
            font-weight: bold;
            border-radius: 2px;
            line-height: 1;
            z-index: 3;
            text-shadow: none;
            border: 1px solid #000;
        }

        .monitor-footer { height:30px; background:#222; display:flex; justify-content:space-between; align-items:center; padding:0 10px; font-size:0.9rem; color:#666; border-top:1px solid #333; }

        ::-webkit-scrollbar { width:8px; }
        ::-webkit-scrollbar-track { background:#111; }
        ::-webkit-scrollbar-thumb { background:#444; border-radius:4px; }
        ::-webkit-scrollbar-thumb:hover { background:var(--primary); }

        .scanlines { position:fixed; top:0; left:0; right:0; bottom:0; background: repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px); pointer-events:none; z-index:999; opacity:0.6; }

        /* MOBILE RULES */
        @media (max-width: 768px) {
            body { padding:8px; font-size:1rem; background-size: 50px 30px; }
            .crt-monitor-frame { width:95vw !important; height:60vh !important; transform:none !important; padding-bottom:40px !important; }
            .monitor-content { padding: 16px !important; }
            .nav-tool { padding:6px 10px !important; font-size:0.95rem !important; }
            /* Mobile Grid Columns Adjustment */
            .bin-header, .bin-item { grid-template-columns: 80px 1.6fr 0.7fr 1fr !important; font-size:0.95rem !important; }
            .thumb-container { width: 70px !important; height: 40px !important; }
            .rec-tally { font-size:0.9rem; top:-18px; }
            .bin-category { display: none; } 
            .category-tag { position: static; background: none; color: var(--secondary); font-size:0.85rem; padding: 0; border: none; }
        }
        @media (max-width: 480px) {
            .crt-monitor-frame { width:100vw; height:55vh; border-width:2px; padding:8px 8px 46px 8px; }
            .monitor-footer { font-size:0.7rem !important; }
            h2,h3,span,p { font-size:0.8rem !important; }
            body { cursor: default !important; } 
        }

        `}</style>
    );
};

/* -----------------------------
   Small helper: play click beep
   ----------------------------- */
const playBeep = (enableSFX) => {
    if (!enableSFX || typeof window === 'undefined') return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(880, ctx.currentTime);
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
        g.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.15);
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.16);
        setTimeout(()=>{ try{ ctx.close(); }catch(e){} }, 500);
    } catch(e) {}
};

/* -----------------------------
   ControlPanel
   ----------------------------- */
const ControlPanel = ({ togglePower, isPoweredOn, onChannelScroll, enableAnimations, setEnableAnimations, enableSFX, setEnableSFX }) => {
    return (
        <div className="control-panel-container" role="toolbar" aria-label="Controls">
            <button 
                onClick={() => { onChannelScroll(-220); if (enableSFX) playBeep(enableSFX); }} 
                className="frame-control-button"
                title="Channel Up / Scroll Up"
                disabled={!isPoweredOn}
                style={{ opacity: isPoweredOn ? 1 : 0.45 }}
            >
                ▲ CH+
            </button>

            <button 
                onClick={() => { onChannelScroll(220); if (enableSFX) playBeep(enableSFX); }} 
                className="frame-control-button"
                title="Channel Down / Scroll Down"
                disabled={!isPoweredOn}
                style={{ opacity: isPoweredOn ? 1 : 0.45 }}
            >
                ▼ CH-
            </button>

            <button 
                onClick={() => { setEnableAnimations(!enableAnimations); if (enableSFX) playBeep(enableSFX); }}
                className="frame-control-button"
                title="Toggle Animations"
            >
                ANIM {enableAnimations ? 'ON' : 'OFF'}
            </button>

            <button 
                onClick={() => { setEnableSFX(!enableSFX); playBeep(!enableSFX); }}
                className="frame-control-button"
                title="Toggle SFX"
            >
                SFX {enableSFX ? 'ON' : 'OFF'}
            </button>

            <button 
                onClick={() => { togglePower(); if (enableSFX) playBeep(enableSFX); }} 
                className="frame-control-button"
                title="Power On/Off"
                style={{ marginLeft: '6px' }}
            >
                <span 
                    className="power-indicator" 
                    style={{ backgroundColor: isPoweredOn ? PRIMARY_ACCENT : SECONDARY_ACCENT, boxShadow: isPoweredOn ? `0 0 4px ${PRIMARY_ACCENT}` : 'none' }}
                />
                {isPoweredOn ? 'POWER' : 'OFF'}
            </button>
        </div>
    );
};

/* -----------------------------
   AudioMeter
   ----------------------------- */
const AudioMeter = ({ db }) => {
    const barCount = 10;
    const bars = Array(barCount).fill(0).map((_, i) => {
        let color = '#AAA';
        if (i >= barCount * 0.9) color = PRIMARY_ACCENT;
        const isActive = i < db;
        return <div key={i} style={{
            height: `${100 / barCount}%`,
            width: '100%',
            background: isActive ? color : '#111',
            marginBottom: '1px',
            opacity: isActive ? 1 : 0.18,
            animation: isActive ? 'bounce 0.8s infinite alternate' : 'none'
        }} />;
    });

    return (
        <div style={{ display:'flex', gap:'4px', height: '100px', width: '24px', border:'1px solid #333', background:'#000', flexDirection:'column-reverse', padding:'4px', position:'relative' }}>
            <div style={{color:ERROR_COLOR, fontSize:'0.75rem', position:'absolute', bottom:'-16px', left:0, right:0, textAlign:'center'}}>CLIP</div>
            {bars}
        </div>
    );
};

/* -----------------------------
   Navigation
   ----------------------------- */
const Navigation = () => {
    const location = useLocation();
    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        if (path === '/projects') return location.pathname.startsWith('/projects') || location.pathname.startsWith('/player');
        if (path === '/contact') return location.pathname === '/contact'; 
        return location.pathname === path;
    };

    return (
        <div className="nav-toolbar">
            <Link to="/" className={`nav-tool ${isActive('/') ? 'active' : ''}`}><span>📼</span> HOME / PROFILE <span style={{fontSize:'0.8rem', color:SECONDARY_ACCENT, marginLeft:'8px'}}>[SOURCE_MONITOR]</span></Link>
            <Link to="/projects" className={`nav-tool ${isActive('/projects') ? 'active' : ''}`}><span>🎬</span> PROJECTS / WORK <span style={{fontSize:'0.8rem', color:SECONDARY_ACCENT, marginLeft:'8px'}}>[PROJECT_BIN]</span></Link>
            <Link to="/contact" className={`nav-tool ${isActive('/contact') ? 'active' : ''}`}><span>📧</span> CONTACT / CONNECT <span style={{fontSize:'0.8rem', color:SECONDARY_ACCENT, marginLeft:'8px'}}>[TX_CHANNEL]</span></Link>
        </div>
    );
};

/* -----------------------------
   VhsWrapper
   ----------------------------- */
const VhsWrapper = ({ children, isPoweredOn, togglePower, enableAnimations, enableSFX, setEnableAnimations, setEnableSFX }) => {
    const contentRef = useRef(null);

    const handleChannelScroll = useCallback((scrollDistance) => {
        if (contentRef.current && isPoweredOn) {
            contentRef.current.scrollBy({ top: scrollDistance, behavior: 'smooth' });
        }
    }, [isPoweredOn]);

    return (
        <>
            {/* background tracks */}
            {enableAnimations && (
                <>
                    <div className="timeline-track" style={{ top: '15%' }}><span className="track-label">V3</span> [ TITLE_OVERLAY ]----------------[ GFX_LOWER_3RD ]</div>
                    <div className="timeline-track" style={{ top: '22%' }}><span className="track-label">V2</span> ---[ B-ROLL_CITY ]----[ B-ROLL_OFFICE ]-------[ STOCK_FOOTAGE ]---</div>
                    <div className="timeline-track" style={{ top: '29%' }}><span className="track-label">V1</span> [ MAIN_CAM_A ]________[ MAIN_CAM_B ]________[ MAIN_CAM_A ]______</div>
                </>
            )}

            {isPoweredOn && <div className="rec-tally" style={{color: SECONDARY_ACCENT}}>🔴 REC</div>}

            <div className="crt-monitor-frame" role="application" aria-label="VHS Monitor">
                <ControlPanel 
                    togglePower={togglePower}
                    isPoweredOn={isPoweredOn}
                    onChannelScroll={handleChannelScroll}
                    enableAnimations={enableAnimations}
                    setEnableAnimations={setEnableAnimations}
                    enableSFX={enableSFX}
                    setEnableSFX={setEnableSFX}
                />

                <div className="crt-screen-content">
                    {!isPoweredOn && (
                        <div className="blackout-screen crt-off" aria-live="polite">
                            [SYSTEM OFFLINE]
                            <span style={{fontSize:'1rem', marginTop:'10px', color:'#666'}}>(Frame electronics still active)</span>
                        </div>
                    )}

                    {isPoweredOn && (
                        <div className="monitor-content" ref={contentRef}>
                            <Navigation />
                            {children}
                        </div>
                    )}
                </div>

                {isPoweredOn && (
                    <div className="monitor-footer">
                        <span>SYSTEM: NLE V6.2</span>
                        <span>PLAYBACK RESOLUTION: FULL</span>
                        <span>DROPPED FRAMES: 0</span>
                    </div>
                )}
            </div>

            {enableAnimations && <div className="scanlines" aria-hidden="true" />}
        </>
    );
};

/* -----------------------------
   Pages
   ----------------------------- */

const BootSequence = () => {
    const skills = [
        { area: "NLE_SOFTWARE", details: "Adobe Premiere, Photoshop, After Effects, Capcut, Davinic Resolve", level: "|||||||||| 100%" },
        { area: "COMPOSITING", details: "After Effects", level: "||||||||.. 80%" },
        { area: "COLOR_GRADING", details: "Log, RAW, HDR Workflows", level: "||||||.... 60%" },
        { area: "SOUND_DESIGN", details: "Mixdown & Sweetening", level: "|||||..... 50%" },
    ];
    const [audioLevel, setAudioLevel] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setAudioLevel(Math.floor(Math.random()*5)+4), 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ maxWidth: '900px', margin:'0 auto', fontSize:'1rem' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 80px', gap:'20px' }}>
                <div style={{ background:'#0a0a0a', border:'1px solid #333' }}>
                    <div style={{ display:'flex', alignItems:'center', padding:'18px', borderBottom:'1px dashed #444', backgroundColor:'#151515' }}>
                        <img src="aman.png" alt="Profile" style={{ width:'156px', height:'156px', borderRadius:'50%', border:`3px solid ${PRIMARY_ACCENT}`, objectFit:'cover' }} onError={(e)=>{ e.target.onerror=null; e.target.src='https://placehold.co/100x100/2b2b2b/FFFFFF?text=USER';}} />
                        <div style={{ marginLeft:'20px', color:PRIMARY_ACCENT, textAlign:'left' }}>
                            <div style={{ color:PRIMARY_ACCENT, fontSize:'1.6rem', marginBottom:'4px' }}>Amanuel Zegeye (Video Editor)</div>
                            <p style={{ margin:'4px 0', color:SECONDARY_ACCENT, fontSize:'1.05rem' }}>ROLE: Video Editing/MotionDesigner/SoundDesign/ColorGrading</p>
                            <p style={{ margin:'4px 0', color:SECONDARY_ACCENT, fontSize:'1.05rem' }}>LOCATION: Addis Ababa, Ethiopia (GLOBAL)</p>
                        </div>
                    </div>

                    <div style={{ padding:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #111' }}>
                        <div style={{ color:ERROR_COLOR, fontSize:'1.2rem', fontFamily:'monospace' }}>[ 00:00:03:12 ]</div>
                    </div>
                </div>

                <div style={{ background:'#0a0a0a', border:'1px solid #333', display:'flex', flexDirection:'column', alignItems:'center', padding:'8px', boxSizing:'border-box' }}>
                    <div style={{ color:PRIMARY_ACCENT, fontSize:'1rem', marginBottom:'6px' }}>MIX</div>
                    <AudioMeter db={audioLevel} />
                </div>
            </div>

            <h3 style={{ borderBottom:`1px solid ${PRIMARY_ACCENT}`, paddingBottom:'5px', marginTop:'28px', color:PRIMARY_ACCENT, fontSize:'1.4rem' }}>SKILLS MATRIX (ABILITIES)</h3>

            <div style={{ marginTop:'12px' }}>
                {skills.map((skill,i) => (
                    <div key={i} style={{ display:'grid', gridTemplateColumns:'150px 1fr 150px', padding:'10px 0', borderBottom:'1px solid #222' }}>
                        <span style={{ color:PRIMARY_ACCENT }}>{skill.area}</span>
                        <span style={{ color:SECONDARY_ACCENT, fontSize:'1.03rem' }}>{skill.details}</span>
                        <span style={{ color:PRIMARY_ACCENT }}>{skill.level}</span>
                    </div>
                ))}
            </div>

            <div style={{ marginTop:'22px', padding:'14px', border:`1px solid ${PRIMARY_ACCENT}`, color:PRIMARY_ACCENT }}>
                &gt; RENDER STATUS: READY FOR NEW PROJECT<br/>
                &gt; FOR CONTACT INFO, ACCESS: [Contact Page]
            </div>
        </div>
    );
};

const DataLogArchive = () => {
    const [filterCategory, setFilterCategory] = useState('ALL');

    const filteredProjects = PROJECT_DATA.filter(project => {
        if (filterCategory === 'ALL') return true;
        // Check if the project's category array includes the selected filter
        return project.category.includes(filterCategory);
    });

    // Helper to get YouTube Thumbnail
    const getYouTubeThumbnail = (embedUrl) => {
        if (!embedUrl) return 'https://placehold.co/100x60/333333/FFFFFF?text=NO+IMG';
        const videoId = embedUrl.split('/').pop();
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    // Helper to get Color for the tag based on primary category
    const getCategoryColor = (category) => {
        switch (category) {
            case 'ADVERTISEMENT': return '#00BFFF'; // Deep Sky Blue
            case 'MOTION GRAPHICS': return '#FFD700'; // Gold
            case 'DOCUMENTARY': return '#FFA07A'; // Light Salmon
            case 'AI': return '#00FF00'; // Lime
            case 'COLORGRADING': return '#FF6347'; // Tomato
            case 'YOUTUBE': return '#FF4500'; // Orange Red
            case 'MOVIE': return '#8A2BE2'; // Blue Violet
            case 'EVENT': return '#3CB371'; // Medium Sea Green
            default: return '#888';
        }
    }


    return (
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
            <h2 style={{ color:PRIMARY_ACCENT, fontSize:'1.8rem' }}>PROJECT BIN (CLIPS)</h2>

            <div className="filter-toolbar" role="tablist" aria-label="Categories">
                {CATEGORIES.map(category => (
                    <div key={category} className={`filter-button ${filterCategory === category ? 'active-filter' : ''}`} onClick={() => setFilterCategory(category)} role="tab" aria-selected={filterCategory === category}>
                        {category}
                    </div>
                ))}
            </div>

            <div className="project-bin" role="list">
                <div className="bin-header">
                    <span>PREVIEW</span>
                    <span>PROJECT TITLE / CATEGORIES</span>
                    <span>FILE TYPE</span>
                    <span>TIME</span>
                </div>

                {filteredProjects.length > 0 ? filteredProjects.map(project => (
                    <Link to={`/player/${project.id}`} key={project.id} className="bin-item" role="listitem" style={{ textDecoration:'none' }}>
                        
                        {/* Column 1: Thumbnail */}
                        <div className="thumb-container">
                            <img src={getYouTubeThumbnail(project.embedUrl)} alt={`Thumbnail for ${project.title}`} className="bin-thumb" />
                            <div className="thumb-overlay">
                                <span className="play-icon">▶</span>
                            </div>
                        </div>
                        
                        {/* Column 2: Title and Category List */}
                        <div className="bin-details">
                            <span style={{ color: PRIMARY_ACCENT }}>{project.title}</span>
                            <span className="bin-category">[{project.category.join(' / ')}]</span>
                        </div>
                        
                        {/* Column 3: File Type */}
                        <span>{project.format}</span>
                        
                        {/* Column 4: Duration */}
                        <span style={{ fontFamily:'monospace' }}>{project.duration}</span>
                        
                        {/* Floating Category Tag */}
                        <div 
                            className="category-tag" 
                            style={{ 
                                backgroundColor: getCategoryColor(project.category[0]),
                                color: project.category[0] === 'MOTION GRAPHICS' ? '#000' : '#FFF'
                            }}
                        >
                            {project.category[0]}
                        </div>

                    </Link>
                )) : (
                    <div style={{ padding:'20px', textAlign:'center', color:SECONDARY_ACCENT }}>&gt; NO CLIPS FOUND IN CATEGORY: {filterCategory}</div>
                )}
            </div>
        </div>
    );
};

/* -----------------------------
   ProjectPlayer
   ----------------------------- */

// Helper component for displaying a single metadata line
const MetaLine = ({ label, value }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', padding: '6px 0', borderBottom: '1px dotted #333', fontSize: '1rem', alignItems: 'center' }}>
        <span style={{ color: SECONDARY_ACCENT, fontWeight: 'bold' }}>{label}</span>
        <span style={{ color: PRIMARY_ACCENT, fontFamily: 'monospace' }}>{value || '[N/A]'}</span>
    </div>
);


const ProjectPlayer = () => {
    const { projectId } = useParams();
    const project = PROJECT_DATA.find(p => p.id === projectId);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [iframeKey, setIframeKey] = useState(Date.now());

    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
        setIframeKey(Date.now());
    }, [projectId]);

    if (!project) {
        return <h2 style={{ color: ERROR_COLOR }}>// ERROR // PROJECT ID {projectId} NOT FOUND</h2>;
    }

    const reloadIframe = () => {
        setIsLoading(true);
        setHasError(false);
        setIframeKey(Date.now());
    };

    const playerStyles = {
        frame: {
            position:'relative',
            paddingBottom:'56.25%',
            height:0,
            overflow:'hidden',
            border:`3px solid ${PRIMARY_ACCENT}`,
            boxShadow:`0 0 10px ${PRIMARY_ACCENT}`,
            backgroundColor:'#000',
            marginBottom:'10px'
        },
        title: {
            color: PRIMARY_ACCENT,
            fontSize: '1rem',
            textShadow: `0 0 8px ${PRIMARY_ACCENT}`,
            marginBottom: '15px',
            fontFamily: 'monospace',
            display:'block',
            textAlign:'center',
            padding:'5px',
            backgroundColor:'rgba(0,0,0,0.6)'
        }
    };

    return (
        <div style={{ maxWidth:'760px', margin:'0 auto' }}>
            <Link to="/projects" style={{ textDecoration:'none', color: SECONDARY_ACCENT, fontSize:'1.05rem', display:'block', marginBottom:'12px' }}>&lt; BACK TO PROJECT BIN</Link>

            <span style={playerStyles.title}>PROGRAM MONITOR: {project.title}</span>

            <div style={playerStyles.frame}>
                {isLoading && (
                    <div style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', background:'#000', color:PRIMARY_ACCENT, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', fontFamily:'monospace', zIndex:6 }}>
                        [ LOADING STREAM… ]
                    </div>
                )}

                {hasError && (
                    <div style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', background:'#000', color:ERROR_COLOR, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', fontSize:'1rem', fontFamily:'monospace', zIndex:7 }}>
                        <div>[ ERROR: STREAM UNAVAILABLE ]</div>
                        <button onClick={reloadIframe} style={{ marginTop:12, padding:'8px 12px', borderRadius:4, border:'1px solid #444', background:'#222', color:PRIMARY_ACCENT }}>RETRY</button>
                    </div>
                )}

                <iframe
                    key={iframeKey}
                    src={project.embedUrl}
                    title={`Playback of ${project.title}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => { setIsLoading(false); setHasError(false); }}
                    onError={() => { setIsLoading(false); setHasError(true); }}
                    style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', opacity: isLoading ? 0.35 : 1, transition:'opacity 220ms ease' }}
                />
            </div>

            {/* Existing Status Footer */}
            <div style={{ fontSize:'1.05rem', color:PRIMARY_ACCENT, textAlign:'center', marginTop:'8px', padding:'10px', border:'1px solid #333' }}>
                STATUS: ONLINE | DURATION: {project.duration} | FORMAT: {project.format}
            </div>
            
            {/* NEW: Metadata / Director's Notes Section */}
            <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #444', backgroundColor: '#111' }}>
                <h3 style={{ color: PRIMARY_ACCENT, fontSize: '1.4rem', borderBottom:`1px solid ${PRIMARY_ACCENT}`, paddingBottom:'5px', marginBottom:'15px' }}>
                    [ CLIP METADATA / DIRECTOR'S NOTES ]
                </h3>

                {/* Grid for Quick Facts */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <MetaLine label="PROJECT ID:" value={project.id} />
                    <MetaLine label="CLIENT / REQUESTOR:" value={project.client} />
                    <MetaLine label="PRIMARY CATEGORY:" value={project.category[0]} />
                    
                </div>

               

            
            </div>

        </div>
    );
};

/* -----------------------------
   ContactPage (NEW)
   ----------------------------- */
const ContactPage = () => {
    const contactEmail = "ZAMANUEL4REAL@GMAIL.COM";

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: PRIMARY_ACCENT, fontSize: '1.8rem', borderBottom:`1px solid ${PRIMARY_ACCENT}`, paddingBottom:'5px', marginBottom:'20px' }}>
                [ SYSTEM LOG: CONTACT ]
            </h2>
            <div style={{ 
                padding: '30px', 
                border: '1px solid #444', 
                backgroundColor: '#111',
                boxShadow: `0 0 10px rgba(255,255,255,0.1)`,
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                <p style={{ color: SECONDARY_ACCENT, fontSize: '1.2rem', margin: '0' }}>
                    &gt; STATUS: ONLINE / AWAITING TRANSMISSION
                </p>
                <div style={{ borderTop: '1px dashed #333', paddingTop: '15px' }}>
                    <p style={{ color: PRIMARY_ACCENT, fontSize: '1.6rem', margin: '0 0 5px 0' }}>
                        EMAIL_ADDRESS:
                    </p>
                    <a 
                        href={`mailto:${contactEmail}`} 
                        style={{ color: '#00FFFF', textDecoration: 'none', fontSize: '1.8rem', textShadow: '0 0 5px #00FFFF' }}
                    >
                        {contactEmail}
                    </a>
                </div>
                <div style={{ borderTop: '1px dashed #333', paddingTop: '15px' }}>
                    <p style={{ color: PRIMARY_ACCENT, fontSize: '1.2rem', margin: '0 0 5px 0' }}>
                        Phone Number : <span style={{ color: SECONDARY_ACCENT }}>+251-929306548</span>
                    </p>
                    
                </div>
                <p style={{ color: SECONDARY_ACCENT, fontSize: '1rem', margin: '20px 0 0 0' }}>
                    [TRANSMISSION COMPLETE: THANK YOU FOR YOUR INQUIRY]
                </p>
            </div>
        </div>
    );
};

/* -----------------------------
   Main App
   ----------------------------- */
export default function App() {
    const [isPoweredOn, setIsPoweredOn] = useState(true);
    const [enableAnimations, setEnableAnimations] = useState(true);
    const [enableSFX, setEnableSFX] = useState(true);

    const togglePower = () => {
        setIsPoweredOn(prev => !prev);
    };

    return (
        <Router>
            <VhsStyles enableAnimations={enableAnimations} />
            <VhsWrapper 
                isPoweredOn={isPoweredOn} 
                togglePower={togglePower} 
                enableAnimations={enableAnimations}
                enableSFX={enableSFX}
                setEnableAnimations={setEnableAnimations}
                setEnableSFX={setEnableSFX}
            >
                <Routes>
                    <Route path="/" element={<BootSequence />} />
                    <Route path="/projects" element={<DataLogArchive />} />
                    <Route path="/player/:projectId" element={<ProjectPlayer />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<h2 style={{ color: ERROR_COLOR }}>// ERROR 404 // FILE NOT FOUND</h2>} />
                </Routes>
            </VhsWrapper>
        </Router>
    );
}