const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = require('./auth.config');

exports.createUser = (req, res, next) => {
  const newUser = {
    username: req.body.username,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    birthDate: req.body.birthDate,
    password: bcrypt.hashSync(req.body.password)
  }

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000) return res.send({ message: 'Email already exists' });
    if (err) return res.send({ message: 'Server error!' });
    const expiresIn = 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataUser = {
      username: user.name,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    // response 
    res.send({ dataUser });
  });
}

exports.loginUser = (req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  }
  User.findOne({ username: userData.username }, (err, user) => {
    if (err) return res.send({ message: 'Server error!' });

    if (!user) {
      // username does not exist
      res.send({ message: 'Something is wrong', error: 'usuario no encontrado' });
    } else {
      const resultPassword = bcrypt.compareSync(userData.password, user.password);
      if (resultPassword) {
        const expiresIn = 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

        const dataUser = {
          username: user.name,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          birthDate: user.birthDate,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.send({ dataUser });
      } else {
        // password wrong
        res.send({ message: 'Something is wrong', error: 'contraseña errónea'});
      }
    }
  });
}

exports.datosUser = (req, res, next) => {
  let id = req.decoded.id
  
  User.findOne({ _id: id }, (err, user) => {
      if (err) return res.send({ message: 'Server error!' });

      if (!user) {
        // id does not exist
        res.send({ message: 'Something is wrong' });
      } 
      else {
        const expiresIn = 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
        
        res.json({user : { 
          username: user.name,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          birthDate: user.birthDate,
          createdAt: user.createdAt, 
          updatedAt: user.updatedAt, 
          accessToken}});
      }
  });
}

exports.logoutUser = (req, res, next) => {
	res.json({'logout': 'ok'});
}
