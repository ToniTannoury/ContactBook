import { createContext , useState , useEffect ,useReducer} from "react";

const ContactsContext = createContext()

export const ContactsProvider = ({ children }) => {
  const initialState = [];
  const reducer = (state, action) => {
    switch (action.type) {
      case 'populateContacts':
        return action.payload;
      case 'addContact':
        console.log(state)
        return {contacts:[...state.contacts ,  action.payload]};
      case 'editContact': 
        const updatedContact = action.payload;
        console.log(action.payload)
        return {contacts:state.contacts.map(contact => 
          contact.id === updatedContact.id ? updatedContact : contact
        )} ;
        case 'deleteContact':
          return {contacts:state.contacts.filter((contact) => contact.id !== action.payload)};
      default:
        return state;
    }
  };

  const [contacts, dispatch] = useReducer(reducer, initialState);
  
  return (
    <ContactsContext.Provider value={{ contacts, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsContext