import {useEffect} from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ESC_KEY} from '../../utils/data';

function Modal (props) {
  
  useEffect(() => {
    document.addEventListener('keydown', escPress)

    return () => document.removeEventListener('keydown', escPress)
  }, [])

  function escPress (evt) {
    if (evt.key === ESC_KEY) props.closeModal()
  }

  return createPortal(
    (<>
    <ModalOverlay closeModal={props.closeModal}>
      <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={modalStyles.title}>
          <h2 className='text text_type_main-large'>{props.text}</h2>
          <div className={modalStyles.closeIcon} onClick={props.closeModal}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {props.children}
      </div>
    </ModalOverlay>
    </>),
    document.querySelector('#modal')
  )
}

Modal.propTypes = {
	children: PropTypes.element,
	title: PropTypes.string,
	closeModal: PropTypes.func,
}

export default Modal;