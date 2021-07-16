import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

class CampaignShow extends Component {
  // Used only by Next.js
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsNumber: summary[2],
      approverCount: summary[3],
      managerAddress: summary[4],
    };
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
      </Layout>
    );
  }
}

export default CampaignShow;
