import { useLocation, Navigate } from 'react-router-dom';
import { IProtectedRoutProps, TLocationState } from './protected-route.types';
import { FC } from 'react';
import { useAppSelector } from '../../services/hooks';

const ProtectedRoute: FC<IProtectedRoutProps> = ({ children, anonymous = false }) => {
  const isAuthUser = useAppSelector((store) => store.user.isAuth);

  const location = useLocation() as TLocationState;
  const fromPath = location.state?.from?.pathname || '/';
  // Если разрешен только неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuthUser) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={fromPath} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuthUser) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{fromPath: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return <>{children}</>;
}

export default ProtectedRoute;