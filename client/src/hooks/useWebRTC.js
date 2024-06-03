import React, { useRefuseEffect, useState, useRef, useCallback, useEffect } from 'react'
import useStateWithCallBack from './useStateWithCallBack';
import { useSelector } from 'react-redux'
import socketInit from '../socket';
// import { useParams, useHistory } from 'react-router-dom';

// const user = [
//     {
//         id: 1,
//         name: "dasfreffrwe",
//     },
//     {
//         id: 2,
//         name: "fiowerw",
//     }
// ];

const useWebRTC = (roomid,user) => {
    const [clients, setClients] = useStateWithCallBack([]); 
    const audioElements = useRef({});
    const connections = useRef({});
    const socket = useRef(null);
    const localMediaStream = useRef(null);
    const clientsRef = useRef(null);
    useEffect(() => {
        socket.current = socketInit();
    },[])

    const addNewClient = useCallback(
        (newClient, cb) => {
            const lookingFor = clients.find(
                (client) => client.id === newClient.id
            );

            if (lookingFor === undefined) {
                setClients(
                    (existingClients) => [...existingClients, newClient],
                    cb
                );
            }
        },
        [clients, setClients]
    );

    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
        }
        startCapture().then(() => {
            addNewClient(user, () => {
                const localElement = audioElements.current[user.id];
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }
                //
                socket.current.emit('join', {});
            });
        });
    }, [])
    
    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    };

    return { clients, provideRef };
}

export default useWebRTC