import React from 'react';
import { Form, Button, Modal, Input, Checkbox } from 'semantic-ui-react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';

import { meQuery } from '../graphql/team';
import MultiSelectUsers from './MultiSelectUsers';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue,
  teamId,
}) => (
  <Modal
    open={open}
    onClose={(e) => {
      resetForm();
      onClose(e);
    }}
    style={{ margin: '100px auto 0 auto', marginTop: '100px !important' }}
  >
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
        <Form.Field>
          <Checkbox
            value={!values.public}
            label="Private"
            toggle
            onChange={(e, { checked }) => setFieldValue('public', !checked)}
          />
        </Form.Field>
        {values.public ? null :
          (
            <Form.Field>
              <MultiSelectUsers
                value={values.members}
                handleChange={(e, { value }) => setFieldValue('members', value)}
                teamId={teamId}
                placeholder="Select members to invite"
              />
            </Form.Field>
          )
        }
        <Form.Group widths="equal">
          <Button
            fluid
            disabled={isSubmitting}
            onClick={(e) => {
              resetForm();
              onClose(e);
            }}
          >Cancel
          </Button>
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
  resetForm: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
};

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!, $public: Boolean, $members: [Int!]) {
    createChannel(teamId: $teamId, name: $name, public: $public, members: $members) {
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
    mapPropsToValues: () => ({ public: true, name: '', members: [] }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      await mutate({
        variables: {
          teamId,
          name: values.name,
          public: values.public,
          members: values.members,
        },
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
          const data = store.readQuery({ query: meQuery });
          const teamIdx = findIndex(data.me.teams, ['id', teamId]);
          data.me.teams[teamIdx].channels.push(channel);
          store.writeQuery({ query: meQuery, data });
        },
      });
      setSubmitting(false);
      onClose();
    },
  }),
)(AddChannelModal);
