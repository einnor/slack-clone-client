import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';

import { meQuery } from '../graphql/team';
import AppLayout from '../components/AppLayout';
// import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import Sidebar from '../containers/Sidebar';
// import MessageContainer from '../containers/MessageContainer';

const DirectMessage = ({
  mutate, data: { loading, me }, match: { params: { teamId, userId } },
}) => {
  if (loading) return null;

  const { teams, username } = me;

  if (!teams.length) return (<Redirect to="/create-team" />);

  const teamIdInteger = parseInt(teamId, 10);

  const currentTeamIdx = teamIdInteger ? findIndex(teams, ['id', parseInt(teamId, 10)]) : 0;
  const currentTeam = currentTeamIdx === -1 ? teams[0] : teams[currentTeamIdx];

  return (
    <AppLayout>
      <Sidebar
        teams={teams.map(team => ({
          id: team.id,
          letter: team.name.charAt(0).toUpperCase(),
        }))}
        currentTeam={currentTeam}
        username={username}
      />

      <SendMessage
        onSubmit={() => {}}
        placeholder={userId}
      />
    </AppLayout>
  );
};

DirectMessage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
};

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default compose(
  graphql(meQuery, { options: { fetchPolicy: 'network-only' } }),
  graphql(createMessageMutation),
)(DirectMessage);
