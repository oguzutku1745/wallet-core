import { ChainId } from '../../../types';
import { transformTokenMap } from '../../utils';

const TOKENS = {
  GNOSIS: {
    name: 'Gnosis',
    code: 'GNO',
    decimals: 18,
    contractAddress: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    color: '#5b31b9',
    matchingAsset: 'GNO',
  },
};

export default transformTokenMap(TOKENS, ChainId.Gnosis);
