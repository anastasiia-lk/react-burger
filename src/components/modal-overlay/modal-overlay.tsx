import modalOverlayStyles from './modal-overlay.module.css';
import { FC } from 'react';
import { IModalOverlayProps } from './modal-overlay.types';

const ModalOverlay: FC<IModalOverlayProps> = ({ close }) => {

  return (
    <div className={modalOverlayStyles['modal-overlay']} onClick={() => close()}>
    </div>
  )
}

export default ModalOverlay;
