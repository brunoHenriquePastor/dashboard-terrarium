import React, { useState, useEffect, Component } from 'react';

import Content from './Content'
import Header from './Header'

//import * as mqtt from 'react-paho-mqtt';

import mqtt from 'mqtt';

export default class Main extends Component {

  _topic = ["greenhouse/umi",
      "greenhouse/temp",
      "greenhouse/umi_ar",
      "greenhouse/lumi"];

  topic = "greenhouse/terrarium";
  
  constructor(props) {
    super(props)
    this.state = {
      temperatures: 0,
      humidities: 0,
      lights: 0,
      humiditiesAr: 0,
    };
  }


  componentDidMount() {
    this.client = mqtt.connect("ws://broker.emqx.io:8083/mqtt"); //, Number(8083), "tcp/mqtt", this._onConnectionLost, this._onMessageArrived);
    this.client.on("connect", () => {
      console.log("connected");
      // for (var i = 0; i < this._topic.length; i++) {
        this.client.subscribe("greenhouse/terrarium");
      
    });
      this.client.on('message', (_topic, message) => {
        console.log(message.toString())
        this.handleJsonMessage(JSON.parse(message.toString()));
    })
  }

  // client.on('message', function (_topic, message) {
  //   // message is Buffer
  //   console.log(message.toString())
  //   client.end()
  // })

   

  handleJsonMessage = (json) => {
    const temperatures = this.state.temperatures || []
    const humidities = this.state.humidities || []
    const lights = this.state.lights || []
    const humiditiesAr = this.state.humiditiesAr || []
    const time = Date.now();
    temperatures.push([time, json.temperatures || 0])
    humidities.push([time, json.humidities || 0])
    lights.push([time, json.lights || 0])
    humiditiesAr.push([time, json.humiditiesAr || 0])
    this.setState({
      data: { ...json },
      temperatures,
      humidities,
      lights,
      humiditiesAr,
    })
  }

  componentWillUnmount() {
    if (this.client) {
      this.client.end()
    }
  }

  render() {
    const { classes } = this.props;
    const data = this.state.data || {}
    const temperatures = this.state.temperatures || []
    const humidities = this.state.humidities || []
    const lights = this.state.lights || []
    const humiditiesAr = this.state.humiditiesAr || []



    return (

      <div className="Main">
          <Header data={data} />
        <Content temperatures={temperatures}
          lights={lights}
          humiditiesAr={humiditiesAr}
          humidities={humidities} />
      {/* <h1>Temperatura: {temperatura}</h1>
      <h1>Umidade: {state.novaUmidade}</h1>
      <h1>Luminosidade: {lights}</h1>
      <h1>Umidade ar: {humidities}</h1>
      <button onClick={sendIrrigate} className="btn btn-primary btn-lg">Irrigar</button> */}
    </div>
    );
  }

}