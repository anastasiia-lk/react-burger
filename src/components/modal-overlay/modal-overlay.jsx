import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay (props) {
  function openModalOverlay() {

  }

  function closeModalOverlay() {

  }

  return (
    <div className={modalOverlayStyles['modal-overlay']}>
      {props.children}
    </div>
  )
}

export default ModalOverlay;