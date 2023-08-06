import React, { useState, useContext } from 'react';
import ContactsContext from "../context/ContactController";
import ContactsList from "./ContactsList";
import "../styles/landing.css";
import ReactModal from 'react-modal';

const PhoneBook = () => {
  const { contacts, dispatch } = useContext(ContactsContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone_number: '',
    latitude: '',
    longitude: '',
    picture: '',
  });

  const [editContact, setEditContact] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (editContact) {
   
      setEditContact({ ...editContact, [name]: value });
    } else {
    
      setNewContact({ ...newContact, [name]: value });
    }
  }

  const handleAddContact = () => {
    
    setNewContact({
      name: '',
      phone_number: '',
      latitude: '',
      longitude: '',
      picture: '',
    });
    const addContact = async (name , phone_number , latitude,longitude,pic_url) => {
      const body = {
        "name":name,
        "phone_number" :phone_number,
        "latitude": latitude,
        "longitude":longitude,
      }
      const response =  await fetch(`http://127.0.0.1:8000/api/contacts` ,{
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      });

      const data = await response.json()
      console.log(data)
      
      dispatch({ type: 'addContact', payload: data.contact});  
    }
    
    addContact(newContact.name , newContact.phone_number , newContact.latitude, newContact.longitude ,  newContact.pic_url)
    setIsModalOpen(false);
  };

  const handleEditClick = (e) => {
    const selectedContactId = +e.target.parentElement.parentElement.getAttribute("c_id")
    const willDisplay = contacts.contacts.filter(contact => contact.id === selectedContactId)
    console.log(willDisplay)
    setEditContact(willDisplay[0]);
    setIsModalOpen(true);
  };

  const editSelectedContact = async (c_id, name, phone_number, latitude, longitude, pic_url) => {
    const body = {
      "name": name,
      "phone_number": +phone_number,
      "latitude": latitude,
      "longitude": longitude,
    };
    const response = await fetch(`http://127.0.0.1:8000/api/contacts/${c_id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log(data)
    dispatch({ type: 'editContact', payload: data.contact });
    setIsModalOpen(false);
  };

  const handleEditContact = () => {
    if (editContact) {
      const { id, name, phone_number, latitude, longitude, location_name } = editContact;
      editSelectedContact(id, name, phone_number, latitude, longitude, location_name);
    }
  };

  return (
    <div className='phoneBook'>
      <div className='midContainer'>
        <div className="headerContainer">
          <h1 className="contactsHeader">Your Contacts</h1>
          <button className="addContact" onClick={() => setIsModalOpen(true)}>
            Add Contact
          </button>
        </div>
        
        <ContactsList
          contacts={contacts.contacts}
          onEditClick={handleEditClick} 
        />
      </div>
      
      <ReactModal
        isOpen={isModalOpen}
          onRequestClose={() => {
          setEditContact(null); 
          setIsModalOpen(false);
        }}
        contentLabel="Add/Edit Contact Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{editContact ? "Edit Contact" : "Add New Contact"}</h2>
        <input
          type="text"
          name="name"
          value={editContact ? editContact.name : newContact.name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone_number"
          value={editContact ? editContact.phone_number : newContact.phone_number}
          placeholder="Phone Number"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="latitude"
          value={editContact ? editContact.latitude : newContact.latitude}
          placeholder="Latitude"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="longitude"
          value={editContact ? editContact.longitude : newContact.longitude}
          placeholder="Longitude"
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="picture"
          placeholder="Picture URL"
          onChange={handleInputChange}
        />
        <br />
        <button onClick={editContact ? handleEditContact : handleAddContact}>
          {editContact ? "Save Changes" : "Add Contact"}
        </button>
      </ReactModal>
    </div>
  );
};

export default PhoneBook;
