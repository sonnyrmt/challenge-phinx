"use client";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { api } from "./services/api";
import IPokemon from "./interfaces/pokemon.interface";
import PokeCard from "./components/PokeCard";
import getRandomPokemons from "./helpers/getRandomPokemons";
import PokeFight from "./components/PokeFight";
import CardSkeleton from "./components/CardSkeleton";

export default function Home() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemon>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllPokemons = async (): Promise<void> => {
      try {
        if (error) setError(false);

        const { data } = await api.get("/pokemons");
        setPokemons(data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    getAllPokemons();
  }, []);

  const fighters = getRandomPokemons(pokemons, selectedPokemon);

  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: "100vh", p: 5 }}>
        <Typography mb={2} fontSize={30}>
          Pokemon Battle
        </Typography>
        <Typography my={1} fontSize={16}>
          Select Your Fighter
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {isLoading ? (
              <CardSkeleton length={5} width={200} height={184} />
            ) : (
              pokemons.map((pokemon: IPokemon, idx) => (
                <Grid key={pokemon.id} size={{ xs: 6, md: "auto" }}>
                  <PokeCard
                    pokemon={pokemon}
                    select={setSelectedPokemon}
                    isActionable
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
        <Box mt={3}>
          <PokeFight
            firstPosition={selectedPokemon || fighters.attacker}
            secondPosition={fighters.defender}
            isLoading={isLoading}
            allPokemons={pokemons}
          />
        </Box>
      </Box>
    </Container>
  );
}
