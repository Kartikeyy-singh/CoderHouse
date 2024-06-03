import React, { useState, useEffect } from "react";
import useWebRTC from "../../hooks/useWebRTC";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Room = () => {
  const user = useSelector((state) => state.auth.user);
  const { id: roomId } = useParams();
  const { clients,provideRef } = useWebRTC(roomId,user);

  return (
    <div>                         
      <h1>All connected clients</h1>
      {/* console.log(clients); */}
      {clients.map((client) => {
        return (
          <div key={client.id}>
            <audio
              ref={(instance) => provideRef(instance,client.id)}
              controls
              autoPlay
              ></audio>
            <h4>{client.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Room
