import { ChainId } from '@liquality/cryptoassets';
import { enableChain } from './enable_chain';

export const enableGnosisChain = {
  version: 23,
  migrate: (state: any) => enableChain(state, ChainId.Gnosis),
};
