import React, { useEffect } from 'react';

import ProductItem from '../components/Products/ProductItem';
import { PRODUCT_ACTIONS } from '../hooks-store/products-store';
import useStore from '../hooks-store/store';
import './Products.css';

let cleanup = () => {};

const Products = () => {
  const [state, setState] = useStore();

  const loadData = async () => {
    const response = await fetch('/products', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };

  const saveData = async () => {
    const response = await loadData();
    const list = await response.json();
    list.forEach(async (product, index) => {
      const newItem = state.products[index];
      if (product.isFavorite !== newItem.isFavorite) {
        await updateOne(newItem);
      }
    });
  };

  const updateOne = async (product) => {
    await fetch(`/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  };

  useEffect(() => {
    const initPorducts = async () => {
      const response = await loadData();
      if (response) {
        setState(PRODUCT_ACTIONS.LOAD_LIST, await response.json());
      }
    };
    initPorducts();
    return () => {
      cleanup();
    };
  }, []);

  // if we try to set this cleanup function directly on the above useEffect, the cluster will be created
  // with the outdated state value (an empty array, since it's being loaded from the api and when calling
  // the above useEffect for the first time, state.products is an empty array). So what we want to do is recreate
  // the cluster with the new state value everytime the state changes, and that's what we do on this useEffect.
  // Then, when we finally call this cleanup function (only called when the component is destroyed in did, since we
  // don't have any dependencies on the above useEffect), it will have the proper state value.
  useEffect(() => {
    cleanup = () => {
      saveData();
    };
  }, [state]);

  return (
    <>
      <ul className="products-list">
        {state.products.map((prod) => (
          <ProductItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
            isFav={prod.isFavorite}
          />
        ))}
      </ul>
      <button onClick={saveData} type="button" className="centered">
        Save
      </button>
    </>
  );
};

export default Products;
