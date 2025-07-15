import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { First } from './Component/First';
import { Game } from './Component/Game';
import Second from './Component/Second';

function App() {
  return (
    <Router>
      <Routes>
         {/* <Route exact path='/' element={<First />}></Route> */}
        <Route exact path='/number' element={<Second />}></Route>
        <Route exact path='/' element={<Game />}></Route>
          </Routes>
    </Router>
  );
}

export default App;
