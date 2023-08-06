import PhoneBook from './components/PhoneBook';
import { ContactsProvider } from './context/ContactController';
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <ContactsProvider>
        <Routes>
          <Route path="/" element={<PhoneBook/>}/>
        </Routes>
      </ContactsProvider>
    </Router> 
  );
}

export default App;
