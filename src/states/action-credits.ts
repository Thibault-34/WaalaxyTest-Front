import { atom, selector } from 'recoil';

import api from '../services/api';

const USER_ID = '62d691d5599fface86d0b6a6';

export const userActionCreditsState = atom({
  key: 'userActionCredits',
  default: selector({
    key: 'userActionCreditsDefault',
    get: async () => {
      return (await api.actionCredits.getAllByUser(USER_ID)) ?? [];
    },
  }),
});
