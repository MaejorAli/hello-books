import userController from '../controllers/users';


export default (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to the hello-books Api' });
  });
  app.post('/api/v1/users/signup', userController.signup);
};
