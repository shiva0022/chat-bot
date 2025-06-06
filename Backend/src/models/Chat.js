// import { DataTypes, Model } from 'sequelize';
// import sequelize from '../config/database.js';
// import User from './User.js';

// class Message extends Model {}
// Message.init({
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   sender: {
//     type: DataTypes.ENUM('user', 'ai'),
//     allowNull: false
//   },
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: 'Message',
//   timestamps: true
// });

// class Chat extends Model {}
// Chat.init({
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: 'Chat',
//   timestamps: true
// });

// // Define relationships
// Chat.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(Chat, { foreignKey: 'userId' });

// Chat.hasMany(Message, { foreignKey: 'chatId' });
// Message.belongsTo(Chat, { foreignKey: 'chatId' });

// export { Chat, Message }; 