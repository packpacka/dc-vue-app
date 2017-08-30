import { mutationKeys } from './mutations';

export function saveAddress({ commit }, payload) {
  commit(mutationKeys.saveAddress, payload);
}

export function clearAddress({ commit }) {
  commit(mutationKeys.clearAddress);
}

interface IActionLink<T> {
  saveAddress: T;
  clearAddress: T;
}

type Action = (state: any, payload: any) => void;

interface IActions extends IActionLink<Action> { }

export const actions: IActions = {
  saveAddress,
  clearAddress,
};

interface IActionKeys extends IActionLink<string> { }
export const actionKeys: IActionKeys = Object.keys(actions).reduce((res, key) => ({ ...res, [key]: key }), {}) as IActionKeys;
