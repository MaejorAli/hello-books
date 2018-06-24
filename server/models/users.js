export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    membershiplevel: {
      type: DataTypes.ENUM,
      values: ['Silver', 'Gold', 'Platinum'],
    },
    role: {
      type: DataTypes.ENUM,
      defaultValue: 'User',
      values: ['ChiefAdmin', 'Admin', 'User'],
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: () => {
        // associations can be defined here
      },
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.Books, { as: 'books', foreignKey: 'user' });
  };
  return Users;
};
