import PokeCard from "../PokeCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Button, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "@/app/services/api";
import getRandomPokemons from "@/app/helpers/getRandomPokemons";
import CardSkeleton from "../CardSkeleton";
import Alert from "../Alert/Alert";
import {
  BattleInfo,
  BattleResponse,
  PokemonState,
  Props,
} from "./fight.interface";

const PokeFight = ({
  firstPosition,
  secondPosition,
  isLoading,
  allPokemons,
  inBattle,
  setInBattle,
}: Props): any => {
  const [error, setError] = useState(false);
  const [battleInfo, setBattleInfo] = useState<BattleInfo>({
    turn: 1,
    winner: undefined,
  });
  const [pokemons, setPokemons] = useState<PokemonState>({
    attacker: null,
    defender: null,
  });

  useEffect(() => {
    if (!isLoading) {
      setPokemons({
        attacker: firstPosition,
        defender: pokemons.defender || secondPosition,
      });
    }
  }, [isLoading, firstPosition]);

  const handleBattleStart = async () => {
    try {
      if (error) setError(false);
      const fighters = getRandomPokemons(allPokemons, firstPosition);

      setPokemons(() => ({
        attacker: fighters.attacker,
        defender: fighters.defender,
      }));

      const { data }: { data: BattleResponse } = await api.post("/pokemons", {
        pokemonOne: fighters.attacker,
        pokemonTwo: fighters.defender,
      });

      let battleIndex = 0;
      setInBattle(true);

      const interval = setInterval(() => {
        if (battleIndex < data.simulation.length) {
          if (pokemons.attacker && pokemons.defender) {
            const currentBattle = data.simulation[battleIndex];
            const updatedAttacker = currentBattle[fighters.attacker.id];
            const updatedDefender = currentBattle[fighters.defender.id];

            setPokemons(() => ({
              attacker: updatedAttacker,
              defender: updatedDefender,
            }));

            setBattleInfo({
              turn: battleIndex + 1,
            });

            battleIndex++;
          }
        } else {
          clearInterval(interval);
          setInBattle(false);
          setBattleInfo({
            turn: 1,
            winner: data.winner,
          });
        }
      }, 1200);
    } catch (error) {
      setError(true);
    }
  };

  if (isLoading || !pokemons.attacker || !pokemons.defender)
    return (
      <Box>
        <CardSkeleton width={"100%"} height={46} />
        <Box sx={{ mt: 3 }}>
          <CardSkeleton width={"100%"} height={469} />
        </Box>
      </Box>
    );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Alert message="Error Fetching Battle" open={error} setOpen={setError} />
      <Box
        width={"100%"}
        sx={{
          borderRadius: 1,
          mb: 3,
          p: 1,
          px: 5,
          bgcolor: "#c4f5d1",
        }}
      >
        <Typography fontSize={20}>
          {battleInfo.winner
            ? `${battleInfo.winner.name} wins!`
            : "Waiting for results.."}
        </Typography>
      </Box>

      <Grid
        container
        spacing={5}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid size={{ xs: 12, lg: 5 }}>
          <PokeCard
            withHistory={pokemons.attacker.id}
            pokemon={pokemons.attacker}
            statsMode
          />
        </Grid>
        <Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {inBattle && (
              <Box sx={{ mb: 2 }}>
                <Typography>Turno</Typography>
                <Chip label={battleInfo.turn} color="primary" />
              </Box>
            )}
            <Button
              disabled={inBattle}
              onClick={handleBattleStart}
              variant="contained"
            >
              Start Battle
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <PokeCard
            withHistory={pokemons.defender.id}
            pokemon={pokemons.defender}
            statsMode
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PokeFight;
