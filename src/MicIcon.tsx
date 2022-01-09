import React from 'react';
import type { FC } from 'react';

const MicIcon: FC<{ muted: boolean, level: number }> = ({ muted, level }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32px" height="32px" style={{ opacity: Math.max(0.5, 1 - level) }}>
      {muted ? (
        <>
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M432 400L96 64"/>
          <path fill="currentColor" d="M400 240v-31.55c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 208v32a111.68 111.68 0 01-2.68 24.38 2 2 0 00.53 1.84l22.59 22.59a2 2 0 003.29-.72A143.27 143.27 0 00400 240zM256 352a112.36 112.36 0 01-112-112v-31.55c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 208v32c0 74 56.1 135.12 128 143.11V432h-47.55c-8.61 0-16 6.62-16.43 15.23A16 16 0 00192 464h127.55c8.61 0 16-6.62 16.43-15.23A16 16 0 00320 432h-48v-48.89a143.08 143.08 0 0052-16.22 4 4 0 00.91-6.35l-18.4-18.39a3 3 0 00-3.41-.58A111 111 0 01256 352zM257.14 48a79.66 79.66 0 00-68.47 36.57 4 4 0 00.54 5L332.59 233a2 2 0 003.41-1.42V128.91C336 85 301 48.6 257.14 48z"/>
          <path fill="currentColor" d="M179.41 215a2 2 0 00-3.41 1.42V239a80.89 80.89 0 0023.45 56.9 78.55 78.55 0 0077.8 21.19 2 2 0 00.86-3.35z"/>
        </>
      ) : (
        <>
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80"/>
          <path fill="currentColor" d="M256 320a78.83 78.83 0 01-56.55-24.1A80.89 80.89 0 01176 239V128a79.69 79.69 0 0180-80c44.86 0 80 35.14 80 80v111c0 44.66-35.89 81-80 81z"/>
        </>
      )}
    </svg>
  );
};

export default MicIcon;
