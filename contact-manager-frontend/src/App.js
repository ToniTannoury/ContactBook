import Register from './components/Register';
import Login from './components/Login';
import PhoneBook from './components/PhoneBook';
import { UserProvider } from './context/UserContext';
import { ContactsProvider } from './context/ContactController';
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <UserProvider>
      <ContactsProvider>
      <Routes>
          <Route path='/' element={
            <>
              <Register/>
            </>
          }>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/landing" element={<PhoneBook/>}/>
        </Routes>
      </ContactsProvider>
      </UserProvider>
    </Router>
    
  );
}

export default App;
