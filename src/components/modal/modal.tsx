import {useEffect, FC} from 'react';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ESC_KEY} from '../../utils/data';
import { IModalProps } from './modal.types';

const Modal: FC<IModalProps> = ({children, closeModal}) => { 
  useEffect(() => {
    document.addEventListener('keydown', escPress)

    return () => document.removeEventListener('keydown', escPress)
  }, [])

  function escPress (evt: KeyboardEvent) {
    if (evt.key === ESC_KEY) closeModal()
  }

  return createPortal(
    (
    <div className={modalStyles.wrapper}>
      <ModalOverlay close={closeModal} />
      <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={modalStyles.title}>
          {/* <h2 className='text text_type_main-large'>{text}</h2> */}
          <div className={modalStyles.closeIcon} onClick={closeModal}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
    </div>),
    document.querySelector('#modal')!
  )
}

export default Modal;
