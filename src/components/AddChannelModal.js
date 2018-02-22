import React from 'react';
import { Form, Button, Modal, Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';

import { allTeamsQuery } from '../graphql/team';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            fluid
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            placeholder="Channel name"
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button fluid disabled={isSubmitting} onClick={onClose}>Cancel</Button>
          <Button fluid disabled={isSubmitting} onClick={handleSubmit}>Create Channel</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

AddChannelModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: {
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name,
            },
          },
        },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) return;
          const data = store.readQuery({ query: allTeamsQuery });
          const teamIdx = findIndex(data.allTeams, ['id', teamId]);
          data.allTeams[teamIdx].channels.push(channel);
          store.writeQuery({ query: allTeamsQuery, data });
        },
      });
      setSubmitting(false);
      onClose();
    },
  }),
)(AddChannelModal);
