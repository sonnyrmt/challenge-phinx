import IPokemon from "@/app/interfaces/pokemon.interface";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Dispatch, SetStateAction, useState } from "react";
import ProgressBar from "../ProgressBar";
import { MAX_VALUES, TYPE_ICON } from "@/app/helpers/constants";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import HistoryIcon from "@mui/icons-material/History";
import History from "../HistoryModal";
import { historyInitialState, Props } from "./card.interface";
import Image from "next/image";

const PokeCard = ({
  pokemon,
  select,
  isActionable,
  statsMode,
  withHistory,
  inBattle,
}: Props) => {
  const [history, setHistory] = useState(historyInitialState);

  const handlePokemonSelect = () => {
    if (select) {
      select(pokemon);
    }
  };

  const getCardContent = () => {
    const hit = pokemon?.damage ? "hit" : undefined;
    let content = (
      <CardContent sx={{ px: 5, position: "relative" }}>
        {withHistory && (
          <>
            <Box
              sx={{
                position: "absolute",
                left: 20,
                top: -10,
                background: TYPE_ICON[pokemon.type].color,
                display: "flex",
                justifyContent: "center",
                borderRadius: "10px",
                p: 1,
              }}
            >
              <Image
                width={20}
                height={20}
                src={TYPE_ICON[pokemon.type].url}
                alt="pokemon-type"
              />
            </Box>
            <IconButton
              onClick={() => setHistory({ id: withHistory, open: true })}
              sx={{ position: "absolute", right: 20, top: -10 }}
            >
              <HistoryIcon />
            </IconButton>
            <History
              id={history.id}
              open={history.open}
              onClose={() => setHistory(historyInitialState)}
            />
          </>
        )}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            className={hit}
            component="img"
            sx={{
              objectFit: "contain",
              height: 120,
              pointerEvents: "none",
              filter: inBattle ? "grayscale(1)" : null,
            }}
            image={pokemon.imageUrl}
            title={pokemon.name}
          />
          {pokemon?.damage && (
            <CardMedia
              className={hit}
              component="img"
              sx={{
                objectFit: "contain",
                height: 120,
                pointerEvents: "none",
                top: 0,
                position: "absolute",
                opacity: "50%",
                filter:
                  "brightness(0) saturate(100%) invert(20%) sepia(78%) saturate(6462%) hue-rotate(356deg) brightness(104%) contrast(126%)",
              }}
              image={pokemon.imageUrl}
              title={pokemon.name}
            />
          )}
        </Box>
        <Typography mt={1} fontWeight={600} textAlign={"center"}>
          {pokemon.name}
        </Typography>
      </CardContent>
    );

    if (isActionable) {
      content = (
        <CardActionArea disabled={inBattle} onClick={handlePokemonSelect}>
          {content}
        </CardActionArea>
      );
    }

    if (statsMode) {
      content = (
        <Box sx={{ py: 4 }}>
          {content}
          <Divider />
          <Box sx={{ p: 2 }}>
            <ProgressBar
              currentValue={pokemon.hp}
              maxValue={pokemon.maxHp || pokemon.hp}
              label={"HP"}
            />
            <ProgressBar
              currentValue={pokemon.attack}
              maxValue={MAX_VALUES["attack"]}
              label={"attack"}
            />
            <ProgressBar
              currentValue={pokemon.defense}
              maxValue={MAX_VALUES["defense"]}
              label={"defense"}
            />
            <ProgressBar
              currentValue={pokemon.speed}
              maxValue={MAX_VALUES["speed"]}
              label={"speed"}
            />
          </Box>
        </Box>
      );
    }

    return content;
  };

  const content = getCardContent();

  return (
    <Box>
      <Card sx={{ boxShadow: 3 }}>{content}</Card>
    </Box>
  );
};

export default PokeCard;
