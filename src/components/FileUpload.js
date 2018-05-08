import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

const FileUpload = ({ children, disableClick }) => (
  <Dropzone
    className="ignore"
    onDrop={() => console.log('File dropped!')}
    disableClick={disableClick}
  >
    {children}
  </Dropzone>
);

FileUpload.propTypes = {
	// eslint-disable-next-line
  children: PropTypes.array.isRequired,
  disableClick: PropTypes.bool.isRequired,
};

export default FileUpload;
