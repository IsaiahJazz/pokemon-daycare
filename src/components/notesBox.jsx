import "./table-styles.scss"
import React from 'react'

import Form from 'react-bootstrap/Form'

const PokemonNotes = ({handleInput, notes}) => {
  
    return <Form >
            <textarea className="notes-box" value={notes} onChange={(e) => handleInput(e.target.value)} placeholder="Enter Notes Here..."/>
         </Form >
}

export default PokemonNotes