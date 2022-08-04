import { initStore } from './store';

const configProductsStore = () => {
  const actions = {
    [PRODUCT_ACTIONS.TOGGLE_FAV]: (currState, productId) => {
      const prodIndex = currState.products.findIndex((prod) => prod.id === productId);
      const newStatus = !currState.products[prodIndex].isFavorite;
      const newList = [...currState.products];
      newList[prodIndex].isFavorite = newStatus;
      return {
        products: newList,
      };
    },
    [PRODUCT_ACTIONS.LOAD_LIST]: (_currState, loadedList) => {
      return {
        products: loadedList,
      };
    },
  };

  initStore(actions, { products: [] });
};

export const PRODUCT_ACTIONS = {
  TOGGLE_FAV: 'TOGGLE_FAV',
  LOAD_LIST: 'LOAD_LIST',
};

export default configProductsStore;
