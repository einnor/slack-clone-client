import React, { Component } from 'react';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Register extends Component {

  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });

    const { username, email, password } = this.state;

    const response = await this.props.mutate({
      variables: { username, email, password },
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/home');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };

  render() {
    const { username, email, password, usernameError, emailError, passwordError } = this.state;

    const errorList = [];

    if (usernameError) errorList.push(usernameError);
    if (emailError) errorList.push(emailError);
    if (passwordError) errorList.push(passwordError);

    return (
      <Container text>
        <Header as='h2'>Register</Header>
        <Input
          fluid
          error={!!usernameError}
          onChange={this.onChange}
          value={username}
          name='username'
          placeholder='username...'
        />
        <Input
          fluid
          error={!!emailError}
          onChange={this.onChange}
          value={email}
          name='email'
          placeholder='email...'
        />
        <Input
          fluid
          error={!!passwordError}
          onChange={this.onChange}
          value={password}
          name='password'
          placeholder='password...'
          type='password'
        />
        <Button onClick={this.onSubmit}>Submit</Button>

        {
          usernameError || emailError || passwordError ?
            (
              <Message
                error
                header='There was some errors with your submission'
                list={errorList}
              />
            ) : null
        }
      </Container>
    );
  };
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
