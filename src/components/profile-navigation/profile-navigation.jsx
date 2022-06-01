import profileNavigation from './profile-navigation.module.css';
import {CheckMarkIcon, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { profileFormConfig as config } from '../../utils/data';

export default function ProfileNavigation() {
  return (
    <div className={`${profileNavigation[`container`]}`}>
      {config.navigationArr.map((title) => 
        <div key={title} className={`${profileNavigation[`nav-item`]} mb-6`}>
          <Link to="/register" className="text text_type_main-medium">{title}</Link>
        </div>
      )}
    </div>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }
