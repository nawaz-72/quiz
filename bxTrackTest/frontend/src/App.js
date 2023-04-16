import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ViewBook from './component/ViewBook.js';
import CreateBook from './component/CreateBook.js';
import Updatemodal from './component/Updatemodal';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route index element={<CreateBook />} />
        
        <Route path="/viewBook" element={<ViewBook />} />
        < Route path='/updateBook' element={<Updatemodal/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
