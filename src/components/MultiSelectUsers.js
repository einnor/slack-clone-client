import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { getTeamMembersQuery } from '../graphql/team';


const MultiSelectUsers = ({
  data: { loading, getTeamMembers },
  value,
  handleChange,
  placeholder,
}) => {
  if (loading) return null;

  return (
    <Dropdown
      placeholder={placeholder}
      fluid
      multiple
      search
      selection
      value={value}
      onChange={handleChange}
      options={getTeamMembers.map(member => ({ key: member.id, value: member.id, text: member.username }))}
    />
  );
};

MultiSelectUsers.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};


export default graphql(getTeamMembersQuery, {
  options: ({ teamId }) => ({ variables: { teamId } }),
})(MultiSelectUsers);
