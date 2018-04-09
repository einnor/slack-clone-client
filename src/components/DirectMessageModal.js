import React from 'react';
import { Form, Button, Modal, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const DirectMessageModal = ({
  history,
  open,
  onClose,
  teamId,
  data: { loading, getTeamMembers },
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          {!loading &&
            (<Downshift
              onChange={(selectedUser) => {
                history.push(`/view-teams/users/${teamId}/${selectedUser.id}`);
                onClose();
              }}
              render={({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                selectedItem,
                highlightedIndex,
              }) => (
                <div>
                  <Input {...getInputProps({ placeholder: 'Search users' })} fluid name="" />
                  {isOpen ? (
                    <div style={{ border: '1px solid #ccc' }}>
                      {getTeamMembers
                        .filter(user =>
                          !inputValue ||
                          user.username.toLowerCase().includes(inputValue.toLowerCase()))
                        .map((item, index) => (
                          <div
                            {...getItemProps({ item })}
                            key={item.id}
                            style={{
                              backgroundColor:
                                highlightedIndex === index ? 'gray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            }}
                          >
                            {item.username}
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>
              )}
            />)
          }
        </Form.Field>
        <Form.Group widths="equal">
          <Button fluid onClick={onClose}>Cancel</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

DirectMessageModal.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

const getTeamMembersQuery = gql`
  query($teamId: Int!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`;

export default withRouter(graphql(getTeamMembersQuery)(DirectMessageModal));
