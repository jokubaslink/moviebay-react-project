import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page from './pages/Page';
import Search from './pages/Search';
import './App.css'

function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path=':searchTerm' element={<Search />}></Route>
        <Route path=':searchTerm/:movieId' element={<Page />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
