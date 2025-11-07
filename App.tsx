import React, { useState, useCallback } from 'react';
import { DropZone } from './components/DropZone';
import { SvgPreview } from './components/SvgPreview';
import { AnimationSelector } from './components/AnimationSelector';
import { DownloadButton } from './components/DownloadButton';
import { AnimationControls } from './components/AnimationControls';
import { ANIMATION_OPTIONS } from './constants';
import { AnimationState } from './types';

const App: React.FC = () => {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [selectedAnimation, setSelectedAnimation] = useState<string>(ANIMATION_OPTIONS[0].className);
    const [error, setError] = useState<string | null>(null);
    const [animationState, setAnimationState] = useState<AnimationState>('running');
    const [animationKey, setAnimationKey] = useState<number>(0);

    const resetAnimation = useCallback(() => {
        setAnimationKey(prevKey => prevKey + 1);
        setAnimationState('running');
    }, []);

    const handleSvgUpload = useCallback((content: string) => {
        setSvgContent(content);
        setError(null);
        resetAnimation();
    }, [resetAnimation]);

    const handleError = useCallback((message: string) => {
        setError(message);
        setSvgContent(null);
    }, []);

    const handleSelectAnimation = useCallback((className: string) => {
        setSelectedAnimation(className);
        resetAnimation();
    }, [resetAnimation]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
            <header className="w-full max-w-5xl mx-auto text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    SVG Animator
                </h1>
                <p className="text-lg text-gray-400 mt-2">
                    Drag & drop an SVG file, then pick an animation to bring it to life.
                </p>
            </header>

            <main className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-8">
                    <AnimationSelector
                        animations={ANIMATION_OPTIONS}
                        selectedAnimation={selectedAnimation}
                        onSelectAnimation={handleSelectAnimation}
                    />
                    <DropZone onSvgUpload={handleSvgUpload} onError={handleError} />
                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                </div>

                <div className="bg-gray-800/50 rounded-lg border border-gray-700 shadow-2xl flex flex-col min-h-[450px] lg:min-h-0">
                    <div className="flex-grow relative flex flex-col">
                         <AnimationControls
                            onPlay={() => setAnimationState('running')}
                            onPause={() => setAnimationState('paused')}
                            onReset={resetAnimation}
                            animationState={animationState}
                            isDisabled={!svgContent}
                         />
                         <SvgPreview 
                            svgContent={svgContent} 
                            animationClass={selectedAnimation} 
                            animationState={animationState}
                            animationKey={animationKey}
                        />
                    </div>
                    <DownloadButton svgContent={svgContent} animationClass={selectedAnimation} />
                </div>
            </main>
            
            <footer className="w-full max-w-5xl mx-auto text-center mt-12 text-gray-500 text-sm">
                <p>Built with React, TypeScript, and Tailwind CSS.</p>
            </footer>
        </div>
    );
};

export default App;