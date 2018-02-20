import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const Home = ({ data: { loading, getAllUsers } }) => {
  if (loading) return null;

  return (
    <ul>
      {getAllUsers.map(({ id, email }) => (
        <li key={id}>{email}</li>
      ))}
    </ul>
  );
};

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

// Create our enhancer function.
const getAllUsersQuery = graphql(gql`
  query {
    getAllUsers {
      id
      email
    }
  }`);

// Enhance our component.
const HomeWithData = getAllUsersQuery(Home);

// Export the enhanced component.
export default HomeWithData;
