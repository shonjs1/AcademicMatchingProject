import React from 'react';

const ModalComponent = ({ onClose, userData }) => {
    return (
    <div className="modal">
        <div className="modal-content">
        <h2>Matched User</h2>
        <p>Name: {userData.name}</p>
        <p>Major: {userData.major}</p>
        <button onClick={onClose}>Close</button>
        </div>
    </div>
    );
};

export default ModalComponent;
