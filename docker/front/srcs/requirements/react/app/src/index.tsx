import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Play from "./pages/Play";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Header from "./components/Header";

import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Header /> }>
          <Route index path="play" element={<Play />} />
          <Route index path="profile" element={<Profile />} />
          <Route index path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
