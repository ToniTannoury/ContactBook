import React from 'react';
import { FaEdit, FaTrash, FaUser, FaPhone, FaMapMarkerAlt ,FaMap} from 'react-icons/fa';
import "../styles/contactItem.css"
import {useContext ,useEffect , useState } from "react"
import ContactsContext from "../context/ContactController"
const ContactItem = ( { name, phone_number, picture, longitude, latitude,id , onEditClick , updateMapCenter} ) => {
  const { contacts, dispatch } = useContext(ContactsContext);
  const handleDelete = async(e)=>{
    const c_id = +e.target.parentElement.parentElement.getAttribute("c_id")
    const response =  await fetch(`http://127.0.0.1:8000/api/contacts/${c_id}` ,{
      method:"DELETE",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    });

    const data = await response.json()
    console.log(data)
    dispatch({ type: 'deleteContact', payload: c_id});

  }
  const handleShowMap = (e)=>{
    const long = e.target.parentElement.parentElement.getAttribute("long")
    const lat = e.target.parentElement.parentElement.getAttribute("lat")
    console.log(lat)

    updateMapCenter(lat, long)

  }
  
  return (
    <div className='contactContainer'>
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