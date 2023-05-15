import { EvmChain } from '../../EvmChain';
import { AssetTypes, ChainId, NftProviderType } from '../../../types';

export default new EvmChain({
  id: ChainId.Arbitrum,
  name: 'Arbitrum',
  code: 'ARBITRUM',
  color: '#28A0EF',

  nativeAsset: [
    {
      name: 'Localins ETH',
      chain: ChainId.Arbitrum,
      type: AssetTypes.native,
      code: 'ARBETH',
      priceSource: { coinGeckoId: 'ethereum' },
      color: '#28A0EF',
      decimals: 18,
      matchingAsset: 'ETH',
    },
  ],

  isEVM: true,
  isMultiLayered: false,
  hasTokens: true,
  nftProviderType: NftProviderType.Infura,

  averageBlockTime: 3,
  safeConfirmations: 5,
  txFailureTimeoutMs: 600_000,

  network: {
    name: 'arbitrum_mainnet',
    coinType: '60',
    networkId: 42161,
    chainId: 42161,
    isTestnet: false,
    rpcUrls: ['https://arbitrum-mainnet.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f'],
  },
  explorerViews: [
    {
      tx: 'https://arbiscan.io/tx/{hash}',
      address: 'https://arbiscan.io/address/{address}',
      token: 'https://arbiscan.io/token/{token}',
    },
  ],

  nameService: {
    uns: 'ERC20',
  },

  multicallSupport: true,
  ledgerSupport: false,

  EIP1559: false,
  gasLimit: {
    send: {
      native: 500_000,
      nonNative: 650_000,
    },
  },
  fees: {
    unit: 'gwei',
    magnitude: 1e9,
  },
  feeMultiplier: { slowMultiplier: 1, averageMultiplier: 1, fastMultiplier: 1.25 },
  supportCustomFees: true,
});
