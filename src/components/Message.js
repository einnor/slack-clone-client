import React from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import RenderText from './RenderText';

const Message = ({ message: { url, text, filetype } }) => {
  if (url) {
    if (filetype.startsWith('image/')) {
      return (<img src={url} alt="" />);
    } else if (filetype.startsWith('text/')) {
      return (<RenderText url={url} />);
    } else if (filetype.startsWith('audio/')) {
      return (
        <div>
          <audio controls>
            <track kind="captions" />
            <source src={url} type={filetype} />
          </audio>
        </div>
      );
    }
  }
  return (<Comment.Text>{text}</Comment.Text>);
};

Message.propTypes = {
  // eslint-disable-next-line
  message: PropTypes.object,
};

export default Message;