import React from 'react';
import Dropzone from 'react-dropzone';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

const FileUpload = ({ children, disableClick, channelId, mutate }) => (
  <Dropzone
    className="ignore"
    onDrop={async ([file]) => {
      const response = await mutate({ variables: { channelId, file } });
      console.log(response);
    }}
    disableClick={disableClick}
  >
    {children}
  </Dropzone>
);

FileUpload.propTypes = {
	// eslint-disable-next-line
  children: PropTypes.array.isRequired,
  disableClick: PropTypes.bool.isRequired,
  channelId: PropTypes.number.isRequired,
  mutate: PropTypes.func.isRequired,
};

const createFileMessageMutation = gql`
  mutation($channelId: Int!, $file: File) {
    createMessage(channelId: $channelId, file: $file)
  }
`;

export default graphql(createFileMessageMutation)(FileUpload);
