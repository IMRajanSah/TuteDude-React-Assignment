import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReadStudent from './component/ReadStudent';
import CreateStudent from './component/CreateStudent';
import EditStudent from './component/EditStudent';
import Header from './component/Header';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<ReadStudent/>}/>
        <Route path='/create' element={<CreateStudent/>}/>
        <Route path='/edit/:id' element={<EditStudent/>}/>
        <Route path='*' element={<p style={{marginTop:'5rem',textAlign:'center',color:'red'}}>Invalid Route !!</p>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
