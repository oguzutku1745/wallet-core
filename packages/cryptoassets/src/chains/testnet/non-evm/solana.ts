import solana from '../../../chains/mainnet/non-evm/solana';
import { transformMainnetToTestnetChain } from '../../../chains/utils';

export default transformMainnetToTestnetChain(
  solana,
  {
    name: 'Solana Testnet',
    networkId: 'testnet',
    coinType: '501',
    isTestnet: true,
    rpcUrls: ['https://api.testnet.solana.com/'],
  },
  [
    {
      tx: 'https://explorer.solana.com/tx/${tx}?cluster=testnet',
      address: 'https://explorer.solana.com/address/${address}?cluster=testnet',
    },
  ],
  'https://solfaucet.com/'
);
