import { Chain, Client, Swap, Wallet } from '@chainify/client';
import {
  EIP1559FeeProvider,
  EvmChainProvider,
  EvmWalletProvider,
  OptimismChainProvider,
  RpcFeeProvider,
} from '@chainify/evm';
import { EvmLedgerProvider, CreateEvmLedgerApp } from '@chainify/evm-ledger';
import { RPChProvider } from '@rpch/ethers';
import * as RPChCrypto from '@rpch/crypto';
import { Address, Network } from '@chainify/types';
import { ChainifyNetwork } from '../../types';
import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { AccountInfo, AccountType, ClientSettings } from '../../store/types';
import { walletOptionsStore } from '../../walletOptions';
import { getNftProvider } from './nft';
import { EvmChain } from '@liquality/cryptoassets';
import { asL2Provider } from '@eth-optimism/sdk';
import { CUSTOM_ERRORS, createInternalError } from '@liquality/error-parser';
import BaseStorageStore from 'src/store/basestorage';

let rpchProvider: StaticJsonRpcProvider;

class RPChStore extends BaseStorageStore<string> {
  constructor() {
    super('rpch');
  }
}
const rpchStore = new RPChStore();

async function startRPChProvider(provider: RPChProvider) {
  if (!provider.sdk.isReady) {
    await provider.sdk.start();
    console.log('rpch provider started');
  }
}

export async function createEvmClient(
  chain: EvmChain,
  settings: ClientSettings<ChainifyNetwork>,
  mnemonic: string,
  accountInfo: AccountInfo
): Promise<Client<Chain<any, Network>, Wallet<any, any>, Swap<any, any, Wallet<any, any>>>> {
  const chainProvider = await getEvmProvider(chain, settings);
  const walletProvider = getEvmWalletProvider(settings.chainifyNetwork, accountInfo, chainProvider, mnemonic);
  const client = new Client().connect(walletProvider);

  if (chain.nftProviderType) {
    const nftProvider = getNftProvider(chain.nftProviderType, walletProvider, settings.chainifyNetwork.isTestnet);
    client.connect(nftProvider);
  }

  return client;
}

function getEvmWalletProvider(
  network: ChainifyNetwork,
  accountInfo: AccountInfo,
  chainProvider: EvmChainProvider,
  mnemonic: string
) {
  if (accountInfo.type === AccountType.EthereumLedger || accountInfo.type === AccountType.RskLedger) {
    let addressCache;

    if (accountInfo && accountInfo.publicKey && accountInfo.address) {
      addressCache = new Address({ publicKey: accountInfo?.publicKey, address: accountInfo.address });
    }

    if (!walletOptionsStore.walletOptions.ledgerTransportCreator) {
      throw createInternalError(CUSTOM_ERRORS.NotFound.LedgerTransportCreator);
    }

    return new EvmLedgerProvider(
      {
        network: network,
        derivationPath: accountInfo.derivationPath,
        addressCache,
        transportCreator: walletOptionsStore.walletOptions.ledgerTransportCreator,
        createLedgerApp: CreateEvmLedgerApp,
      },
      chainProvider
    );
  } else {
    const walletOptions = { derivationPath: accountInfo.derivationPath, mnemonic };
    return new EvmWalletProvider(walletOptions, chainProvider);
  }
}

async function getEvmProvider(chain: EvmChain, settings: ClientSettings<ChainifyNetwork>) {
  const network = settings.chainifyNetwork;
  if (chain.isMultiLayered) {
    const provider = asL2Provider(new StaticJsonRpcProvider(network.rpcUrl, chain.network.chainId));
    return new OptimismChainProvider(
      {
        ...settings.chainifyNetwork,
        chainId: chain.network.chainId,
      },
      provider,
      chain.feeMultiplier
    );
  } else {
    let provider;
    
    if (chain.network.name === 'gnosis_mainnet') {
      if (rpchProvider) {
        provider = rpchProvider;
      } else {
        provider = new RPChProvider(
          'https://primary.gnosis-chain.rpc.hoprtech.net',
          {
            timeout: 10000,
            discoveryPlatformApiEndpoint: 'https://staging.discovery.rpch.tech',
            client: 'what-church-however-coat-gate',
            crypto: RPChCrypto,
          },
          (k, v) => {
            return new Promise<void>((resolve, reject) => {
              rpchStore.set(k, v, () => {
                if (chrome.runtime.lastError) {
                  reject(chrome.runtime.lastError);
                } else {
                  resolve();
                }
              });
            });
          },
          (k) => {
            return new Promise((resolve, reject) => {
              rpchStore.get(k, (value) => {
                if (chrome.runtime.lastError) {
                  reject(chrome.runtime.lastError);
                } else {
                  resolve(value);
                }
              });
            });
          }
        );
        rpchProvider = provider as StaticJsonRpcProvider;
        await startRPChProvider(provider as RPChProvider);
        console.log(rpchProvider);
      }
    } else {
      provider = new StaticJsonRpcProvider(network.rpcUrl, chain.network.chainId);
    }

    const feeProvider = getFeeProvider(chain, provider);
    return new EvmChainProvider(chain.network, provider, feeProvider, chain.multicallSupport);
  }
}

function getFeeProvider(chain: EvmChain, provider: JsonRpcProvider) {
  if (chain.EIP1559) {
    return new EIP1559FeeProvider(provider);
  } else {
    return new RpcFeeProvider(provider, chain.feeMultiplier);
  }
}
