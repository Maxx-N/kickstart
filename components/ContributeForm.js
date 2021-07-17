import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
  state = { value: '', loading: false };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const campaign = Campaign(this.props.address);

    const weiAmount = web3.utils.toWei(this.state.value, 'ether');

    const accounts = await web3.eth.getAccounts();

    console.log(accounts[0]);

    // await campaign.methods
    //   .contribute()
    //   .send({ from: accounts[0], gas: weiAmount });

    // this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Contribute to this campaign!</label>
          <Input
            value={this.state.value}
            onChange={(event) => {
              this.setState({ value: event.target.value });
            }}
            label='ether'
            labelPosition='right'
          />
        </Form.Field>
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
