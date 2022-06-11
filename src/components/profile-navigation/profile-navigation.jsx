import profileNavigation from './profile-navigation.module.css';
import {CheckMarkIcon, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      {config.navigationArr.map((title) => 
        <div key={title} className={`${profileNavigation[`nav-item`]} mb-6`}>
          {(title === 'Профиль'|| title === 'История заказов') &&
            <Link to="/register" className={`${profileNavigation[`link`]} text text_type_main-medium`}>
              {title}
            </Link>}
          {title === 'Выход' && 
            <button className={`${profileNavigation[`btn`]} text text_type_main-medium ${profileNavigation[`nav-item`]}`} onClick={onClickHandler}>{title}
            </button>}
        </div>
      )}
    </div>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }
