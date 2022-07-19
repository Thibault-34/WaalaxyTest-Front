import { atom, selector } from 'recoil';

import api from '../services/api';

export const actionDetailsState = atom({
  key: 'actionDetailsState',
  default: selector({
    key: 'actionDetailsStateDefault',
    get: async () => {
      return (await api.actionDetails.getAll()) ?? [];
    },
  }),
});
