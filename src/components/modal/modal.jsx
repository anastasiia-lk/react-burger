import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal () {
  function openModalOverlay() {

  }

  function closeModalOverlay() {

  }

  return createPortal(
    (<>
    <ModalOverlay>
      <div className={`${modalStyles.modal} mt-10 mr-10 mb-15 ml-10`}>
        <div className={modalStyles.title}>
          <h2 className='text text_type_main-large'>Hello</h2>
          <div>
            <CloseIcon type="primary" />
          </div>
        </div>
      </div>
    </ModalOverlay>
    </>),
    document.querySelector('#modal')
  )
}

export default Modal;