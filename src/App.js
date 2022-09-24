import React, {  useEffect, useState } from "react";
import Main from "./Main";

import * as mqtt from 'react-paho-mqtt';


export default function App() {

  const inputChange=(e, valor) => {
    this.setState({
      valor: e.target.value,
    });
  }

  

  // this.state = {
  //   novaTemperatura: '',
  //   novaUmidade: '',
  //   novaLuminosidade: '',
  //   novaUmidadeAr: '',
  // };



  const { novaTemperatura, novaUmidade, novaLuminosidade, novaUmidadeAr } = '';
    const [client, setClient] = React.useState(null);
    const _topic = ["greenhouse/umi",
      "greenhouse/temp",
      "greenhouse/umi_ar",
      "greenhouse/lumi"];
    const _options = {};

  React.useEffect(() => {
    _init();
  },[])

  const _init = () => {
    const c = mqtt.connect("broker.emqx.io", Number(8083), "mqtt", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    setClient(c);
  }

  // function onMessage(message){
  //   if (message.destinationName == "greenhouse/temp")
  //     setTemp(message.payloadString); //Alterar para json
  // }

  // useEffect(() => {
  //   client.connect( {
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
  const sendIrrigate = () => {
    const latter = mqtt.parsePayload("topic/react", JSON.stringify("AAA")); // topic, payload
    client.send(latter);
  }

  // function sendIrrigate(c) {
  //   const message = new Paho.Message(JSON.stringify("AAA"));
  //   message.destinationName = "topic/react";
  //   c.send(message);
  // }

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
      for (var i = 0; i < _topic.length; i++) {
        client.subscribe(_topic[i], _options);
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
          <h1>
            {/* <Connector
            brokerUrl='ws://broker.emqx.io:8083/mqtt'
            parserMethod={msg => msg} >
            <Main />
          </Connector> */}
          </h1>
          <h1>Temperatura: {novaTemperatura}</h1>
          <h1>Umidade: {novaUmidade}</h1>
          <h1>Luminosidade: {novaLuminosidade}</h1>
          <h1>Umidade ar: {novaUmidadeAr}</h1>
          <button onClick={sendIrrigate} className="btn btn-primary btn-lg">Irrigar</button>
        </div>
    </>



    
  );
}





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
