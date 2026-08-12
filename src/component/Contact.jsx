function Contact({contact}){

    return(
        <>
            <h3>{contact.name}</h3>        
            <p>{contact.number}</p>
            <p>{contact.location}</p>
        </>
    )

};
export default Contact;