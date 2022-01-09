import React, { useState, useEffect } from 'react';
import type { FC } from 'react';

function levelMeter(stream: MediaStream, onLevel: (level: number) => void): () => void {
  const ctx = new window.AudioContext();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 32;
  ctx.createMediaStreamSource(stream).connect(analyser);

  const data = new Uint8Array(analyser.frequencyBinCount);

  let id = 0;
  function update() {
    id = requestAnimationFrame(update);

    analyser.getByteFrequencyData(data);

    onLevel(data.reduce((x, y) => x + y) / data.length / 256);
  }
  update();

  return () => {
    cancelAnimationFrame(id);
    ctx.close();
  };
};

const LevelMeter: FC<{ stream: MediaStream | null; disabled: bool; onLevel?: (level: number) => void }> = ({ stream, disabled, onLevel }) => {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (stream) {
      return levelMeter(stream, (l: number) => {
        setLevel(l);
        if (onLevel) {
          onLevel(l);
        }
      });
    }
  }, [stream]);

  return (
    <progress className="level-meter" value={level} disabled={disabled} />
  );
};

export default LevelMeter;
