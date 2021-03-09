import React from "react";
import Firebase from "firebase";
import config from "./config";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Forms} from './Forms';
import {Home} from './Home';
import {AddMentors} from './AddMentors';
import {Students} from './Students';
import {Sessions} from './Sessions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/AddMentors">Add Mentors</Link>
            </li>
            <li>
              <Link to="/Students">Students</Link>
            </li>
            <li>
              <Link to="/Forms">Forms</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
           <Route path="/Forms">
              <Forms />
            </Route>
            <Route path ="/Home">
              <Home/>
            </Route>
            <Route path ="/AddMentors">
              <AddMentors/>
            </Route>
            <Route path ="/Students">
              <Students/>
            </Route>
            <Route path ="/Sessions">
              <Sessions/>
            </Route>
            <Route path="/"> 
              <Home/>  
            </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}


export default App;
