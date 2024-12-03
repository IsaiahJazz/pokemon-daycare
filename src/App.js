
import PokemonTable from "./components/PokemonTable.jsx";
import Badge from 'react-bootstrap/Badge'
import './total-style.scss'





export default function App() {

  return (
    <div >
      <h1 style={{marginBottom: '24px'}}>
      <Badge bg='dark'>ISAIAH'S POKEMON DAYCARE</Badge>
      </h1>
      <PokemonTable />
    </div>
  );
}

