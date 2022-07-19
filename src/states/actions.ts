import { atom, selector, DefaultValue } from 'recoil';

import api from '../services/api';

const USER_ID = '62d691d5599fface86d0b6a6';

export const userActionsState = atom({
  key: 'userActionsState',
  default: selector({
    key: 'userActionsStateDefault',
    get: async () => {
      return (await api.actions.getAllByUser(USER_ID)) ?? [];
    },
  }),
});
