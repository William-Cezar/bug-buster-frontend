import React from 'react';
import './App.css';
import bugImage from './bug.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReportBug from './ReportBug';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <header className="App-header">
                <div className="logo logo-top">BUGBUSTER</div>
                <div className="menu-container">
                  <img src={bugImage} alt="bug" className="menu-image" />
                  <div className="menu">
                    <ul>
                      <li><Link to="/report">Reportar bugs</Link></li>
                      <li><Link to="/search">Pesquisar e Filtrar bugs</Link></li>
                      <li><Link to="/assign">Atribuir bugs</Link></li>
                    </ul>
                  </div>
                  <img src={bugImage} alt="bug" className="menu-image" />
                </div>
                <div className="logo logo-bottom">BUGBUSTER</div>
              </header>
            </>
          } />
          <Route path="/report" element={<ReportBug />} />
          {/* Adicione outras rotas aqui conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;
