const controller = {};
const { getToken, gameRequest } = require('../utils/twitch');


// get all top 3 games
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM gamestop', (err, rows) => {
      if (err) {
        return res.status(400).json({
          msg: 'La solicitud no se procesó correctamente',
          data: games.data
        });
      } else {
        return res.status(200).json({
          message:
            'La solicitud se procesó correctamente',
          data: rows
        });
      }
    });
  });
};


// create top 3 games
controller.save = async (req, res) => {
  const token = await getToken();
  const games = await gameRequest(token);
  req.getConnection((err, connection) => {
    games.data.forEach(game => {
      const qu = connection.query('INSERT INTO gamestop set ?', [game], (err, rows) => {
        if (err) {
          return res.status(400).json({
            msg: 'La solicitud no se procesó correctamente',
            data: games.data
          });
        }
      });
    })
    return res.status(200).json({
      msg: 'La solicitud se procesó correctamente',
      data: games.data
    });
  })
};


//consult by id top 3 games
controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM gamestop WHERE dbId = ?", [id], (err, rows) => {
      if (err) {
        return res.status(400).json({
          msg: 'La solicitud no se procesó correctamente',
          data: games.data
        });
      } else {
        return res.status(200).json({
          message:
            'La solicitud se procesó correctamente',
          data: rows
        });
      }
    });
  });
};


// udpate by id top 3 games
controller.update = (req, res) => {
  const { id } = req.params;
  const newGame = req.body;
  req.getConnection((err, conn) => {
    conn.query('UPDATE gamestop set ? where dbId = ?', [newGame, id], (err, rows) => {
      if (err) {
        return res.status(400).json({
          msg: 'La solicitud no se procesó correctamente',
          data: games.data
        });
      } else {
        return res.status(200).json({
          message:
            'La solicitud se procesó correctamente',
          data: rows
        });
      }
    });
  });
};


// delete by id top 3 games
controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM gamestop WHERE dbId = ?', [id], (err, rows) => {
      if (err) {
        return res.status(400).json({
          msg: 'La solicitud no se procesó correctamente',
          data: games.data
        });
      } else {
        return res.status(200).json({
          message:
            'La solicitud se procesó correctamente',
          data: rows
        });
      }
    });
  });
}


module.exports = controller;
