import Stack from '@mui/material/Stack';
import PokemonList from './PokemonList'; 

function App() {
  return (
    <Stack spacing={2} sx={{ padding: 3 }}>
      <h1 style={{ color: 'inherit', fontWeight: 'bold' }}>
        lista pokémon
      </h1>
      
      <PokemonList />
    </Stack>
  );
}

export default App;