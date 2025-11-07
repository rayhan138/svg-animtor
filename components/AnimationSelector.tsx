
import React from 'react';
import { AnimationOption } from '../types';

interface AnimationSelectorProps {
    animations: AnimationOption[];
    selectedAnimation: string;
    onSelectAnimation: (className: string) => void;
}

export const AnimationSelector: React.FC<AnimationSelectorProps> = ({ animations, selectedAnimation, onSelectAnimation }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">Choose an Animation</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {animations.map((anim) => {
                    const isSelected = anim.className === selectedAnimation;
                    const buttonClasses = `
                        w-full text-center px-4 py-2 rounded-md transition-all duration-200 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
                        ${isSelected
                            ? 'bg-indigo-600 text-white font-semibold shadow-lg'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                        }
                    `;
                    return (
                        <button
                            key={anim.name}
                            className={buttonClasses}
                            onClick={() => onSelectAnimation(anim.className)}
                        >
                            {anim.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
