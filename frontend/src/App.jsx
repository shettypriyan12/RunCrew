import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react'

import { BrowserRouter} from 'react-router-dom'
import AppContent from './AppContent';



function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppContent/>
      </BrowserRouter>
    </>
  )
}

export default App;
