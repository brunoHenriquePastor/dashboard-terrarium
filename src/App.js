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



  // const { novaTemperatura, novaUmidade, novaLuminosidade, novaUmidadeAr } = '';
  const [client, setClient] = React.useState(null);
  // const [novaTemperatura, setnovaTemperatura] = React.useState(null);
  // const [novaUmidade, setnovaUmidade] = React.useState(null);
  // const [novaLuminosidade, setnovaLuminosidade] = React.useState(null);
  // const [novaUmidadeAr , setnovaUmidadeAr] = React.useState(null);
  const _topic = ["greenhouse/umi",
      "greenhouse/temp",
      "greenhouse/umi_ar",
      "greenhouse/lumi"];
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

  // called when subscribing topic(s)
  const _onSubscribe = () => {
    client.connect({ onSuccess: () => {
      _init();
      for (var i = 0; i < _topic.length; i++) {
        inputChange(client.subscribe(_topic[i], _options),state.novaTemperatura);
      }}
    }); // called when the client connects
  }

  // called when subscribing topic(s)
  const _onUnsubscribe = () => {
    for (var i = 0; i < _topic.length; i++) {
      client.unsubscribe(_topic[i], _options);
    }
  }

  // called when disconnecting the client
  const _onDisconnect = () => {
    client.disconnect();
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
          <h1>Temperatura: {state.novaTemperatura}</h1>
          <h1>Umidade: {state.novaUmidade}</h1>
          <h1>Luminosidade: {state.novaLuminosidade}</h1>
          <h1>Umidade ar: {state.novaUmidadeAr}</h1>
          <button onClick={sendIrrigate} className="btn btn-primary btn-lg">Irrigar</button>
        </div>
    </>



    
  );
}







  // function onMessage(message){
  //   if (message.destinationName == "greenhouse/temp")
  //     setTemp(message.payloadString); //Alterar para json
  // }

  // useEffect(() => {
  //   client.connect( {_onConnectionLost;_onConnectionLost;
  //       onSuccess: () =>{
  //         console.log("Connected!");
  //         client.subscribe("greenhouse/temp");
  //         client.onMessageArrived = onMessage;
  //       },
  //       onFailure: () => {
  //         console.log("Faile to connect!");
  //       }
  //     } );
  // }, [])

  // called when sending payload


  // function sendIrrigate(c) {
  //   const message = new Paho.Message(JSON.stringify("AAA"));
  //   message.destinationName = "topic/react";
  //   c.send(message);
  // }





// const MessageList = (props) => {
//   const { mqtt, data } = props;
//   // here mqtt is the connection object
//   // and data is the object that has the incoming data from the broker

//   return (
//     <React.Fragment>
//       {data.map((d, i) => (
//         <p>{`${JSON.stringify(d, null, 4)}`}</p>
//       ))}
//     </React.Fragment>
//   );
// };

// name the below component anything you want
// const Connected = subscribe({ topic: "greenhouse/temp" })(MessageList);
