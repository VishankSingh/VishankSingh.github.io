declare module 'three/addons/effects/AsciiEffect.js' {
  import { WebGLRenderer, Scene, Camera } from 'three';

  export interface AsciiEffectOptions {
    resolution?: number;
    scale?: number;
    color?: boolean;
    alpha?: boolean;
    block?: boolean;
    invert?: boolean;
    strResolution?: 'low' | 'medium' | 'high';
  }

  export class AsciiEffect {
    constructor(
      renderer: WebGLRenderer,
      charSet?: string,
      options?: AsciiEffectOptions
    );
    domElement: HTMLDivElement;
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: Camera): void;
  }
}
