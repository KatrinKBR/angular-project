const Users = require('./auth.controller');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('./auth.config');

const rutasProtegidas = (req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {      
      if (err) {
        console.log('Token no válida')
        //res.redirect('/')
        res.send({mensaje: 'Token no válida'})

      } else {
        req.decoded = decoded;    
        console.log(decoded)
        console.log('Token OK.')
        next();
      }
    });
  } else {
    console.log('Token no provista')
    //res.redirect('/')
    res.send({mensaje: 'Token no provista'})
  }
}

module.exports = router => {
  router.post('/register', Users.createUser);
  router.post('/login', Users.loginUser);
  router.get('/datos', rutasProtegidas, Users.datosUser);
  router.get('/logout', Users.logoutUser);
  router.get('*', (req,res) => res.redirect('/'));
}