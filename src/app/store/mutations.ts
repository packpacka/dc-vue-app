interface IMutationLink<T> {
  saveAddress: T;
  clearAddress: T;
}

type Mutation = (state: any, payload: any) => void;

interface IMutations extends IMutationLink<Mutation> { }

export const mutations: IMutations = {
  saveAddress: (state, address: string) => {
    state.selectedAddress = address;
  },
  clearAddress: (state) => {
    state.selectedAddress = undefined;
  },
};

interface IMutationKeys extends IMutationLink<string> { }

export const mutationKeys: IMutationKeys = Object.keys(mutations).reduce((res, key) => ({ ...res, [key]: key }), {}) as IMutationKeys;
