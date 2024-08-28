import IPokemon from "@/app/interfaces/pokemon.interface";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Dispatch, SetStateAction, useState } from "react";
import ProgressBar from "../ProgressBar";
import { MAX_VALUES } from "@/app/helpers/constants";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import HistoryIcon from "@mui/icons-material/History";
import History from "../HistoryModal";

interface Props {
  pokemon: IPokemon;
  select?: Dispatch<SetStateAction<IPokemon | undefined>>;
  isActionable?: boolean;
  statsMode?: boolean;
  withHistory?: number;
}

const historyInitialState = {
  id: 0,
  open: false,
};

const PokeCard = ({
  pokemon,
  select,
  isActionable,
  statsMode,
  withHistory,
}: Props) => {
  const [history, setHistory] = useState(historyInitialState);

  const handlePokemonSelect = () => {
    if (select) select(pokemon);
  };

  const getCardContent = () => {
    let content = (
      <CardContent sx={{ px: 5, position: "relative" }}>
        {withHistory && (
          <>
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
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            height: 120,
            pointerEvents: "none",
          }}
          image={pokemon.imageUrl}
          title={pokemon.name}
        />
        <Typography mt={1} fontWeight={600} textAlign={"center"}>
          {pokemon.name}
        </Typography>
      </CardContent>
    );

    if (isActionable) {
      content = (
        <CardActionArea onClick={handlePokemonSelect}>{content}</CardActionArea>
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
