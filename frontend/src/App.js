import './App.css';
import { Profile } from './Pages/Profile/Profile';
import Login from "./Pages/Login/Login"
import Register  from "./Pages/Register/Register"
import Home from './Pages/Home/Home';
import { CreateEvent } from './Pages/Create_event/CreateEvent';
import More from './Pages/More/More';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
