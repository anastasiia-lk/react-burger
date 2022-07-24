import form from './profile-form.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { profileFormConfig as config } from '../../utils/data';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { updateUserInfoThunk } from '../../services/thunks/user';
import { getUserInfo } from '../../services/thunks';
import {useState, useMemo, useCallback, useEffect, useRef, FC} from 'react';
import { PASSWORD, TEXT } from '../../utils/data'
import {IProfileFormBody} from '../profile-form/profile-form.types'

const ProfileForm: FC = () => {
  const { user } = useAppSelector((store) => store.user);
  let name = '';
  let email = '';
  if (user) {
    name = user.name;
    email = user.email;
  }
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const [nameValue, setNameValue] = useState<string>(name);
  const [emailValue, setEmailValue] = useState<string>(email);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isChange, setIsChange] = useState<boolean>(false);
  const [passInputType, setPassInputType] = useState<
    typeof PASSWORD | typeof TEXT
  >(PASSWORD);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);

  const body = useMemo(() => ({
    name: nameValue,
    email: emailValue,
    password: passwordValue
  }), [nameValue, emailValue, passwordValue])

  const onChangeHandler = useCallback((e, setFn) => {
    setFn(e.target.value);
    setIsChange(true);
  }, []);

  const onBlurHandler = useCallback((e) => {
    e.target.disabled = true;
  }, []);

  const onIconClickHandler = useCallback((ref) => {
    ref.current.disabled = false;
    ref.current.focus();
  }, []);

  const passOnIconClickHandler = useCallback(
    (ref) => {
      onIconClickHandler(ref);
      setPassInputType(TEXT);
    },
    [onIconClickHandler]
  );

  const passOnBlurHandler = useCallback(
    (e) => {
      onBlurHandler(e);
      setPassInputType(PASSWORD);
    },
    [onBlurHandler]
  );

  const submitHandler = useCallback((e: React.FormEvent<HTMLFormElement>, body: IProfileFormBody) => {
    e.preventDefault();
    dispatch(updateUserInfoThunk(body));
  }, [dispatch])

  const cancelHandler = useCallback(
    (e) => {
      e.preventDefault();
      setNameValue(name);
      setEmailValue(email);
      setPasswordValue('');
      setIsChange(false);
    },
    [email, name]
  );

  return (
    <form className={`${form.container}`} onSubmit={(e) => submitHandler(e, body)}>
        <div className ='mb-6'>
          <Input
            ref={nameInputRef}
            type = {`${config.inputsArr[0].type}`}
            placeholder = {`${config.inputsArr[0].placeholder}`}
            icon="EditIcon"
            name = {`${config.inputsArr[0].name}`}
            value = {nameValue}
            onChange={(e) => onChangeHandler(e, setNameValue)}
            onIconClick={() => onIconClickHandler(nameInputRef)}
            onBlur={(e) => onBlurHandler(e)}
            disabled
            // onChange={e => setValue(e.target.value)}
          />
        </div>
        <div className ='mb-6'>
          <Input
            ref={emailInputRef} 
            type = {`${config.inputsArr[1].type}`}
            placeholder = {`${config.inputsArr[1].placeholder}`}
            icon="EditIcon"
            name = {`${config.inputsArr[1].name}`}
            value = {emailValue}
            onChange={(e) => onChangeHandler(e, setEmailValue)}
            onIconClick={() => onIconClickHandler(emailInputRef)}
            onBlur={(e) => onBlurHandler(e)}
            disabled
            // onChange={e => setValue(e.target.value)}
          />
        </div>
        <div className ='mb-6'>
          <Input
            ref={passInputRef} 
            type = {passInputType}
            placeholder = {`${config.inputsArr[2].placeholder}`}
            icon="EditIcon"
            name = {`${config.inputsArr[2].name}`}
            value = {passwordValue}
            onChange={(e) => onChangeHandler(e, setPasswordValue)}
            onIconClick={() => passOnIconClickHandler(passInputRef)}
            onBlur={(e) => passOnBlurHandler(e)}
            disabled
            // onChange={e => setValue(e.target.value)}
          />
        </div>
        {isChange && (<div className={`${form.wrapper}`}>
        <Button type="secondary" onClick={(e) => cancelHandler(e)}>
            Отмена
        </Button>
        <Button type="primary">Сохранить</Button>
        </div>)}
    </form>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }

export default ProfileForm;
