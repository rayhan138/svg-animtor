
import React, { useState, useCallback } from 'react';

interface DropZoneProps {
    onSvgUpload: (content: string) => void;
    onError: (message: string) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onSvgUpload, onError }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files && e.dataTransfer.files[0];

        if (!file) {
            onError('No file was dropped.');
            return;
        }

        if (file.type !== 'image/svg+xml') {
            onError('Invalid file type. Please upload an SVG file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            if (content) {
                onSvgUpload(content);
            } else {
                onError('Could not read the file content.');
            }
        };
        reader.onerror = () => {
            onError('An error occurred while reading the file.');
        };
        reader.readAsText(file);
    }, [onSvgUpload, onError]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (!file) return;
        
        if (file.type !== 'image/svg+xml') {
            onError('Invalid file type. Please upload an SVG file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            if (content) onSvgUpload(content);
        };
        reader.readAsText(file);
    };


    const dropZoneClasses = `
        flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer
        transition-colors duration-300 ease-in-out
        ${isDragging ? 'border-indigo-400 bg-gray-800/70' : 'border-gray-600 hover:border-indigo-500 hover:bg-gray-800/50'}
    `;

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
             <h2 className="text-xl font-semibold mb-4 text-gray-200">Upload SVG</h2>
            <div
                className={dropZoneClasses}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
            >
                <input
                    id="file-input"
                    type="file"
                    accept="image/svg+xml"
                    className="hidden"
                    onChange={handleFileChange}
                />
                 <div className="text-center">
                     <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-4 text-gray-400">
                        <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">SVG files only</p>
                </div>
            </div>
        </div>
    );
};
