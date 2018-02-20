import React from 'react';

import AppLayout from '../components/AppLayout';
import Channels from '../components/Channels';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';
import Teams from '../components/Teams';

export default () => (
  <AppLayout>
    <Teams teams={[
        { id: 1, letter: 'A' },
        { id: 2, letter: 'B' },
      ]}
    />
    <Channels
      teamName="Team Name"
      userName="User Name"
      channels={[
        { id: 1, name: 'general' },
        { id: 2, name: 'random' },
      ]}
      users={[
        { id: 1, name: 'slackbot' },
        { id: 2, name: 'user1' },
      ]}
    />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list">
        <li>Item</li>
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);
