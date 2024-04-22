import React, { useState, useContext } from 'react';
import { SocketContext } from '../SocketContext';

const Options = ({ children }) => {
    const { clientId, callAccepted, name, setName, callEnded, hangupCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    console.log("Id ", clientId);
    const handleSubmit = (event) => {
        event.preventDefault(); 
    };

    return (
        <div className="container" style={{ maxWidth: '600px', margin: '35px auto' }}>
            <div className="p-3 border border-2 border-dark" style={{ padding: '10px 20px' }}>
                <form className="d-flex flex-column" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-6 p-2">
                            <h6>Account Info</h6>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <button 
                                type="button"  // Set the button type to "button"
                                className="btn btn-primary mt-3 w-100" 
                                onClick={() => navigator.clipboard.writeText(clientId)}
                            >
                                Copy Your ID
                            </button>
                        </div>
                        <div className="col-12 col-md-6 p-2">
                            <h6>Make a call</h6>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="ID to call" 
                                value={idToCall} 
                                onChange={(e) => setIdToCall(e.target.value)} 
                            />
                            {callAccepted && !callEnded ? (
                                <button 
                                    type="button" 
                                    className="btn btn-danger mt-3 w-100" 
                                    onClick={hangupCall}
                                >
                                    Hang Up
                                </button>
                            ) : (
                                <button 
                                    type="button"
                                    className="btn btn-primary mt-3 w-100" 
                                    onClick={() => callUser(idToCall)}
                                >
                                    Call
                                </button>
                            )}
                        </div>
                    </div>
                </form>
                {children}
            </div>
        </div>
    );
};

export default Options;
