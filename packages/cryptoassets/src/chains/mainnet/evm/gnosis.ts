import { EvmChain } from '../../EvmChain';
import { AssetTypes, ChainId } from '../../../types';

export default new EvmChain({
  id: ChainId.Gnosis,
  name: 'Gnosis',
  code: 'GNO',
  color: '#F7CA4F',
  nativeAsset: [
    {
      name: 'XDAI',
      chain: ChainId.Gnosis,
      type: AssetTypes.native,
      code: 'XDAI',
      priceSource: { coinGeckoId: 'xdai' },
      color: '#f9a825',
      decimals: 18,
    },
  ],
  isEVM: true,
  hasTokens: true,

  averageBlockTime: 3,
  safeConfirmations: 5,
  txFailureTimeoutMs: 600_000,
  network: {
    name: 'gnosis_mainnet',
    coinType: '60',
    networkId: 100,
    chainId: 100,
    isTestnet: false,
    rpcUrls: ['https://derp.hoprnet.org/rpc/xdai/mainnet'],
  },
  explorerViews: [
    {
      tx: 'https://gnosisscan.io/tx/{hash}',
      address: 'https://gnosisscan.io/address/{address}',
      token: 'https://gnosisscan.io/token/{token}',
    },
  ],

  nameService: {
    uns: 'ERC20',
  },

  multicallSupport: true,
  ledgerSupport: false,
  isMultiLayered: false,

  EIP1559: false,
  gasLimit: {
    send: {
      native: 21_000,
      nonNative: 100_000,
    },
  },
  fees: {
    unit: 'gwei',
    magnitude: 1e9,
  },
  feeMultiplier: { slowMultiplier: 1, averageMultiplier: 2, fastMultiplier: 2.2 },
  supportCustomFees: true,
});
