import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay (props) {

  return (
    <div className={modalOverlayStyles['modal-overlay']} onClick={() => props.close()}>
    </div>
  )
}

// ModalOverlay.propTypes = {
// 	closeModal: PropTypes.func,
// }

export default ModalOverlay;
