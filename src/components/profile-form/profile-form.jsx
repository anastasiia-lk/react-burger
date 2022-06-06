import form from './profile-form.module.css';
import {CheckMarkIcon, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { profileFormConfig as config } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo, getUserInfo } from '../../services/actions/user';
import {useState, useMemo, useCallback, useEffect} from 'react';

export default function ProfileForm() {
  const { name, email } = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const [nameValue, setNameValue] = useState(name);
  const [emailValue, setEmailValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState('');

  const body = useMemo(() => ({
    name: nameValue,
    email: emailValue,
    password: passwordValue
  }), [nameValue, emailValue, passwordValue])

  const submitHandler = useCallback((e, body) => {
    e.preventDefault();
    dispatch(updateUserInfo(body));
  }, [dispatch])

  const cancelHandler = useCallback(
    (e) => {
      e.preventDefault();
      setNameValue(name);
      setEmailValue(email);
      setPasswordValue('');
    },
    [email, name]
  );

  return (
    <form className={`${form.container}`} onSubmit={(e) => submitHandler(e, body)}>
        <div className ='mb-6'>
          <Input 
            type = {`${config.inputsArr[0].type}`}
            placeholder = {`${config.inputsArr[0].placeholder}`}
            icon = {`${config.inputsArr[0].icon}`}
            name = {`${config.inputsArr[0].name}`}
            value = {nameValue}
            onChange={e => setNameValue(e.target.value)}
            // onChange={e => setValue(e.target.value)}
          />
        </div>
        <div className ='mb-6'>
          <Input 
            type = {`${config.inputsArr[1].type}`}
            placeholder = {`${config.inputsArr[1].placeholder}`}
            icon = {`${config.inputsArr[1].icon}`}
            name = {`${config.inputsArr[1].name}`}
            value = {emailValue}
            onChange={e => setEmailValue(e.target.value)}
            // onChange={e => setValue(e.target.value)}
          />
        </div>
        <div className ='mb-6'>
          <Input 
            type = {`${config.inputsArr[2].type}`}
            placeholder = {`${config.inputsArr[2].placeholder}`}
            icon = {`${config.inputsArr[2].icon}`}
            name = {`${config.inputsArr[2].name}`}
            value = {passwordValue}
            onChange={e => setPasswordValue(e.target.value)}
            // onChange={e => setValue(e.target.value)}
          />
        </div>
        <Button type="secondary" onClick={(e) => cancelHandler(e)}>
            Отмена
        </Button>
        <Button type="submit">Сохранить</Button>
    </form>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }
