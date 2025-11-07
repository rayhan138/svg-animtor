import React from 'react';
import { AnimationState } from '../types';

interface AnimationControlsProps {
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
    animationState: AnimationState;
    isDisabled: boolean;
}

const ControlButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; title: string; }> = ({ onClick, disabled, children, title }) => {
    const baseClasses = `
        p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500
    `;
    const disabledClasses = 'text-gray-600 bg-gray-700/50 cursor-not-allowed';
    const enabledClasses = 'text-gray-300 bg-gray-700 hover:bg-gray-600';
    
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
            title={title}
        >
            {children}
        </button>
    );
};


export const AnimationControls: React.FC<AnimationControlsProps> = ({ onPlay, onPause, onReset, animationState, isDisabled }) => {
    return (
        <div className="w-full p-2 border-b border-gray-700 flex justify-center items-center space-x-3 bg-gray-800/70">
            {animationState === 'running' ? (
                <ControlButton onClick={onPause} disabled={isDisabled} title="Pause">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </ControlButton>
            ) : (
                <ControlButton onClick={onPlay} disabled={isDisabled} title="Play">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                </ControlButton>
            )}
             <ControlButton onClick={onReset} disabled={isDisabled} title="Reset">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
            </ControlButton>
        </div>
    );
};
