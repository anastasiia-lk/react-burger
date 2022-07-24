import { Middleware } from 'redux';
import {  IWsOptions } from '../actions/wsActions';
import { IWsAuthOptions } from '../actions/wsAuthActions';
import { TApplicationActions, TRootState } from '../types';
import { getCookie } from '../../utils/utils';

type TWsOptions = IWsOptions | IWsAuthOptions;

export const socketMiddleware = (
  wsUrl: string,
  wsOptions: TWsOptions,
  isAuth: boolean = false
): Middleware<{}, TRootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsClose } =
        wsOptions;

      if (type === wsInit) {
        if (!isAuth) {
          socket = new WebSocket(wsUrl);
        } else {
          const accessToken = getCookie('token');
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        }
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        if (type === wsClose) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};