import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import IPokemon from "@/app/interfaces/pokemon.interface";
import { api } from "@/app/services/api";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Alert from "../Alert/Alert";
import { modalStyle } from "@/app/helpers/constants";

interface IHistory {
  id: number;
  pokemonOne: IPokemon;
  pokemonTwo: IPokemon;
  winner: number;
  date: Date;
}

const History = ({
  id,
  open,
  onClose,
}: {
  id: number;
  open: boolean;
  onClose: () => void;
}) => {
  const [data, setData] = useState<IHistory[]>();
  const [error, setError] = useState(false);

  const getHistoryData = async () => {
    try {
      if (error) setError(false);

      const { data }: { data: IHistory[] } = await api.get(`/history/${id}`);
      setData(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (open) getHistoryData();
  }, [open]);

  return (
    <>
      <Alert message="Error Fetching History" open={error} setOpen={setError} />
      <Modal open={open} onClose={() => onClose()}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography mb={1} fontWeight={600} variant="h6" component="h2">
              Battle History
            </Typography>
            <IconButton onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: "100%", maxHeight: 400, overflow: "auto", px: 1 }}>
            {data?.length ? (
              data?.map((battle, idx) => {
                const color = id === battle.winner ? "#53e86c" : "#e85353";

                const [selected, opponent] =
                  battle.pokemonOne.id === id
                    ? [battle.pokemonOne, battle.pokemonTwo]
                    : [battle.pokemonTwo, battle.pokemonOne];

                return (
                  <Box
                    key={idx}
                    sx={{
                      p: 1,
                      boxShadow: 3,
                      width: "100%",
                      height: 66,
                      mb: 1,
                      borderRadius: 1,
                      borderLeft: `7px solid ${color}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Avatar alt="Remy Sharp" src={selected.imageUrl} />
                      <Typography fontSize={12}>{selected.name}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: "70px",
                      }}
                    >
                      <Typography fontWeight={600}>VS</Typography>
                      <Typography fontSize={12} fontWeight={500}>
                        {new Date(battle.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        alignItems: "end",
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "70px",
                      }}
                    >
                      <Avatar alt="Remy Sharp" src={opponent.imageUrl} />
                      <Typography fontSize={12}>{opponent.name}</Typography>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Typography>No battles founded</Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default History;
