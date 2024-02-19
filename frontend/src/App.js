import './App.css';
import {useState} from "react";
import Calendar from "./Calendar";
import {Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  const [view,setView] = useState("week");
  const[workweek,setWorkWeek] = useState(false);

  return (
    <div className="App">
      <div className="top-pane">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        View
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>{setView("month")}}>Monthly</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setView("week");setWorkWeek(false)}}>Weekly</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setView("week");setWorkWeek(true)}}>Work Week</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setView("day")}}>Daily</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
      <div className="calender-wrapper">
        <Calendar view={view} workweek={workweek} />
      </div>
    </div>
  );
}

export default App;