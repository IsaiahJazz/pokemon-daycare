import "./table-styles.scss"
import React from "react"
import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { getPokemonByIdOrName, getRandomPokemon } from "../pokemonService"
import Form from 'react-bootstrap/Form'
import UiError from "./error"


const AddPokemon = ({onAddPokemon, onAddRandom, currentList}) => {
    const [uierror, setuierror] = useState()
    const [pokemon, setPokemon] = useState()
    const handleInput = (event) => {
        if(typeof event.target.value == 'string' ){
            event.target.value = event.target.value.toLowerCase();
        }
        setPokemon(event.target.value)
    }
    const handleRandomClick = () => {
        getRandomPokemon().then((data) => {
            onAddRandom(data)  
        }).catch(error => console.log(error)
        )
    }


    const handleAddClick = () => {
        getPokemonByIdOrName(pokemon).then(data =>{
            const nameArray = currentList.map((index) => index.name)
            if (nameArray.includes(pokemon)){
                return
            }
            onAddPokemon(data)
            console.log(`THIS IS THE DATA FOR POKEMON ${pokemon}: `, data)
        } 
            ).catch(() =>{
                setuierror(UiError)
                return ""
            }
            )
    }
    
    return <Form className="add-pokemon-form">
            <div className="total-form">
                <div style={{marginBottom: '8px', marginTop: '8px', justifyContent: "center", display: "flex"}}>
                    <input type="text" className="add-pokemon-input" value={pokemon} onChange={handleInput} placeholder="Enter a Pokemon Name/ID"/>
                </div>
                <div style={{display: 'flex', justifyContent: "center", marginBottom: '8px'}}>
                  <Button variant="success" onClick={handleAddClick} style={{marginRight: '8px'}}> Add Pokemon </Button>
                  <Button variant="warning" onClick={handleRandomClick}> Generate Random Pokemon </Button>
                  {uierror}
                </div>
            </div>
         </Form >
}

export default AddPokemon