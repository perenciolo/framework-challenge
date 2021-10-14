import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { StoreType } from '../app/store';
import { Store } from 'redux';

type CustomStore = Store<{ todos: {}; albums: {}; posts: {} }>;

export function tlRender(component: JSX.Element, store: Store<CustomStore>) {
  return store ? render(withRedux(store)(component)) : render(component);
}

export function withRedux(store: Store<CustomStore>) {
  return function (component: JSX.Element) {
    return <Provider store={store}>{component}</Provider>;
  };
}
