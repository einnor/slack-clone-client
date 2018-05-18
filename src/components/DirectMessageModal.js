import React from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import MultiSelectUsers from './MultiSelectUsers';
import { withFormik } from 'formik';

const DirectMessageModal = ({
  open,
  onClose,
  teamId,
  currentUserId,
  values,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue,
}) => (
  <Modal open={open} onClose={onClose} style={{ margin: '100px auto 0 auto', marginTop: '100px !important' }}>
    <Modal.Header>Direct Message</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <MultiSelectUsers
            value={values.members}
            handleChange={(e, { value }) => setFieldValue('members', value)}
            teamId={teamId}
            placeholder="Select members to invite"
            currentUserId={currentUserId}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button
            fluid
            onClick={(e) => {
              resetForm();
              onClose(e);
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button fluid onClick={handleSubmit} disabled={isSubmitting}>Start Messaging</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

DirectMessageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
  currentUserId: PropTypes.number.isRequired,
  // eslint-disable-next-line
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

const getOrCreateDirectMessageChannelMutation = gql`
  mutations($teamId: Int!, $members: [Int!]!) {
    getOrCreateDirectMessageChannel(teamId: $teamId, members: $members)
  }
`;

export default compose(
  withRouter,
  graphql(getOrCreateDirectMessageChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ members: [] }),
    handleSubmit: async ({ members }, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      const response = await mutate({ variables: { members, teamId } });
      setSubmitting(false);
      onClose();
    },
  }),
)(DirectMessageModal);
