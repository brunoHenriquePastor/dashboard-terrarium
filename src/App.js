import React, {  Component, useEffect, useState } from "react";
// import Main from "./Main";

import * as mqtt from 'react-paho-mqtt';


export default function App() {

  const inputChange=(e, valor) => {
    this.setState({
      valor: e.target.value,
    });
  }

  

  var state = {
    novaTemperatura: '',
    novaUmidade: '',
    novaLuminosidade: '',
    novaUmidadeAr: '',
  };

  const [client, setClient] = React.useState(null);
  const _options = {qos:1,timeout:5};

  React.useEffect(() => {
    _init();
  },[])

  const _init = () => {
    const c = mqtt.connect("broker.emqx.io", Number(8083), "tcp/mqtt", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    setClient(c);
  }

  // called when client lost connection
  const _onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  }

  // called when messages arrived
  const _onMessageArrived = message => {
    console.log("onMessageArrived: " + message.payloadString);

  }


  const sendIrrigate = () => {
      client.connect({ onSuccess: () => {
      _init();
      const latter = mqtt.parsePayload("topic/react", JSON.stringify("AAA")); // topic, payload
      client.send(latter);
    }
  }); // called when the client connects
}


  return (
    <>
    <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <a className="navbar-brand" href="#top">
              Terrarium Condições do ambiente
            </a>
          </nav>

        </div>
        <div className="jumbotron">
          <button onClick={sendIrrigate} className="btn btn-primary btn-lg">Irrigar</button>
        </div>
    </>



    
  );
}

