import { ChainId, ChainsMap } from '../../types';

import GnosisChain from './evm/gnosis';
import ArbitrumChain from './evm/arbitrum';
import AvalancheChain from './evm/avalanche';
import BscChain from './evm/bsc';
import EthereumChain from './evm/ethereum';
import FuseChain from './evm/fuse';
import OptimismChain from './evm/optimism';
import PolygonChain from './evm/polygon';
import RskChain from './evm/rsk';

export const EVM_CHAINS: ChainsMap = {
  [ChainId.Ethereum]: EthereumChain,
  [ChainId.Gnosis]: GnosisChain,
  [ChainId.BinanceSmartChain]: BscChain,
  [ChainId.Polygon]: PolygonChain,
  [ChainId.Arbitrum]: ArbitrumChain,
  [ChainId.Fuse]: FuseChain,
  [ChainId.Avalanche]: AvalancheChain,
  [ChainId.Rootstock]: RskChain,
  [ChainId.Optimism]: OptimismChain,
};
