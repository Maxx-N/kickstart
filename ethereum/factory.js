import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3Ac303647C62ca3B007CAdDB70F3cc915738e77C'
);

export default instance;
