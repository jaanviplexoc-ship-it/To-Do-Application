import { useState } from "react";

function ContactForm({onAddContact}){
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [location, setLocation] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        const newContact = {
            name : name,
            number : number,
            location : location
        };

        onAddContact(newContact);

        setName("");
        setNumber("");
        setLocation("");

    }

    return (
        <>
        <h1>Contact Management System </h1>
        <br /><br />
        
        <form onSubmit={handleSubmit}>
        <label>Contact Name : </label>
        <input 
        type="text"
        placeholder="Enter Name "
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <label>Contact Number : </label>
        <input
        type="text"
        placeholder="Enter Number "
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        />
        <br /><br />

        <label>Location : </label>
        <input 
        type="text"
        placeholder="Enter Location "
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        />
        <br /><br />

        <button type="submit">
            Add Contact
        </button>

        </form>
        </>

    )
};

export default ContactForm;