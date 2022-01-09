import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import './Mic.css';

import LevelMeter from './LevelMeter';

interface MicDevice {
  name: string;
  id: string;
}

async function GetMicList(): Promise<MicDevice[]> {
  const result: MicDevice[] = [];

  for (const dev of await navigator.mediaDevices.enumerateDevices()) {
    if (dev.kind === 'audioinput') {
      result.push({
        id: dev.deviceId,
        name: dev.label || dev.deviceId,
      });
    }
  }

  return result;
}

const MicSelector: FC<{ value: MicDevice | null; onChange: (m: MicDevice | null) => void }> = ({ value, onChange }) => {
  const [list, setList] = useState<MicDevice[]>([]);

  useEffect(() => {
    GetMicList().then((list) => setList(list));
  }, []);

  const set = (id: string) => {
    const selected = list.filter((x) => x.id === id);
    if (selected.length === 0) {
      onChange(null);
    } else {
      onChange(selected[0]);
    }
  };

  return (
    <select value={value?.id ?? ''} onChange={(ev) => set(ev.target.value || '')}>
      {list.map((dev) => (
        <option key={dev.id} value={dev.id}>{dev.name}</option>
      ))}
    </select>
  );
};

const MuteButton: FC<{ mute: boolean, onChange: (v: boolean) => void }> = ({ mute, onChange }) => {
  return (
    <button onClick={() => onChange(!mute)}>
      {mute ? 'mic: off' : 'mic: on'}
    </button>
  );
};

const Mic: FC<{ onStreamChange: (m: MediaStream | null) => void; mute: boolean; onMuteChange: (mute: boolean) => void }> = ({ onStreamChange, mute, onMuteChange }) => {
  const [dev, setDev] = useState<MicDevice | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
        audio: { deviceId: dev?.id },
    }).then((s) => {
      setStream(s);
      onStreamChange(s);
    });
  }, [dev]);

  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => track.enabled = !mute);
    }
  }, [stream, mute]);

  return (
    <div className="mic-container">
      <LevelMeter stream={stream} disabled={mute} />
      <MuteButton mute={mute} onChange={onMuteChange} />
      <MicSelector value={dev} onChange={setDev} />
    </div>
  );
};

export default Mic;
