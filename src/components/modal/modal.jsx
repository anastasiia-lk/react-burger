import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal (props) {
  function openModalOverlay() {

  }

  function closeModalOverlay() {

  }

  return createPortal(
    (<>
    <ModalOverlay>
      <div className={`${modalStyles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={modalStyles.title}>
          <h2 className='text text_type_main-large'>Hello</h2>
          <div>
            <CloseIcon type="primary" />
          </div>
        </div>
      </div>
      {props.children}
    </ModalOverlay>
    </>),
    document.querySelector('#modal')
  )
}

export default Modal;