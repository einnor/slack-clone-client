import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Message, Form, Container, Header, Input, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errors: {},
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password },
    });

    const {
      ok,
      token,
      refreshToken,
      errors,
    } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
  };

  render() {
    const {
      email, password, errors: { emailError, passwordError },
    } = this;

    const errorList = [];

    if (emailError) errorList.push(emailError);
    if (passwordError) errorList.push(passwordError);

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
          <Form.Field error={!!emailError}>
            <Input
              fluid
              onChange={this.onChange}
              value={email}
              name="email"
              placeholder="email..."
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              fluid
              onChange={this.onChange}
              value={password}
              name="password"
              placeholder="password..."
              type="password"
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {
          errorList.length ?
            (
              <Message
                error
                header="There was some errors with your submission"
                list={errorList}
              />
            ) : null
        }
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login( email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

Login.propTypes = {
  mutate: PropTypes.func.isRequired,
  history: PropTypes.node.isRequired,
};

export default graphql(loginMutation)(observer(Login));
