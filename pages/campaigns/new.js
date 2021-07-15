import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
  state = { minimumContribution: '' };
  render() {
    return (
      <Layout>
        <Form>
          <h3>Create a Campaign</h3>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={(event) => {
                this.setState({ minimumContribution: event.target.value });
              }}
            />
          </Form.Field>
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
