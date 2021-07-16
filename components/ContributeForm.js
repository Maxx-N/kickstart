import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

class ContributeForm extends Component {
  state = { contribution: '' };

  onChange = (event) => {
    this.setState({ contribution: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Contribute to this campaign!</label>
          <Input
            label='ether'
            labelPosition='right'
            value={this.state.contribution}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary>Contribute!</Button>
      </Form>
    );
  }
}

export default ContributeForm;
