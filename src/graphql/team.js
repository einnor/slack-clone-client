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
    inviteTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }`;

export const idk = {};
