export const MAX_VALUES = {
  attack: 5,
  defense: 5,
  speed: 7,
};

export const TYPE_ICON: Record<string, { url: string; color: string }> = {
  water: { url: "/20px-Water_icon.png", color: "#2980EF" },
  electric: { url: "/20px-Electric_icon.png", color: "#FAC000" },
  fire: { url: "/20px-Fire_icon.png", color: "#E62829" },
  grass: { url: "/20px-Grass_icon.png", color: "#3FA129" },
  normal: { url: "/20px-Normal_icon.png", color: "#5A5A5A" },
};

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 2,
};
