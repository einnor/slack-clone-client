import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';

import { allTeamsQuery } from '../graphql/team';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import Messages from '../components/Messages';
import Sidebar from '../containers/Sidebar';

const ViewTeam = ({ data: { loading, allTeams }, match: { params: { teamId, channelId } } }) => {
  if (loading) return null;

  const currentTeamIdx = teamId ? findIndex(allTeams, ['id', parseInt(teamId, 10)]) : 0;
  const currentTeam = allTeams[currentTeamIdx];

  const currentChannelIdx = channelId ? findIndex(currentTeam.channels, ['id', parseInt(channelId, 10)]) : 0;
  const currentChannel = currentTeam.channels[currentChannelIdx];

  return (
    <AppLayout>
      <Sidebar
        teams={allTeams.map(team => ({
          id: team.id,
          letter: team.name.charAt(0).toUpperCase(),
        }))}
        currentTeam={currentTeam}
      />
      <Header channelName={currentChannel.name} />
      <Messages channelId={currentChannel.id}>
        <ul className="message-list">
          <li>Item</li>
        </ul>
      </Messages>
      <SendMessage channelName={currentChannel.name} />
    </AppLayout>
  );
};

ViewTeam.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default graphql(allTeamsQuery)(ViewTeam);
