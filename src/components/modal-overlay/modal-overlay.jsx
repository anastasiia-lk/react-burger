import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay (props) {
  function handleClose (evt) {
    if (evt.target === evt.currentTarget) props.closeModal()
  }

  return (
    <div className={modalOverlayStyles['modal-overlay']} onClick={handleClose}>
      {props.children}
    </div>
  )
}

export default ModalOverlay;
