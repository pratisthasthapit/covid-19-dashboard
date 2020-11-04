import React, { useEffect, useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import CardDeck from "react-bootstrap/CardDeck";
import Table from 'react-bootstrap/Table'
import Form from "react-bootstrap/Form"
import axios from "axios";
import covid from './covid.png';

function App() {
  const[latest, setLatest] = useState([]);
  const[results, setResults] = useState([]);
  const[searchCountries, setSearchCountries] = useState("");

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

  const filterCountries = results.filter(item => {
    return searchCountries !== "" 
    ? item.country.toString().toLowerCase().includes(searchCountries.toString().toLowerCase()) 
    :item;
  });

  const tableData = filterCountries.map((data, i) => {
    return(
          <tr key={i}>
            <td>
              <div> <img className="flag-img" src={data.countryInfo.flag} alt=""/></div>
            </td>
            <td>{data.country}</td>
            <td>{data.cases}</td>
            <td>{data.active}</td>
            <td>{data.recovered}</td>
            <td>{data.deaths}</td>
          </tr>
    )}
  );

  var queries =[{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  const covidImg = <img className="img" src={covid} alt="Covid image"/>;

  return(
  <div className="App">
      <br/>
      <h2>COVID-19 Dashboard</h2>
      <br/>
      {covidImg}
      <p className="text">
        Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.
      <br/>
      The following data has been recently updated at: {lastUpdated}
      </p>
      <br/>
      <div className="container">
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
      <br/>
      <br/>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control 
          type="text" 
          placeholder="Search country"
          onChange = {
            e => setSearchCountries(e.target.value)
          } />
        </Form.Group>
      </Form>

      <br/>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Flag</th>
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
    </div>
  );
}

export default App;
