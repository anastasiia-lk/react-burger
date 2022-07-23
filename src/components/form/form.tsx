import form from './form.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { IFormProps } from './form.types';

const Form: FC<IFormProps> = ({config, body, onSubmit, children}) => {
  return (
    <form className={`${form.container}`} onSubmit={(e) => onSubmit(e, body)}>
      <h1 className="text text_type_main-medium mb-6">{config.header}</h1>
      {config.header === 'Восстановление пароля' &&
          <div className ='mb-6'>
            {children}
          </div>
      }
      {children && children.length === undefined && 
          <div className ='mb-6'>
            {children}
          </div>
      }
      {children && children.length>1 && children.map((child: any) => {
        return (
          <div className ='mb-6' key={children.indexOf(child)}>
            {child}
          </div>
        )
      })}
      <div className='mb-20'>
        <Button type="primary" size="large">
        {config.buttonText}
        </Button>
      </div>
      {config.subtitleArr.map((subtitle) => 
        <div className={`${form[`subtitle-container`]}`} key={subtitle.id}>
          <p className={`mr-2 text text_type_main-default ${form[`text`]}`}>{subtitle.text}</p>
          {subtitle.text === 'Вы — новый пользователь?' && <Link to="/register" className={`text_type_main-default ${form[`link`]}`}>{subtitle.linkText}</Link>}
          {subtitle.text === 'Забыли пароль?' && <Link to="/forgot-password" className={`text_type_main-default ${form[`link`]}`}>{subtitle.linkText}</Link>}
          {(subtitle.text !== 'Вы — новый пользователь?' && subtitle.text !== 'Забыли пароль?') && <Link to="/login" className={`text_type_main-default ${form[`link`]}`}>{subtitle.linkText}</Link>}
        </div>
      )}
    </form>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }

export default  Form;
