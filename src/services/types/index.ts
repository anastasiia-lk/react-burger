import { store } from '../store';
import { rootReducer } from '../reducers/rootReducer';

export type TRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;