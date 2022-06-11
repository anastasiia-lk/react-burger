import profileNavigation from './profile-navigation.module.css';
import {CheckMarkIcon, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { profileFormConfig as config } from '../../utils/data';
import { useDispatch } from 'react-redux';
 import { useCallback } from 'react';
import { signOutUser } from '../../services/actions/user';

export default function ProfileNavigation() {
  const dispatch = useDispatch()
  const onClickHandler = useCallback(
    () => {
      dispatch(signOutUser());
    },
    [dispatch],
  )
  return (
    <div className={`${profileNavigation[`container`]}`}>
      <nav className='mb-20'>
        <ul className={`${profileNavigation[`list`]}`}>
          <li className={`${profileNavigation[`list__item`]}`}>
            <NavLink to="/profile" end className={`${profileNavigation[`link`]}`}>
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium
                    ${!isActive && 'text_color_inactive'}`}
                >
                  Профиль
                </span>
              )}
            </NavLink>
          </li>
          <li className={`${profileNavigation[`list__item`]}`}>
            <NavLink to="/profile/orders" className={`${profileNavigation[`link`]}`}>
              {({ isActive }) => (
                <span
                className={`text text_type_main-medium
                  ${!isActive && 'text_color_inactive'}`}
              >
                  История заказов
                </span>
              )}
            </NavLink>
          </li>
          <li
            className={`${profileNavigation[`list__item`]} text text_type_main-medium text_color_inactive`}
          >
            <button className={`${profileNavigation[`exit-btn`]}`} onClick={onClickHandler}>Выход</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }
