import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models';

const { Users } = models;

const secret = process.env.SECRET;


function createChiefAdmin(req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    Users.findOne({
      where: {
        email: 'alishaibu2002@gmail.com',
      },
    })
      .create({
        email: 'alishaibu2002@gmail.com',
        firstname: 'Ali',
        lastname: 'Shaibu',
        password: hash,
        role: 'ChiefAdmin',
      })
      .then((chiefAdmin) => {
        const payload = {
          userId: chiefAdmin.id,
          firstname: chiefAdmin.firstname,
          lastname: chiefAdmin.lastname,
          role: chiefAdmin.role,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: '10h',
        });
        return res.status(201).send({ message: 'ChiefAdmin created', token });
      })
      .catch(error => res.status(500).send({ error: error.message }));
  });
}


export default createChiefAdmin;
