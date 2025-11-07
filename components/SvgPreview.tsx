import React, { useMemo, useState, useEffect } from 'react';
import { AnimationState } from '../types';
import { processDrawAnimation } from '../utils/svgProcessor';

interface SvgPreviewProps {
    svgContent: string | null;
    animationClass: string;
    animationState: AnimationState;
    animationKey: number;
}

const MASK_ANIMATIONS = ['animate-light-sweep', 'animate-glitch', 'animate-gradient-flow'];
const PROCESSED_ANIMATIONS = ['animate-draw-and-fill'];

export const SvgPreview: React.FC<SvgPreviewProps> = ({ svgContent, animationClass, animationState, animationKey }) => {
    const [processedSvg, setProcessedSvg] = useState<string | null>(null);

    useEffect(() => {
        if (svgContent && PROCESSED_ANIMATIONS.includes(animationClass)) {
            if (animationClass === 'animate-draw-and-fill') {
                const result = processDrawAnimation(svgContent);
                setProcessedSvg(result);
            }
        } else {
            setProcessedSvg(null);
        }
    }, [svgContent, animationClass, animationKey]);

    const svgDataUri = useMemo(() => {
        if (!svgContent) return null;
        try {
            const unescaped = unescape(encodeURIComponent(svgContent));
            return `url('data:image/svg+xml;base64,${btoa(unescaped)}')`;
        } catch (e) {
            console.error("Failed to encode SVG for masking:", e);
            return null;
        }
    }, [svgContent]);

    const isMaskAnimation = MASK_ANIMATIONS.includes(animationClass);
    const isProcessedAnimation = PROCESSED_ANIMATIONS.includes(animationClass);

    const containerStyle: React.CSSProperties = useMemo(() => {
        if (isMaskAnimation && svgDataUri) {
            return {
                backgroundColor: animationClass === 'animate-gradient-flow' ? undefined : 'white',
                maskImage: svgDataUri,
                WebkitMaskImage: svgDataUri,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
            };
        }
        return {};
    }, [isMaskAnimation, svgDataUri, animationClass]);
    
    const finalStyle: React.CSSProperties = {
        ...containerStyle,
        animationPlayState: animationState,
    };

    const finalProcessedSvg = useMemo(() => {
        if (!processedSvg) return null;
        const parser = new DOMParser();
        const doc = parser.parseFromString(processedSvg, "image/svg+xml");
        const svgElement = doc.documentElement;
        if (animationState === 'paused') {
            svgElement.classList.add('animation-paused');
        } else {
            svgElement.classList.remove('animation-paused');
        }
        const serializer = new XMLSerializer();
        return serializer.serializeToString(doc);
    }, [processedSvg, animationState]);

    const contentToRender = isProcessedAnimation ? finalProcessedSvg : svgContent;

    return (
        <div className="w-full h-full flex items-center justify-center p-8 flex-grow">
            {svgContent ? (
                <div
                    key={`${animationClass}-${animationKey}`}
                    className={`w-full h-full flex items-center justify-center relative overflow-hidden ${isProcessedAnimation || isMaskAnimation ? '' : animationClass}`}
                    style={finalStyle}
                >
                    {isMaskAnimation ? null : (
                        <div
                            className="w-full h-full"
                            dangerouslySetInnerHTML={{ __html: contentToRender || '' }}
                        />
                    )}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <svg className="mx-auto h-24 w-24 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-4 text-lg">Your SVG will appear here</p>
                    <p className="text-sm">Drop a file to get started</p>
                </div>
            )}
        </div>
    );
};