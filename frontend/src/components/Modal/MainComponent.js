import React, { useState } from 'react';
import ModalComponent from './Modal';

const MainComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [matchedUserData, setMatchedUserData] = useState(null);

    const handleButtonClick = () => {
    const userData = { name: 'John Doe', major: 'Computer Science' };
    setMatchedUserData(userData);
    setIsModalVisible(true);
    };

    const closeModal = () => {
    setIsModalVisible(false);
    setMatchedUserData(null);
    };

    return (
    <div>
        <button onClick={handleButtonClick}>Show Match</button>
        {isModalVisible && (
        <ModalComponent onClose={closeModal} userData={matchedUserData} />
        )}
    </div>
    );
};

export default MainComponent;
