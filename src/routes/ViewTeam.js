import React from 'react';

import AppLayout from '../components/AppLayout';
import Channels from '../components/Channels';
import Header from '../components/Header';
import Input from '../components/Input';
import Messages from '../components/Messages';
import Teams from '../components/Teams';

export default () => (
  <AppLayout>
    <Teams>Teams</Teams>
    <Channels>Channels</Channels>
    <Header>Header</Header>
    <Messages>
      <ul className="message-list">
        <li>Item</li>
      </ul>
    </Messages>
    <Input>
      <input type="text" placeholder="" />
    </Input>
  </AppLayout>
);
