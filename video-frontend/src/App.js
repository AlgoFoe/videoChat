import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';

const App = () => {
    return (
        <div className="d-flex flex-column align-items-center" style={{ width: '100%' }}>
            <div className="bg-light border border-2 border-dark p-2 rounded-3 my-3 text-center" style={{ width: '90%', maxWidth: '500px' }}>
                <h2>Video.Chat</h2>
            </div>
            <div className="w-100 d-flex justify-content-center">
                <VideoPlayer />
            </div>
            <div className="w-100 d-flex justify-content-center">
                <Options>
                    <Notifications />
                </Options>
            </div>
        </div>
    );
}

export default App;
