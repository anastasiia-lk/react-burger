import form from './form.module.css';
import {CheckMarkIcon, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Form ({config, body, onSubmit, children}) {
  return (
    <form className={`${form.container}`} onSubmit={(e) => onSubmit(e, body)}>
      <h1 className="text text_type_main-medium mb-6">{config.header}</h1>
      {/* {config.inputsArr.map((input) => 
        <div className ='mb-6'>
          <Input 
            type = {`${input.type}`}
            placeholder = {`${input.placeholder}`}
            icon = {`${input.icon}`}
            name = {`${input.name}`}
            value = { value }
            onChange={e => setValue(e.target.value)}
          />
        </div>
      )} */}
      {children && children.length === undefined && 
          <div className ='mb-6'>
            {children}
          </div>
      }
      {children && children.length>1 && children.map((child) => {
        return (
          <div className ='mb-6' key={child.name}>
            {child}
          </div>
        )
      })}
      <div className='mb-20'>
        <Button type="submit" size="large">
        {config.buttonText}
        </Button>
      </div>
      {config.subtitleArr.map((subtitle) => 
        <div className={`${form[`subtitle-container`]}`} key={subtitle.text}>
          <p className='mr-2'>{subtitle.text}</p>
          {subtitle.text === 'Вы — новый пользователь?' && <Link to="/register">{subtitle.linkText}</Link>}
          {subtitle.text === 'Забыли пароль?' && <Link to="/forgot-password">{subtitle.linkText}</Link>}
          {(subtitle.text !== 'Вы — новый пользователь?' && subtitle.text !== 'Забыли пароль?') && <Link to="/login">{subtitle.linkText}</Link>}
        </div>
      )}
    </form>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }

export default  Form;
