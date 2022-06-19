import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, anonymous = false }) {
  const isAuthUser = useSelector((store) => store.user.isAuth);

  const location = useLocation();
  const fromPath = location.state?.fromPath?.pathname || '/';
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