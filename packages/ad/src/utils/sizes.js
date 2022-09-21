const billboard = [970, 250];
const leaderboard = [728, 90];
const mpu = [300, 250];

const sizes = {
  native: [
    {
      orientation: ["landscape", "portrait"],
      height: 250,
      sizes: [mpu],
      width: 300,
    },
    {
      orientation: ["landscape", "portrait"],
      height: 90,
      sizes: [leaderboard],
      width: 728,
    },
    {
      orientation: ["landscape", "portrait"],
      height: 250,
      sizes: [billboard],
      width: 970,
    },
  ],
};

export default sizes;
