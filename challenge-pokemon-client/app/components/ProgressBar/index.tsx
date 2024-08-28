import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#30e855",
  },
}));

const ProgressBar = ({
  currentValue,
  maxValue,
  label,
}: {
  currentValue: number;
  maxValue: number;
  label: string;
}) => {
  const value = (currentValue / maxValue) * 100;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        fontWeight={600}
        fontSize={14}
        sx={{ textTransform: "capitalize" }}
      >
        {label}
      </Typography>
      <BorderLinearProgress variant="determinate" value={value} />
    </Box>
  );
};

export default ProgressBar;
