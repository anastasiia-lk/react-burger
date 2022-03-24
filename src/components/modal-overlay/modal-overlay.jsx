import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay (props) {

  return (
    <div className={modalOverlayStyles['modal-overlay']} onClick={() => props.closeModal()}>
    </div>
  )
}

export default ModalOverlay;
