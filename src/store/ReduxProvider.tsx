'use client';

import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
 