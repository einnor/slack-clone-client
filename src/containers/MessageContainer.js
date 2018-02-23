import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Messages from '../components/Messages';

const MessageContainer = ({ data: { loading, messages }, channelId }) => {
  if (loading) return null;
  return (
    <Messages>
      <ul className="message-list">
        <li>{messages}{channelId}</li>
      </ul>
    </Messages>
  );
};

MessageContainer.propTypes = {
  channelId: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId,
  }),
})(MessageContainer);
