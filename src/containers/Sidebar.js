import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';

import Teams from '../components/Teams';
import Channels from '../components/Channels';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

export default class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
  };

  toggleAddChannelModal = (e) => {
    if (e) e.preventDefault();
    this.setState(state => ({ openAddChannelModal: !state.openAddChannelModal }));
  };

  toggleeInvitePeopleModal = (e) => {
    if (e) e.preventDefault();
    this.setState(state => ({ openInvitePeopleModal: !state.openInvitePeopleModal }));
  };

  render() {
    const { teams, currentTeam } = this.props;
    const { openInvitePeopleModal, openAddChannelModal } = this.state;

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
        teams={teams}
      />,
      <Channels
        key="channels-sidebar"
        teamId={currentTeam.id}
        teamName={currentTeam.name}
        username={username}
        channels={currentTeam.channels}
        users={[
          { id: 1, name: 'slackbot' },
          { id: 2, name: 'user1' },
        ]}
        onAddChannelClick={this.toggleAddChannelModal}
        onInvitePeopleClick={this.toggleeInvitePeopleModal}
      />,
      <AddChannelModal
        teamId={currentTeam.id}
        onClose={this.toggleAddChannelModal}
        open={openAddChannelModal}
        key="sidebar-add-channel-modal"
      />,
      <InvitePeopleModal
        teamId={currentTeam.id}
        onClose={this.toggleeInvitePeopleModal}
        open={openInvitePeopleModal}
        key="invite-people-modal"
      />,
    ];
  }
}

Sidebar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  teams: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentTeam: PropTypes.object.isRequired,
};
