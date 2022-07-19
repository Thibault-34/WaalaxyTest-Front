import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IUser } from '../types';

const { persistAtom } = recoilPersist();

export const currentUserState = atom<IUser | null>({
  key: 'currentUserState',
  default: null,
  effects: [persistAtom],
});
