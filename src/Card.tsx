import React, { useState } from 'react';
import type { FC } from 'react';

import AudioPlayback from './AudioPlayback';
import MicIcon from './MicIcon';
import './Card.css';

export interface User {
  id: string;
  mute: boolean;
  stream: MediaStream | null;
}

const UserCard: FC<User> = ({ id, mute, stream }) => {
  const [level, setLevel] = useState(0);

  return (
    <div className="user-card">
      <MicIcon muted={mute} level={level} />
      {id}
      <AudioPlayback stream={stream} onLevel={setLevel} />
    </div>
  );
};

export default UserCard;
