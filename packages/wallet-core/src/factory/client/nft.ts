import { CovalentNftProvider, EvmBaseWalletProvider, InfuraNftProvider, OpenSeaNftProvider } from '@chainify/evm';
import { BaseProvider } from '@ethersproject/providers';
import { NftProviderType } from '../../store/types';

export function getNftProvider(
  providerType: NftProviderType,
  walletProvider: EvmBaseWalletProvider<BaseProvider>,
  testnet: boolean
) {
  switch (providerType) {
    case NftProviderType.OpenSea:
      return new OpenSeaNftProvider(walletProvider, {
        url: 'https://api.opensea.io/api/v1/',
        apiKey: '963da5bcea554a92b078fe1f48a2300e',
      });
    case NftProviderType.Infura:
      if (testnet) {
        return new InfuraNftProvider(walletProvider, {
          url: 'https://tjgwcry8a7dd.usemoralis.com:2053/server',
          appId: 'PwWfldBBlRaVWGihW4K6LqL4AQbmVNTI3w2OyDhN',
          apiKey: 'X9Bg0wQh5rzvbZ3owmtqAsxdMTy3L81jnz6BNVsj',
        });
      }
      return new InfuraNftProvider(walletProvider, {
        url: 'https://ghi7f9miezr7.usemoralis.com:2053/server',
        appId: 'T94TjnFcaFycYfHqkf227JmpZeEjGXmDWINkfJD2',
        apiKey: 'iv94v0ZQgQfIkTe09QLple1DDAGbmAD8zX9BeVGo',
      });
    case NftProviderType.Covalent:
      return new CovalentNftProvider(walletProvider, {
        url: 'https://api.covalenthq.com/v1',
        apiKey: 'ckey_d87425e55bac4d78aa8ac902a34',
      });
  }
}
