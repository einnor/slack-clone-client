import gql from 'graphql-tag';

export const allTeamsQuery = gql`
  query {
    allTeams {
      id
      owner
      name
      channels {
        id
        name
      }
    }
    inviteTeams {
      id
      owner
      name
      channels {
        id
        name
      }
    }
  }`;

export const idk = {};
