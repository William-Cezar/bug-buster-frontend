import React, { useState, useEffect } from 'react';
import './App.css';
import bugImage from './bug.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReportBug from './ReportBug';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("https://mbabugbuster.rj.r.appspot.com/is_authenticated/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setIsLoggedIn(data.is_authenticated);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }, []);

    function handleLogin(event) {
        event.preventDefault();

        fetch("https://mbabugbuster.rj.r.appspot.com/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setIsLoggedIn(true);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    return (
        <Router>
            <div className="App">
                {isLoggedIn ? (
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
                        {/* Adicionar rotas*/}
                    </Routes>
                ) : (
                    <div className="login-container">
                        <div className="login-header">
                            <img src={bugImage} alt="Left Bug" />
                            <h2>Bug Buster</h2>
                            <img src={bugImage} alt="Right Bug" />
                        </div>
                        <form className="login-form" onSubmit={handleLogin}>
                            <input 
                                type="text" 
                                placeholder="Username"
                                className="login-input"
                                value={username} 
                                onChange={e => setUsername(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="login-input"
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button className="login-button" type="submit">Login</button>
                        </form>
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;
