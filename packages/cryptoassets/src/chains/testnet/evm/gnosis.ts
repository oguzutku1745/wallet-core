import gnosis from '../../mainnet/evm/gnosis';
import { transformMainnetToTestnetChain } from '../../utils';

export default transformMainnetToTestnetChain(
  gnosis,
  {
    name: 'gnosis_testnet',
    coinType: '60',
    networkId: 10200,
    chainId: 10200,
    isTestnet: true,
    rpcUrls: ['https://rpc.chiado.gnosis.gateway.fm'],
  },
  [
    {
      tx: 'https://blockscout.com/gnosis/chiado/tx/{hash}',
      address: 'https://blockscout.com/gnosis/chiado/address/{address}',
      token: 'https://blockscout.com/gnosis/chiado/token/{token}',
    },
  ],
  'https://gnosisfaucet.com'
);
