import { BrowserRouter , Routes, Route} from 'react-router-dom'
import './PageStyle.css';
import MainPage from './pages/mainpage'
import ReceiptHistory from './pages/receiptHistory'
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    
     
    
    
        
    <Route exact path="/" element={<MainPage/>}> </Route>
    <Route exact path="/ReceiptHistory" element={<ReceiptHistory/>}> </Route>
    
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
