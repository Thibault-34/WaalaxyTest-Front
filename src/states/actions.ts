import { atom, selector } from 'recoil';

import api from '../services/api';
import { IAction } from '../types';
import { currentUserState } from './users';

export const userActionsState = atom<IAction[]>({
  key: 'userActionsState',
  default: selector({
    key: 'userActionsStateDefault',
    get: async ({ get }) => {
      const userId = get(currentUserState)?._id;
      if (userId) return (await api.actions.getAllByUser(userId)) ?? [];
      return [];
    },
  }),
});
