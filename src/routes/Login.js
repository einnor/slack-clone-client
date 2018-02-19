import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Input, Button } from 'semantic-ui-react';

export default observer(class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = () => {
    const { email, password } = this;
  };

  render() {
    const { email, password } = this;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          fluid
          onChange={this.onChange}
          value={email}
          name="email"
          placeholder="email..."
        />
        <Input
          fluid
          onChange={this.onChange}
          value={password}
          name="password"
          placeholder="password..."
          type="password"
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
});
