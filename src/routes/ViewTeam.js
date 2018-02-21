import React from 'react';
import PropTypes from 'prop-types';

import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';
import Sidebar from '../containers/Sidebar';

const ViewTeam = ({ match: { params } }) => (
  <AppLayout>
    <Sidebar currentTeamId={params.teamId} />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list">
        <li>Item</li>
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);

ViewTeam.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default ViewTeam;
