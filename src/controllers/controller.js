
const GameTop = require('../models/gameTop');
const { getToken, gameRequest } = require('../utils/twitch');


// create top games at db
const gamesPost = async (req, res) => {
  try {
    const token = await getToken();
    const gamesTop = await gameRequest(token);
    //console.log(gamesTop.data);
    const gamesTopCreated = await GameTop.create(gamesTop.data);
    return res.status(200).json({
      message:
        'La solicitud se procesó correctamente',
      data: gamesTopCreated
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'La solicitud no se procesó correctamente',
    });
  }
}


// get all top games of db
const gamesGet = async (req, res) => {
  try {
    const games = await GameTop.find();
    return res.status(200).json({
      message:
        'La solicitud se procesó correctamente',
      data: games
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'La solicitud no se procesó correctamente',
    });
  }
}


//get game by id
const gamesGetById = async (req, res) => {
  try {
    const game = await GameTop.findById(req.params.id);
    return res.status(200).json({
      message:
        'La solicitud se procesó correctamente',
      data: game
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'La solicitud no se procesó correctamente',
    });
  }

}


//edit game by id
const gamesPut = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await GameTop.updateOne({ _id: id }, req.body, { new: true });
    return res.status(200).json({
      message:
        'La solicitud se procesó correctamente',
      data: game
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'La solicitud no se procesó correctamente',
    });
  }
}


// delete game by id
const gamesDelete = async (req, res) => {
  try {
    let { id } = req.params;
    const game = await GameTop.deleteOne({ _id: id });
    return res.status(200).json({
      message:
        'La solicitud se procesó correctamente',
      data: game
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'La solicitud no se procesó correctamente',
    });
  }
}


module.exports = {
  gamesPost,
  gamesGet,
  gamesGetById,
  gamesPut,
  gamesDelete
}