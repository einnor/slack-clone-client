import React from 'react';
import styled from 'styled-components';
import { Input, Button, Icon } from 'semantic-ui-react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';

import FileUpload from './FileUpload';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
  display: grid;
  grid-template-columns: 40px calc(100% - 40px);
`;

const ENTER_KEY = 13;

const SendMessage = ({
  placeholder,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  channelId,
}) => (
  <SendMessageWrapper>
    <FileUpload channelId={channelId}>
      <Button icon style={{ width: 45, height: '100%' }}>
        <Icon name="plus" />
      </Button>
    </FileUpload>
    <Input
      name="message"
      value={values.message}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e);
        }
      }}
      placeholder={`Message #${placeholder}`}
    />
  </SendMessageWrapper>
);

SendMessage.propTypes = {
  placeholder: PropTypes.string.isRequired,
  // eslint-disable-next-line
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  channelId: PropTypes.number.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({ message: '' }),
  handleSubmit: async (values, { props: { onSubmit }, setSubmitting, resetForm }) => {
    if (!values.message || !values.message.trim()) {
      setSubmitting(false);
      return;
    }

    await onSubmit(values.message);
    resetForm(false);
  },
})(SendMessage);
