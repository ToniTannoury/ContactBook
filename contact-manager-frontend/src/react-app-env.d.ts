/// <reference types="react-scripts" />
declare module 'buffer' {
  const Buffer: typeof globalThis.Buffer;
  export { Buffer };
}
declare module 'crypto' {
  const crypto: typeof import('crypto-browserify');
  export = crypto;
}