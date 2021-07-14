import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class CampaignIndex extends Component {
  // Used only by Next.js
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    // return <div>{this.props.campaigns[0]}</div>;
    return <div>{this.renderCampaigns()}</div>;
  }
}

export default CampaignIndex;
