import { AnimationOption } from './types';

export const ANIMATION_OPTIONS: AnimationOption[] = [
    { name: 'None', className: '', css: '' },
    {
        name: 'Pulse',
        className: 'animate-pulse',
        css: `@keyframes pulse { 50% { opacity: .5; } } .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }`
    },
    {
        name: 'Spin',
        className: 'animate-spin',
        css: `@keyframes spin { to { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`
    },
    {
        name: 'Bounce',
        className: 'animate-bounce',
        css: `@keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); } } .animate-bounce { animation: bounce 1s infinite; }`
    },
    {
        name: 'Ping',
        className: 'animate-ping',
        css: `@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } } .animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }`
    },
    {
        name: 'Fade In',
        className: 'animate-fade-in',
        css: `@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 1s ease-in-out; }`
    },
    {
        name: 'Slide In Up',
        className: 'animate-slide-in-up',
        css: `@keyframes slide-in-up { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } .animate-slide-in-up { animation: slide-in-up 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }`
    },
    {
        name: 'Rotate & Scale',
        className: 'animate-rotate-and-scale',
        css: `@keyframes rotate-and-scale { 0% { transform: rotate(0deg) scale(0.8); } 100% { transform: rotate(360deg) scale(1); } } .animate-rotate-and-scale { animation: rotate-and-scale 2s ease-in-out infinite alternate; }`
    },
    {
        name: 'Wobble',
        className: 'animate-wobble',
        css: `@keyframes wobble { 0%, 100% { transform: translateX(0%); transform-origin: 50% 50%; } 15% { transform: translateX(-15px) rotate(-6deg); } 30% { transform: translateX(12px) rotate(6deg); } 45% { transform: translateX(-12px) rotate(-3.6deg); } 60% { transform: translateX(9px) rotate(2.4deg); } 75% { translateX(-6px) rotate(-1.2deg); } } .animate-wobble { animation: wobble 1s both; }`
    },
    {
        name: 'Tada',
        className: 'animate-tada',
        css: `@keyframes tada { from { transform: scale3d(1, 1, 1); } 10%, 20% { transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); } 30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); } 40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); } to { transform: scale3d(1, 1, 1); } } .animate-tada { animation: tada 1s both; }`
    },
    {
        name: 'Jello',
        className: 'animate-jello',
        css: `@keyframes jello { from, 11.1%, to { transform: none; } 22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); } 33.3% { transform: skewX(6.25deg) skewY(6.25deg); } 44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); } 55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); } 66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); } 77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); } 88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); } } .animate-jello { animation: jello 1s both; transform-origin: center; }`
    },
    {
        name: 'Heartbeat',
        className: 'animate-heartbeat',
        css: `@keyframes heartbeat { from { transform: scale(1); } 50% { transform: scale(1.1); } to { transform: scale(1); } } .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }`
    },
    {
        name: 'Flip',
        className: 'animate-flip',
        css: `@keyframes flip { from { transform: perspective(400px) rotate3d(0, 1, 0, -360deg); animation-timing-function: ease-out; } 40% { transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg); animation-timing-function: ease-out; } 50% { transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg); animation-timing-function: ease-in; } 80% { transform: perspective(400px) scale3d(.95, .95, .95) rotate3d(0, 1, 0, 0deg); animation-timing-function: ease-in; } to { transform: perspective(400px) rotate3d(0, 1, 0, 0deg); animation-timing-function: ease-in; } } .animate-flip { animation: flip 1s both; backface-visibility: visible; }`
    },
    {
        name: 'Swing',
        className: 'animate-swing',
        css: `@keyframes swing { 20% { transform: rotate3d(0, 0, 1, 15deg); } 40% { transform: rotate3d(0, 0, 1, -10deg); } 60% { transform: rotate3d(0, 0, 1, 5deg); } 80% { transform: rotate3d(0, 0, 1, -5deg); } to { transform: rotate3d(0, 0, 1, 0deg); } } .animate-swing { animation: swing 2s both; transform-origin: top center; }`
    },
    {
        name: 'Color Rotate',
        className: 'animate-color-rotate',
        css: `@keyframes color-rotate { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); } } .animate-color-rotate { animation: color-rotate 3s linear infinite; }`
    },
    {
        name: 'Confetti',
        className: 'animate-confetti',
        css: `@keyframes confetti { from { transform: scale3d(1, 1, 1) rotate(0); filter: hue-rotate(0deg); } 25% { transform: scale3d(1.1, 1.1, 1.1) rotate(5deg); filter: hue-rotate(90deg); } 50% { transform: scale3d(0.9, 0.9, 0.9) rotate(-5deg); filter: hue-rotate(180deg); } 75% { transform: scale3d(1.05, 1.05, 1.05) rotate(2deg); filter: hue-rotate(270deg); } to { transform: scale3d(1, 1, 1) rotate(0); filter: hue-rotate(360deg); } } .animate-confetti { animation: confetti 1.5s ease-out both; }`
    },
    {
        name: 'Background Glow',
        className: 'animate-background-glow',
        css: `@keyframes background-glow { 0% { filter: drop-shadow(0 0 5px #a855f7) drop-shadow(0 0 10px #a855f7); } 33% { filter: drop-shadow(0 0 7px #ec4899) drop-shadow(0 0 15px #ec4899); } 66% { filter: drop-shadow(0 0 7px #22d3ee) drop-shadow(0 0 15px #22d3ee); } 100% { filter: drop-shadow(0 0 5px #a855f7) drop-shadow(0 0 10px #a855f7); } } .animate-background-glow { animation: background-glow 4s linear infinite; }`
    },
    {
        name: 'Edge Glow',
        className: 'animate-edge-glow',
        css: `@keyframes edge-glow { 0% { filter: drop-shadow(0 2px 4px #a855f7) drop-shadow(0 0 10px #a855f7); } 25% { filter: drop-shadow(2px 0 6px #ec4899) drop-shadow(0 0 15px #ec4899); } 50% { filter: drop-shadow(0 -2px 4px #22d3ee) drop-shadow(0 0 10px #22d3ee); } 75% { filter: drop-shadow(-2px 0 6px #a855f7) drop-shadow(0 0 15px #a855f7); } 100% { filter: drop-shadow(0 2px 4px #a855f7) drop-shadow(0 0 10px #a855f7); } } .animate-edge-glow { animation: edge-glow 4s linear infinite; }`
    },
    {
        name: 'Neon Glow',
        className: 'animate-neon-glow',
        css: `@keyframes neon-glow { from { filter: drop-shadow(0 0 5px #ff00c1) drop-shadow(0 0 10px #ff00c1) drop-shadow(0 0 15px #ff00c1); } to { filter: drop-shadow(0 0 10px #ff00c1) drop-shadow(0 0 20px #ff00c1) drop-shadow(0 0 30px #ff00c1); } } .animate-neon-glow { animation: neon-glow 1.5s ease-in-out infinite alternate; }`
    },
    {
        name: 'Draw & Fill',
        className: 'animate-draw-and-fill',
    },
    {
        name: 'Float',
        className: 'animate-float',
        css: `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } .animate-float { animation: float 3s ease-in-out infinite; }`
    },
    {
        name: 'Flicker',
        className: 'animate-flicker',
        css: `@keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } 25%, 75% { opacity: 0.8; } } .animate-flicker { animation: flicker 1.2s linear infinite; }`
    },
    {
        name: 'Rubber Band',
        className: 'animate-rubber-band',
        css: `@keyframes rubberBand { from { transform: scale3d(1, 1, 1); } 30% { transform: scale3d(1.25, 0.75, 1); } 40% { transform: scale3d(0.75, 1.25, 1); } 50% { transform: scale3d(1.15, 0.85, 1); } 65% { transform: scale3d(.95, 1.05, 1); } 75% { transform: scale3d(1.05, .95, 1); } to { transform: scale3d(1, 1, 1); } } .animate-rubber-band { animation: rubberBand 1s both; }`
    },
    {
        name: 'Glitch',
        className: 'animate-glitch',
        // This effect uses CSS pseudo-elements and blend modes not supported in standalone SVG.
    },
    {
        name: 'Gradient Flow',
        className: 'animate-gradient-flow',
        // This effect uses an animated background which is not supported in standalone SVG.
    },
    {
    
    },
];