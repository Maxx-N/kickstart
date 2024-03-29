const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods
    .createCampaign('100')
    .send({ from: accounts[0], gas: '1000000' });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods
      .contribute()
      .send({ from: accounts[1], value: '100' });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();

    assert(isContributor);
  });

  it('requires a minimum contribution', async () => {
    let isErrorThrown = false;

    try {
      await campaign.methods
        .contribute()
        .send({ from: accounts[1], value: '99' });
    } catch (err) {
      isErrorThrown = true;
    }

    assert(isErrorThrown);
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries.', '100', accounts[1])
      .send({ from: accounts[0], gas: '1000000' });

    const request = await campaign.methods.requests(0).call();

    assert.equal(request.description, 'Buy batteries.');
  });

  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether'),
    });
    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000' });
    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[0], gas: '1000000' });

    const initialBalance = parseFloat(await web3.eth.getBalance(accounts[1]));
    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: '1000000' });
    const finalBalance = parseFloat(await web3.eth.getBalance(accounts[1]));
    const difference = finalBalance - initialBalance;

    assert.equal(difference, parseFloat(web3.utils.toWei('5', 'ether')));
  });
});
