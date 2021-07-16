import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3005A833adc3F02BCD6454E0338ef809567ADf49'
);

export default instance;
