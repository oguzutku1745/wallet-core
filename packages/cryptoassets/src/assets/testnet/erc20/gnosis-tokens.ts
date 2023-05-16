import { ChainId } from '../../../types';
import { transformTokenMap } from '../../utils';

const TOKENS = {
  WXDAI: {
    name: 'Wrapped XDAI',
    code: 'WXDAI',
    decimals: 18,
    contractAddress: '0x18c8a7ec7897177E4529065a7E7B0878358B3BfF',
    color: '#5b31b9',
    matchingAsset: 'DAI',
  },
};

export default transformTokenMap(TOKENS, ChainId.Gnosis);
