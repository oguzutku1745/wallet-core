import { IAsset } from '@liquality/cryptoassets';
import store from '../store';



const cryptoassets: { [asset: string]: IAsset } = new Proxy(
  {},
  {
    get(_target, name, receiver) {
      return Reflect.get({ ...store.getters.cryptoassets }, name, receiver);
    },
    ownKeys() {
      return Reflect.ownKeys(store.getters.cryptoassets);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true,
      };
    },
  }
);

export default cryptoassets;
