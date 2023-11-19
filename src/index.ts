import { createServer } from 'http';
import { app } from './app.js';

const PORT = process.env.PORT || 2700;

const server = createServer(app);

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port', PORT);
});

// {
//   "id": 9,
//   "name": "M4A1-S | Hot Rod",
//   "rarity": "Classified",
//   "description": "With a smaller magazine than its unmuffled counterpart, the silenced M4A1 provides quieter shots with less recoil and better accuracy.",
//   "image": "https://raw.githubusercontent.com/ByMykel/CSGO-API/4fdf048a2b6c21494df4fe915f5fdea5accc6a61/public/images/econ/default_generated/weapon_m4a1_silencer_an_red_m4a1s_light.png",
//   "collections_name": "The Chop Shop Collection",
//   "collections_image": "https://raw.githubusercontent.com/steamdatabase/gametracking-csgo/108f1682bf7eeb1420caaf2357da88b614a7e1b0/csgo/pak01_dir/resource/flash/econ/set_icons/set_chopshop.png"
// }
