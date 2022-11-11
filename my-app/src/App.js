import './Style/style.scss'
import {Route, Routes} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Write from './Pages/Write';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/write' element={<Write />} />
        <Route path='/*' element={"THIS PAGE CANNOT BE FOUND!!!!"} />
      </Routes>
      
    </div>
  );
}

export default App;
