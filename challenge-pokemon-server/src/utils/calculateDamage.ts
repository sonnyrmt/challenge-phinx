const calculateDamage = (attack: number, defense: number) => {
  return Math.max(1, attack - defense);
};

export default calculateDamage;
