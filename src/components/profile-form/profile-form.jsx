import form from './profile-form.module.css';
import {CheckMarkIcon, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { profileFormConfig as config } from '../../utils/data';

export default function ProfileForm() {
  return (
    <form className={`${form.container}`}>
        <div className ='mb-6'>
          <Input 
            type = {`${config.inputsArr[0].type}`}
            placeholder = {`${config.inputsArr[0].placeholder}`}
            icon = {`${config.inputsArr[0].icon}`}
            name = {`${config.inputsArr[0].name}`}
            value = 'Марк'
            // onChange={e => setValue(e.target.value)}
          />
        </div>
        <div className ='mb-6'>
          <Input 
            type = {`${config.inputsArr[1].type}`}
            placeholder = {`${config.inputsArr[1].placeholder}`}
            icon = {`${config.inputsArr[1].icon}`}
            name = {`${config.inputsArr[1].name}`}
            value = 'mail@stellar.burgers'
            // onChange={e => setValue(e.target.value)}
          />
        </div>
        <div className ='mb-6'>
          <Input 
            type = {`${config.inputsArr[2].type}`}
            placeholder = {`${config.inputsArr[2].placeholder}`}
            icon = {`${config.inputsArr[2].icon}`}
            name = {`${config.inputsArr[2].name}`}
            value = '******|' 
            // onChange={e => setValue(e.target.value)}
          />
        </div>
    </form>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }
