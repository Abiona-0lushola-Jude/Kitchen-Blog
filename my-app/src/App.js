import './Style/style.scss'
import {Route, Routes} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Write from './Pages/Write';
import Profile from './Pages/Profile';
import OneFullBlog from './Pages/OneFullBlog';
import Pages from './Pages/Pages'
import Search from './Pages/Search'
import EditBlog from './Pages/EditBlog'
import axios from 'axios';

function App() {

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:5000"


  

  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homepage />} /> 
        <Route path='/fullBlog/:user/:id' element={<OneFullBlog />} />
        <Route path='/write' element={<Write />} />
        <Route path='/user/profile/:username' element={<Profile />} />
        <Route path='edit/:id' element={<EditBlog />} />
        <Route path='/search' element={< Search />} />
        <Route path='/allBlog/more' element={<Pages />} />
        <Route path='/*' element={"THIS PAGE CANNOT BE FOUND!!!!"} />
      </Routes>
      
    </div>
  );
}

export default App;
