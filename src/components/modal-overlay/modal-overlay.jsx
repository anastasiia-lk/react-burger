import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay (props) {
  return (
    <div className={modalOverlayStyles['modal-overlay']} onClick={props.closeModal}>
      {props.children}
    </div>
  )
}

export default ModalOverlay;
