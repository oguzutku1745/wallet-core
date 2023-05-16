import ethereumTokens from './ethereum-tokens';
import optimismTokens from './optimism-tokens';
import polygonTokens from './polygon-tokens';
import rskTokens from './rsk-tokens';
import terraTokens from './terra-tokens';

import { AssetMap } from '../../../types';
import { transformChainToTokenAddress } from '../../utils';
import gnosisTokens from './gnosis-tokens';

const TESTNET_ERC20_ASSETS: AssetMap = {
  ...gnosisTokens,
  ...ethereumTokens,
  ...optimismTokens,
  ...polygonTokens,
  ...rskTokens,
  ...terraTokens,
};

const CHAIN_TO_TESTNET_TOKEN_ADDRESS_MAP = transformChainToTokenAddress(TESTNET_ERC20_ASSETS);

export { TESTNET_ERC20_ASSETS, CHAIN_TO_TESTNET_TOKEN_ADDRESS_MAP };
