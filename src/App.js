import { BrowserRouter , Routes, Route, HashRouter} from 'react-router-dom'
import './PageStyle.css';
import MainPage from './pages/mainpage'
import ReceiptHistory from './pages/receiptHistory'
import React from 'react';
import "../src/pages/renderer.js"
function App() {
  return (
    <div className="App">
      
    <HashRouter>
    <Routes>
    
     
    
    
        
    <Route exact path="/" element={<MainPage/>}> </Route>
    <Route exact path="/ReceiptHistory" element={<ReceiptHistory/>}> </Route>
    
    </Routes>
    </HashRouter>
  
    </div>
  );
}

export default App;
