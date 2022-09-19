import React from "react";
import { useState } from "react";
import { Connector, subscribe } from "react-mqtt-client";

export default function App() {
  const [setWet] = useState("");

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand" href="#top">
          Terrarium Condições do ambiente
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>umidade</h1>
          <h1>temperatura</h1>
          <h1>luminosidade</h1>
          <h1>humidade ar</h1>
          <button className="btn btn-primary btn-lg">Irrigar</button>
        </div>
      </main>
    </div>

    // <Connector
    //   mqttProps={{
    //     url: "http://broker.emqx.io:1884",
    //     options: { protocol: "tcp/mqtt" }
    //   }}
    // >
    //   {/* <Connected />
    // </Connector> */}
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
