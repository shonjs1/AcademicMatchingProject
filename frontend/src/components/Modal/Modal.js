import React from 'react';
import Modal from 'react-modal';

const MatchModal = ({ isOpen, user, closeModal }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Match Modal"
        >
            <div>
                <h2>Match Details</h2>
                <p>Name: {user.name}</p>
                {/* Display other user information here */}
            </div>
            <button onClick={closeModal}>Close</button>
        </Modal>
    );
};

export default MatchModal;
