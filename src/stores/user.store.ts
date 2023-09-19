import { createStore } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useUserStore = createStore(set => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));

export default useUserStore;

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('UserStore', useUserStore);
}
