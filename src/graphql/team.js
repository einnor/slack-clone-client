import gql from 'graphql-tag';

export const allTeamsQuery = gql`
  query {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }`;
