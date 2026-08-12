import { useState } from "react"
import Contact from './Contact'

function ContactList({contacts}){

    return(
        <>
        <h2>Contact List</h2>

        {contacts.map((contact,index) => (
            <Contact key={index}
            contact={contact}
            />
        ))}
        </>
    )
}

export default ContactList;