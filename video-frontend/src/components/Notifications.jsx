import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';

const Notifications = () => {
    const { answerCall, callInfo, callAccepted } = useContext(SocketContext);

    return (
        <>
            {callInfo.isReceivedCall && !callAccepted && (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <h1>{callInfo.name} is calling:</h1>
                    <button className="btn btn-primary" onClick={answerCall}>
                        Answer
                    </button>
                </div>
            )}
        </>
    );
};

export default Notifications;
