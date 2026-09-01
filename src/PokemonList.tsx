import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

type PokemonItem = {
  name: string;
  url: string;
};

type PokeApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
};

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        
        if (!response.ok) {
          throw new Error('Hubo un problema al conectar con el servidor.');
        }

        const data: PokeApiResponse = await response.json();
        setPokemon(data.results);
      } catch (err: any) {
        setError(err.message || 'Algo salió mal.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  function viewDetails(name: string) {
    alert(`Ver detalles de: ${name.toUpperCase()}`);
  }

  if (loading) {
    return (
      <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <Stack spacing={2} sx={{ padding: 1 }}>
      {pokemon.map((poke) => {
        const pokemonId = poke.url.split('/').filter(Boolean).pop();
        
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

        return (
          <Stack
            key={poke.name}
            direction="row"
            spacing={2}
            sx={{
              border: '1px solid #cccccc',
              borderRadius: 2,
              padding: 2,
              alignItems: 'center',
            }}
          >
            <Avatar 
              src={imageUrl} 
              alt={poke.name} 
              sx={{ width: 56, height: 56, backgroundColor: '#f0f0f0' }} 
            />
            <div style={{ flexGrow: 1 }}>
              <strong style={{ textTransform: 'capitalize' }}>{poke.name}</strong>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>ID: #{pokemonId}</p>
            </div>
            <Button variant="outlined" onClick={() => viewDetails(poke.name)}>
              Ver info
            </Button>
          </Stack>
        );
      })}
    </Stack>
  );
}
