import React from 'react';

import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';
import Sidebar from '../containers/Sidebar';

export default () => (
  <AppLayout>
    <Sidebar currentTeamId={1} />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list">
        <li>Item</li>
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);
