export interface AnimationOption {
    name: string;
    className: string;
    css?: string; // CSS rules to be embedded for download
}

export type AnimationState = 'running' | 'paused';
