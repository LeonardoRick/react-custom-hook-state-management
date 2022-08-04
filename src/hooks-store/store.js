import { useState, useEffect } from 'react';

// managing variables outisde of the hook will ensure that this data is
// shared between all components that imports useStore
let globalState = {};

// array full of functions that I can call update my hook state from
// any component I want. This list will grow overtime for each component
// we instantiate useStore, since each of them 'push' to listeners array.
// Then, when we call dispatch, all useStates will be executed to update
// the component value
let listeners = [];

// actions is generic because we want to allow other specific stores to add
// functions here. Since this store is global we can have multiple states
// on global state so we need to ekep useStore as generic as possbile.

// if you want to see an example of an action being added,
// look on products-store using initStore()
let actions = {};

/**
 * custom hook that need to be used by other concrete hooks to control the application state
 * @param {boolean} listen bool that tells if we want to listen to changes on this hook and
 * recriate or component everytime it changes its value. Sometimes we just want to use the
 * dispatch of the hook and doesn't care about its state, and, in this case, we can pass listen
 * as false to increase performance
 * @returns [state, dispatch] of the current hook
 */
const useStore = (listen = true) => {
  const [_, setState] = useState(globalState);

  const dispatch = (actionId, payload) => {
    const newState = actions[actionId](globalState, payload);
    globalState = { ...globalState, ...newState };
    listeners.forEach((listener) => {
      listener(globalState);
    });
  };

  useEffect(() => {
    // pushes the new created setState to global listeners list. This way
    // when any part of your aplication dispatchs some change (calling above dispatch function)
    // we can iterate over listeners and update all componets listening to changes
    if (listen) {
      listeners.push(setState);
    }
    return () => {
      // remove the listener once the component that instantiate this hook is cleaned up.
      // we don't want to keep tarck of unused setStates.
      if (listen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [listen]);

  return [globalState, dispatch];
};

/**
 * used to create a new store eg. products-store, theme-store, etc. Since this is a aplication
 * wide state manager, we never rewrite the globalState, instead, we always append new things to it
 * allowing the developer to set what states and actions should be managed by this useStore state management
 * @param {string[]} userActions to be appended on global actions variable
 * @param {*} initialState to start this current state inside the global state
 */
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};

export default useStore;
