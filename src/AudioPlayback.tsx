import React, { useRef, useEffect } from 'react';
import type { FC } from 'react';

import LevelMeter from './LevelMeter';

const AudioPlayback: FC<{ stream: MediaStream | null; onLevel?: (level: number) => void }> = ({ stream, onLevel }) => {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.srcObject = stream;
    ref.current.play();
  }, [ref.current, stream]);

  return (<>
    <audio ref={ref} />
    <LevelMeter stream={stream} onLevel={onLevel} />
  </>);
};

export default AudioPlayback;
