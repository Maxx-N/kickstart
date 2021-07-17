import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
  state = { loading: false };

  onApprove = async () => {
    this.setState({ loading: true });

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .approveRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (err) {}

    this.setState({ loading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { description, value, recipient, approvalCount } = this.props.request;
    const { id, approversCount } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>
          {approvalCount}/{approversCount}
        </Cell>
        <Cell>
          <Button
            loading={this.state.loading}
            color='green'
            basic
            onClick={this.onApprove}
          >
            Approve
          </Button>
        </Cell>
        <Cell>Finalize</Cell>
      </Row>
    );
  }
}

export default RequestRow;
