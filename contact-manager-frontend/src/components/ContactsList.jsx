import {useContext ,useEffect , useState } from "react"
import ContactsContext from "../context/ContactController"
import ContactItem from "./ContactItem"
import React from 'react'
import { MapContainer, TileLayer, useMap ,Marker , Popup ,ZoomControl } from 'react-leaflet'


const ContactsList = ({onEditClick}) => {

  const { contacts, dispatch } = useContext(ContactsContext);
  console.log((contacts.contacts))


  const [mapCenter, setMapCenter] = useState({ lat: 55, long: 3});
  const [zoomVal, setZoomVal] = useState(0);
  

 useEffect(()=>{
  
  const contain = document.querySelector(".leaflet-container")
  
  contain.style = "overflow:visible;"
  
 })
  useEffect(() => {
    const fetchProducts = async () => {
      const response =  await fetch(`http://127.0.0.1:8000/api/contacts` ,{
        method:"GET",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
      });
     

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'populateContacts', payload: data});
      } else {
        console.error("Error fetching contacts:", response);
      }
    };

    fetchProducts();
  } , []); 
  

  const updateMapCenter = (latitude, longitude) => {
    setMapCenter({ lat: latitude, long: longitude });
  };

  return (
    <div className="contactsList">
      

<div className="contacts">
{contacts.contacts?.map((contact) => {
        return (
        <ContactItem
          key={contact.id}
          name={contact.name}
          phone_number={contact.phone_number}
          latitude={contact.latitude}
          id={contact.id}
          longitude={contact.longitude}
          picture={contact.pic_url}
          onEditClick={onEditClick}
          updateMapCenter={updateMapCenter}
        />
      )})}
</div>
   
      <div className="conain" >
      <MapContainer center={[ mapCenter.lat, mapCenter.long]} zoom={5} zoomControl={false} scrollWheelZoom={true}  style={{ minWidth: "50px",minHeight: "500px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[mapCenter.lat, mapCenter.long]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      </div>
      
    </div>
  );
};

export default ContactsList
