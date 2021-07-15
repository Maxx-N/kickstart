import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
  render() {
    return (
      <Layout>
        <Form>
          <h3>Create a Campaign</h3>
          <Form.Field>
            <label>Minimum Contribution</label>
            <input />
          </Form.Field>
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
