import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import  PropTypes from 'prop-types';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = styled.li`${paddingLeft};`;

const PushLeft = styled.div`${paddingLeft};`;

const Green = styled.span`color: #38978d;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');
Bubble.propTypes = {
  on: PropTypes.bool.isRequired,
};

const channel = ({ id, name }, teamId) => <Link to={`/view-teams/${teamId}/${id}`} key={`channel-${id}`}><SideBarListItem># {name}</SideBarListItem></Link>;
channel.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const directMessageChannel = ({ id, name }, teamId) => (
  <SideBarListItem key={`direct-message-channel-${id}`}>
    <Link to={`/view-teams/users/${teamId}/${id}`}><Bubble /> {name}</Link>
  </SideBarListItem>
);
directMessageChannel.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const Channels = ({
  teamName,
  username,
  channels,
  directMessageChannels,
  onAddChannelClick,
  onDirectMessageClick,
  teamId,
  onInvitePeopleClick,
  isOwner,
}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>Channels {isOwner && <Icon onClick={onAddChannelClick} name="add circle" />}</SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages <Icon onClick={onDirectMessageClick} name="add circle" /></SideBarListHeader>
        {directMessageChannels.map(dmc => directMessageChannel(dmc, teamId))}
      </SideBarList>
    </div>
    {isOwner && (
      <div>
        <a href="#invite-people" onClick={onInvitePeopleClick}>Invite People</a>
      </div>
    )}
  </ChannelWrapper>
);

Channels.propTypes = {
  teamName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  // eslint-disable-next-line
  channels: PropTypes.array.isRequired,
  // eslint-disable-next-line
  directMessageChannels: PropTypes.array.isRequired,
  onAddChannelClick: PropTypes.func.isRequired,
  onDirectMessageClick: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
  onInvitePeopleClick: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default Channels;
