import React from 'react';
import { ANIMATION_OPTIONS } from '../constants';
import { processDrawAnimation } from '../utils/svgProcessor';

interface DownloadButtonProps {
    svgContent: string | null;
    animationClass: string;
}

const NOT_DOWNLOADABLE_ANIMATIONS = ['animate-light-sweep', 'animate-glitch', 'animate-gradient-flow'];
const PROCESSED_ANIMATIONS = ['animate-draw-and-fill'];

export const DownloadButton: React.FC<DownloadButtonProps> = ({ svgContent, animationClass }) => {
    
    const handleDownload = () => {
        if (!svgContent) return;

        let finalSvgContent = svgContent;
        
        if (PROCESSED_ANIMATIONS.includes(animationClass)) {
            if (animationClass === 'animate-draw-and-fill') {
                finalSvgContent = processDrawAnimation(svgContent);
            }
        } else {
            const animation = ANIMATION_OPTIONS.find(opt => opt.className === animationClass);
            if (animation && animation.css) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(svgContent, "image/svg+xml");
                const svgElement = doc.documentElement;

                if (doc.getElementsByTagName("parsererror").length > 0) {
                    console.error("Error parsing SVG content. Falling back to string replacement.");
                    finalSvgContent = svgContent
                        .replace('<svg', `<svg class="${animation.className}"`)
                        .replace('>', `><style>${animation.css}</style>`);
                } else {
                    svgElement.classList.add(...animation.className.split(' ').filter(Boolean));
                    const styleElement = doc.createElementNS("http://www.w3.org/2000/svg", "style");
                    styleElement.textContent = animation.css;
                    svgElement.prepend(styleElement);

                    const serializer = new XMLSerializer();
                    finalSvgContent = serializer.serializeToString(doc);
                }
            }
        }


        const blob = new Blob([finalSvgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'animated.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const isNotDownloadable = NOT_DOWNLOADABLE_ANIMATIONS.includes(animationClass);
    const isDisabled = !svgContent || isNotDownloadable;
    
    const buttonText = isNotDownloadable ? 'Effect Not Downloadable' : 'Download Animated SVG';
    const buttonIcon = isNotDownloadable ? (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.367zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div className="p-4 border-t border-gray-700 mt-auto">
            <button
                onClick={handleDownload}
                disabled={isDisabled}
                className={`
                    w-full flex items-center justify-center gap-2 text-center px-4 py-3 rounded-md transition-all duration-200 ease-in-out
                    font-semibold text-base
                    ${isDisabled
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500'
                    }
                `}
                title={isNotDownloadable ? "This animation uses CSS effects that are not supported in a standalone SVG file." : ""}
            >
                {buttonIcon}
                {buttonText}
            </button>
        </div>
    );
};