import { ChainId } from '../../../types';
import { transformTokenMap } from '../../utils';

const TOKENS = {
  XDAI: {
    name: 'Gnosis USD Coin',
    code: 'XDAI',
    decimals: 18,
    contractAddress: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    color: '#5b31b9',
    matchingAsset: 'DAI',
  },
};

export default transformTokenMap(TOKENS, ChainId.Gnosis);
