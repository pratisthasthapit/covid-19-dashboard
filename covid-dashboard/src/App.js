import React, { useEffect, useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import CardDeck from "react-bootstrap/CardDeck";
import Table from 'react-bootstrap/Table'
import axios from "axios";

function App() {
  const[latest, setLatest] = useState([]);
  const[results, setResults] = useState([]);

  useEffect(() => {
    axios
    .all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries?sort=country")
    ])
      
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const tableData = results.map((data, i) => {
    return(
          <tr key={i}>
            <td><div img="{data.countryInfo.flag}"></div></td>
            <td>{data.country}</td>
            <td>{data.cases}</td>
            <td>{data.active}</td>
            <td>{data.recovered}</td>
            <td>{data.deaths}</td>
          </tr>
    )}
  );

  return(
  <div className="App">
      <br/>
      <h2 style={{textAlign: "center"}}>COVID-19 Dashboard</h2>
      <br/>

      <CardDeck>
        <Card 
          className="text-center" 
          bg="light" 
          text={"dark"} 
          style={{margin: "10px"}}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
            {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card 
          className="text-center" 
          bg="light" 
          text={"danger"} 
          style={{margin: "10px"}}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
            {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card 
          className="text-center" 
          bg="light" 
          text={"success"} 
          style={{margin: "10px"}}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br/>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Country</th>
            <th>Total Cases</th>
            <th>Cases today</th>
            <th>Recovered</th>
            <th>Death</th>
          </tr>
        </thead>
        <br/>
        <tbody>{tableData}</tbody>
      </Table>
    </div>
  );
}

export default App;
