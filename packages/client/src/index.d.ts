declare module '*.jpg';
declare module '*.png';
declare module '*.wav';

declare module '*.svg' {
  const content: any;
  export default content;
}
