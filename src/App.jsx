import { useState } from 'react'
import ContactForm from './component/ContactForm'
import ContactList from './component/ContactList';

function App() {

  const [contacts,setContact] = useState([]);
  const [showList,setShowList] = useState(false);

  function addContact(newContact){
    setContact([...contacts,newContact]);
  }

  function handleView(){
    setShowList(true)
  }

  return (
    <>
      <ContactForm onAddContact={addContact}/>

      <button onClick={handleView}>
        View Contact
      </button>

      
      {showList && (
        <ContactList contacts={contacts} />
      )}
    </>
  )
}

export default App
