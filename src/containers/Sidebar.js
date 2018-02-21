import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';

import Teams from '../components/Teams';
import Channels from '../components/Channels';

const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
  if (loading) return null;

  const currentTeamIdx = currentTeamId ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)]) : 0;
  const currentTeam = allTeams[currentTeamIdx];
  let username = '';
  try {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    // eslint-disable-next-line prefer-destructuring
    username = user.username;
  } catch (err) {
    username = '';
  }

  return [
    <Teams
      key="team-sidebar"
      teams={allTeams.map(team => ({
        id: team.id,
        letter: team.name.charAt(0).toUpperCase(),
      }))}
    />,
    <Channels
      key="channels-sidebar"
      teamName={currentTeam.name}
      username={username}
      channels={currentTeam.channels}
      users={[
        { id: 1, name: 'slackbot' },
        { id: 2, name: 'user1' },
      ]}
    />,
  ];
};

Sidebar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

const allTeamsQuery = graphql(gql`
  query {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }`);

// Enhance our component.
const SidebarWithData = allTeamsQuery(Sidebar);

// Export the enhanced component.
export default SidebarWithData;
