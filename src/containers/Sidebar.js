import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Teams from '../components/Teams';
import Channels from '../components/Channels';
import AddChannelModal from '../components/AddChannelModal';
import DirectMessageModal from '../components/DirectMessageModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

export default class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false,
  };

  toggleAddChannelModal = (e) => {
    if (e) e.preventDefault();
    this.setState(state => ({ openAddChannelModal: !state.openAddChannelModal }));
  };

  toggleDirectMessageModal = (e) => {
    if (e) e.preventDefault();
    this.setState(state => ({ openDirectMessageModal: !state.openDirectMessageModal }));
  };

  toggleeInvitePeopleModal = (e) => {
    if (e) e.preventDefault();
    this.setState(state => ({ openInvitePeopleModal: !state.openInvitePeopleModal }));
  };

  render() {
    const {
      teams, currentTeam, username, currentUserId,
    } = this.props;
    const { openInvitePeopleModal, openAddChannelModal, openDirectMessageModal } = this.state;

    const regularChannels = [];
    const directMessageChannels = [];

    currentTeam.channels.forEach((channel) => {
      if (channel.dm) {
        directMessageChannels.push(channel);
      } else {
        regularChannels.push(channel);
      }
    });
    return [
      <Teams
        key="team-sidebar"
        teams={teams}
      />,
      <Channels
        key="channels-sidebar"
        teamId={currentTeam.id}
        teamName={currentTeam.name}
        isOwner={currentTeam.admin}
        username={username}
        channels={regularChannels}
        directMessageChannels={directMessageChannels}
        onAddChannelClick={this.toggleAddChannelModal}
        onDirectMessageClick={this.toggleDirectMessageModal}
        onInvitePeopleClick={this.toggleeInvitePeopleModal}
      />,
      <AddChannelModal
        teamId={currentTeam.id}
        onClose={this.toggleAddChannelModal}
        open={openAddChannelModal}
        key="sidebar-add-channel-modal"
        currentUserId={currentUserId}
      />,
      <DirectMessageModal
        teamId={currentTeam.id}
        onClose={this.toggleDirectMessageModal}
        open={openDirectMessageModal}
        key="direct-message-modal"
        currentUserId={currentUserId}
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
  username: PropTypes.string.isRequired,
  currentUserId: PropTypes.number.isRequired,
};
