
import React from 'react';
import { HashRouter as Router, Route, Link, Routes  } from 'react-router-dom';
import Home from './home/home';
import StudentList from './studentlist/studentlist';
import AddFees from './addfees/addfees';
import Feeslist from './feeslist/feeslist';
import './App.css';

const App = () => (
  <Router>
    
      <nav className='navbar'>
        <ul className='navbar-ul'>
          <li>
            <Link className='list' to="/">Home</Link>
          </li>
          <li>
            <Link className='list' to="/studentlist">StudentList</Link>
          </li>
          <li>
            <Link className='list' to="/addfees">AddFees</Link>
          </li>
          <li>
            <Link className='list' to="/feeslist">Feeslist</Link>
          </li>
        </ul>
      </nav>
      

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/addfees" element={<AddFees />} />
        <Route path="/feeslist" element={<Feeslist />} />
        </Routes>
    
  </Router>
);

export default App;
