import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import Peer from 'skyway-js';
import type { MeshRoom, SFURoom } from 'skyway-js';

import './App.css';
import Mic from './Mic';
import UserCard from './Card';
import type { User } from './Card';

const App: FC = () => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [room, setRoom] = useState<MeshRoom | SFURoom | null>(null);
  const [mic, setMic] = useState<MediaStream | null>(null);
  const [mute, setMute] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const peer = new Peer({
      key: process.env.API_KEY,
      debug: 2,
    });
    peer.on('open', () => {
      setPeer(peer);
    });
    return () => {
      peer.destroy();
    };
  }, []);

  useEffect(() => {
    if (!peer || !mic) {
      return;
    }

    const r = peer.joinRoom('robby', {
      stream: mic,
    });
    r.on('open', () => {
      setRoom(r);
    });
    r.on('close', () => setRoom(null));
    r.on('peerLeave', (peerID: string) => {
      setUsers((xs) => xs.filter((u: User) => u.id !== peerID));
    });
    r.on('stream', (stream: MediaStream & { peerId: string }) => {
      r.send({ mute });
      setUsers((xs) => ([...xs, {
        id: stream.peerId,
        mute: true,
        stream,
      }]));
    });
    r.on('data', (data: { src: string, data: { mute: boolean } }) => {
      const { src, data: { mute } } = data;
      if (typeof mute !== 'boolean') {
        return;
      }
      setUsers((xs) => {
        xs = [...xs];
        for (let i = 0; i < xs.length; i++) {
          if (xs[i].id === src) {
            xs[i].mute = mute;
          }
        }
        return xs;
      });
    });
  }, [peer]);

  useEffect(() => {
    if (!room || !mic) {
      return;
    }

    room.replaceStream(mic);
  }, [mic]);

  return (<>
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          <UserCard {...u} />
        </li>
      ))}
    </ul>
    <hr />
    Your ID: {peer?.id ?? 'connecting...'}
    <Mic onStreamChange={setMic} mute={mute} onMuteChange={(m: boolean) => {
      setMute(m);
      if (room) {
        room.send({ mute: m });
      }
    }} />
  </>);
};

export default App;
