import React,{createContext,useState,useRef,useEffect} from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("http://localhost:7000");

const ContextProvider = ({children})=>{
    const [stream, setStream] = useState(null);
    const [clientId, setClientId] = useState('');
    const [callInfo, setCallInfo] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const myVideo =useRef();
    const userVideo =useRef();
    const connectionRef =useRef();
    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentStream=>{
            setStream(currentStream);
            myVideo.current.srcObject=currentStream;
        }))
        socket.on('user-conn',(id)=>{
            setClientId(id)
        });
        socket.on('call-user',({from,name:callerName,signal})=>{
            setCallInfo({isReceivedCall:true,from,name:callerName,signal})
        })
    },[])
    const answerCall =()=>{
        setCallAccepted(true);

        const peer = new Peer({initiator:false,trickle:false,stream})
        peer.on('signal',(data)=>{
            socket.emit('answer-call',{signal:data,to:callInfo.from})
        })
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject=currentStream
        })
        peer.signal(callInfo.signal);
        
        connectionRef.current = peer;
    }
    const callUser =(id)=>{
        console.log("Calling")
        const peer = new Peer({initiator:true,trickle:false,stream})
        peer.on('signal',(data)=>{
            socket.emit('call-user',{userToCall:id,signalData:data,from:clientId,name})
        })
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject=currentStream
        })
        socket.on('call-accepted',(signal)=>{
            setCallAccepted(true);
            peer.signal(signal);
        })
        connectionRef.current = peer;

    }
    const hangupCall =()=>{
        setCallEnded(true);

        connectionRef.current.destroy();
        window.location.reload()
    }
    return(
        <SocketContext.Provider value={{callInfo,callAccepted,myVideo,userVideo,stream,name,setName,callEnded,clientId,callUser,hangupCall,answerCall,}}>
            {children}
        </SocketContext.Provider>
    )
}
export {ContextProvider,SocketContext};