import { BrowserRouter } from 'react-router-dom';
import NavigationScroll from './components/NavigationScroll';
import Rotas from './Rotas';

function App() {
  return (<BrowserRouter>
      <NavigationScroll>
        <Rotas />
      </NavigationScroll>
    </BrowserRouter>
  );
}

export default App;
