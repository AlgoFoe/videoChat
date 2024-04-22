import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext'; 

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, callInfo } = useContext(SocketContext);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {stream && (
                    <div className="col-12 col-md-6 my-2">
                        <div className="p-2 border border-2 border-dark">
                            <h5 className="mb-2">{name || 'Name'}</h5>
                            <video playsInline muted ref={myVideo} autoPlay className="w-100" />
                        </div>
                    </div>
                )}
                {callAccepted && !callEnded && (
                    <div className="col-12 col-md-6 my-2">
                        <div className="p-2 border border-2 border-dark">
                            <h5 className="mb-2">{callInfo.name || 'Name'}</h5>
                            <video playsInline ref={userVideo} autoPlay className="w-100" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
