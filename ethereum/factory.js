import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xbe1395CC63742105ca27860B5e810F736124D420'
);

export default instance;
