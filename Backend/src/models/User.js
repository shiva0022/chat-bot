// import { DataTypes, Model } from 'sequelize';
// import bcrypt from 'bcryptjs';
// import sequelize from '../config/database.js';

// class User extends Model {
//   async comparePassword(candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
//   }
// }

// User.init({
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true
//     }
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     validate: {
//       notEmpty: function() {
//         return !this.googleId; // Password is required only if not using Google auth
//       }
//     }
//   },
//   googleId: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: true
//   },
//   profilePicture: {
//     type: DataTypes.STRING,
//     allowNull: true
//   }
// }, {
//   sequelize,
//   modelName: 'User',
//   timestamps: true,
//   hooks: {
//     beforeSave: async (user) => {
//       if (user.changed('password')) {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//       }
//     }
//   }
// });

// export default User; 