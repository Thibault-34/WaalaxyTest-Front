import { atom, selector } from 'recoil';

import api from '../services/api';
import { currentUserState } from './users';

export const userActionCreditsState = atom({
  key: 'userActionCredits',
  default: selector({
    key: 'userActionCreditsDefault',
    get: async ({ get }) => {
      const userId = get(currentUserState)?._id;
      if (userId) return (await api.actionCredits.getAllByUser(userId)) ?? [];
      return [];
    },
  }),
  effects: [
    ({ resetSelf }) => {
      return resetSelf();
    },
  ],
});
