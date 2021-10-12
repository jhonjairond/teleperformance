const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameTopSchema = Schema([
      {
            id: String,
            name: String,
            box_art_url: String,
      },
]);

module.exports = mongoose.model('games', GameTopSchema);
