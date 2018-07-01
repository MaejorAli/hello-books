import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';
import createChiefAdmin from '../middlewares/createAdmin';

const secret = process.env.SECRET;


const { Users } = models;

/* class that handles all user related endpoints
*/
class User {
  static signup(req, res) {
    const {
      firstname,
      lastname,
      email,
      membershiplevel,
    } = req.body;
    Users
      .findOne({
        where: {
          email: email.trim(),
        },
      })
      .then((user) => {
        if (user) {
          return res.status(400).send({ error: 'Another user with this email already exists' });
        }
      })
      .catch(error => res.status(500).send({ error: error.message }));

    if (email === 'alishaibu2002@gmail.com') {
      return createChiefAdmin(req, res);
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      const password = hash;
      return Users
        .create({
          firstname,
          lastname,
          email,
          membershiplevel,
          password,
        })
        .then((user) => {
          const payload = {
            userId: user.id,
            role: user.role,
            firstname,
            lastname,
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: '100h', // expires in 1 hours
          });
          return res.status(201).send({ message: 'You have successfully signed up', token });
        })
        .catch(error => res.status(500).send({ error: error.message }));
    });
  }


  static signin(req, res) {
    const {
      email,
      password,
    } = req.body;

    return Users
      .findOne({
        where: {
          email: email.trim(),
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({ error: 'Invalid password or email' });
        }
        return bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const payload = {
              userId: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role,
            };
            const token = jwt.sign(payload, secret, {
              expiresIn: '100h', // expires in 1 hours
            });
            return res.status(200).send({ message: 'You have been logged in successfully ', token });
          }
          return res.status(400).send({ error: 'Invalid password or email' });
        });
      })
      .catch(error => res.status(500).send({ error: error.message }));
  }
}

export default User;
