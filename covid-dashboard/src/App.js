import './App.css';
import Card from 'react-bootstrap/Card';
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return(
  <div>
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
              xyz
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated </small>
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
            xyz
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated 3 mins ago</small>
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
          </Card.Body>
          <Card.Footer>
            <small>xyz</small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </div>
  );
}

export default App;
