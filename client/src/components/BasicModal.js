import React from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const BasicModal = ({children, isModalOpen, closeModal}) => {
    
    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        disableBackdropClick
        >
            <div>{children}</div>
        </Modal>
    );
};

BasicModal.propTypes = {
    children: PropTypes.instanceOf(Object),
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
  };
  
  BasicModal.defaultProps = {
    children: <div />,
    isModalOpen: false,
};

export default BasicModal;