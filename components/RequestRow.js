import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
  state = { loadingApprove: false, loadingFinalize: false };

  onApprove = async () => {
    this.setState({ loadingApprove: true });

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .approveRequest(this.props.id)
        .send({ from: accounts[0] });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {}

    this.setState({ loadingApprove: false });
  };

  onFinalize = async () => {
    this.setState({ loadingFinalize: true });

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .finalizeRequest(this.props.id)
        .send({ from: accounts[0] });

      // Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {}

    this.setState({ loadingFinalize: false });
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
            loading={this.state.loadingApprove}
            color='green'
            basic
            onClick={this.onApprove}
          >
            Approve
          </Button>
        </Cell>
        <Cell>
          <Button
            loading={this.state.loadingFinalize}
            color='teal'
            basic
            onClick={this.onFinalize}
          >
            Finalize
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
