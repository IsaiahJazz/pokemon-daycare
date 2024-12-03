import React, { useState, useEffect, useContext } from "react";

//imported elements and styles
import AddPokemon from "./addPokemon";
import { getRandomPokemon } from "../pokemonService";
import PokemonNotes from "./notesBox";
import  './table-styles.scss'

//imports from dependencies
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import {Pencil} from 'react-bootstrap-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

const PokemonTable = () => {
  const [notes, setNotes] = useState({})
  const [pokemonList, setPokemonList] = useState([]);
  const [expandedRows, setExpandedRows] = useState([])
  const [newNames, setNewNames] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState([])
 
  const handleNameChange = (id) => {
    setPokemonList((prevList) =>
      prevList.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, name: newNames[id] || pokemon.name } : pokemon
      )
    );
    setNewNames((prevNames) => ({ ...prevNames, [id]: '' })); // Clear the input after change
  };

  const handleAddPokemon = (newpokemon) => {
    setPokemonList([...pokemonList, newpokemon])
  }
  const handleAddRandomPokemon = (randomPokemon) => {
 
    setPokemonList([...pokemonList, randomPokemon])
  }

  useEffect(() => {

    console.log(selectedPokemon)
  }, [selectedPokemon])


  useEffect(() => {
    const fetchPokemon = async () => {
      const promises = Array.from({ length: 6 }, () => getRandomPokemon());
      
      const results = await Promise.all(promises);
      
      setPokemonList(results);
    };

    fetchPokemon();
  }, []);
  
  const handleInputChange = (id, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: value,
    }));
  };
  const handleRowClick = (id) => {
    setExpandedRows((prevExpanded) =>
      prevExpanded.includes(id) ? prevExpanded.filter((rowId) => rowId !== id) : [...prevExpanded, id]
    );
  };


  const handleReturnClick = (id) => {
    setPokemonList(pokemonList.filter(pokemon => pokemon.id != id))
  }

  
  return (
    <div className="everything">
    <br/>
    <br/>
      <div style={{width: '70%'}}>
        <Table striped bordered hover responsive variant="dark" >
     
          <thead >
            <tr>
              <th >Name</th>
              <th >Sprite</th>
            </tr>
          </thead>
          <tbody >
            {pokemonList.map((pokemon) => (
                <React.Fragment key={pokemon.id} > 
                <tr>
                  <td>
                    {pokemon.name}
                    <div>
                      <input type='text' 
                      placeholder="Give a Nickname!" 
                      value={newNames[pokemon.id]||''} 
                      onChange={(e) => setNewNames((prev) => ({ ...prev, [pokemon.id]: e.target.value }))}
                      />
                      <Button
                        variant="light"
                        onClick={() => handleNameChange(pokemon.id)}
                        style={{ marginLeft: '8px' }}
                      >
                           Save Name
                       <Pencil style={{ marginLeft: '4px' }} />
                       </Button>
                    </div>
                  </td> 
                  <td>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div>
                      <Button variant="light" onClick={() => handleRowClick(pokemon.id)}> See More </Button>
                    </div>
                  </td>
              </tr>
              {expandedRows.includes(pokemon.id) &&
              <tr>
                <td colSpan={2}>
                    <div>
                    <div className="extra-rows">
                      <p><strong>Level:</strong> {pokemon.level}</p>
                      <p><strong>Height:</strong> {pokemon.height}</p>
                      <p><strong>Weight:</strong> {pokemon.weight}</p>
                    </div>
                    <div className="notes-box" >
                    <PokemonNotes notes={notes[pokemon.id] || ''} handleInput={(value)=> handleInputChange(pokemon.id, value)}/>
                    </div>
                      <Button variant="danger" onClick={() => handleReturnClick(pokemon.id) }> Return to Owner</Button>
                    </div>
                </td>
        
              </tr>
              }
          
                </React.Fragment>
            ))}
          </tbody>
        </Table>
    </div>
      <div style={{width: '30%'}} >
      <AddPokemon onAddPokemon={handleAddPokemon} onAddRandom={handleAddRandomPokemon} currentList={pokemonList}/>
      </div>
    </div>
  );
};

export default PokemonTable;
