import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class RequestRow extends Component {
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
        <Cell>Approve</Cell>
        <Cell>Finalize</Cell>
      </Row>
    );
  }
}

export default RequestRow;
