import React from 'react';
import { FaEdit, FaTrash, FaUser, FaPhone, FaMapMarkerAlt ,FaMap} from 'react-icons/fa';
import "../styles/contactItem.css"
import {useContext ,useEffect , useState } from "react"
import ContactsContext from "../context/ContactController"


const ContactItem = ({ name, phone_number, picture, longitude, latitude, id, onEditClick, updateMapCenter }) => {
  const { contacts, dispatch } = useContext(ContactsContext);
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    const c_id = +e.target.parentElement.parentElement.getAttribute("c_id");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/contacts/${c_id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      dispatch({ type: 'deleteContact', payload: c_id });
    } catch (error) {
      console.error("Error deleting contact:", error.message);
      setError("Error deleting contact. Please try again.");
    }
  };

  const handleShowMap = (e) => {
    const long = e.target.parentElement.parentElement.getAttribute("long");
    const lat = e.target.parentElement.parentElement.getAttribute("lat");
    console.log(lat);

    updateMapCenter(lat, long);
  };

  return (
    <div className='contactContainer'>
       {error && <div className="error-message">{error}</div>}
      <div className='contact' c_id={id} long={longitude} lat={latitude}>
        <div className='contactImage'>
          <img src={`http://127.0.0.1:8000/images/${picture}`} alt='Profile' />
        </div>
        <div className='contactInfo'>
          <h3>
            <FaUser /> {name}
          </h3>
          <p>
            <FaPhone /> {phone_number}
          </p>
          <p>
            <FaMapMarkerAlt /> Longitude:{longitude}, Latitude: {latitude}
          </p>
        </div>
        <div className='contactActions'>
          <button onClick={onEditClick}>
            <FaEdit /> Edit
          </button>
          <button  onClick={handleDelete}>
            <FaTrash /> Delete
          </button>
          <button onClick={handleShowMap}>
            <FaMap /> Show location
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;