import React, { Component } from 'react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Register extends Component {

  state = {
    username: '',
    email: '',
    password: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });

    console.log(response);
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <Container text>
        <Header as='h2'>Register</Header>
        <Input fluid onChange={this.onChange} value={username} name='username' placeholder='username...' />
        <Input fluid onChange={this.onChange} value={email} name='email' placeholder='email...' />
        <Input fluid onChange={this.onChange} value={password} name='password' placeholder='password...' type='password' />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  };
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);
