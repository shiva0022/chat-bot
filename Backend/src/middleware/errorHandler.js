// // Error handling middleware
// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);

//   // Handle Sequelize validation errors
//   if (err.name === 'SequelizeValidationError') {
//     return res.status(400).json({
//       message: 'Validation error',
//       errors: err.errors.map(e => ({
//         field: e.path,
//         message: e.message
//       }))
//     });
//   }

//   // Handle Sequelize unique constraint errors
//   if (err.name === 'SequelizeUniqueConstraintError') {
//     return res.status(400).json({
//       message: 'Duplicate entry',
//       errors: err.errors.map(e => ({
//         field: e.path,
//         message: e.message
//       }))
//     });
//   }

//   // Handle JWT errors
//   if (err.name === 'JsonWebTokenError') {
//     return res.status(401).json({
//       message: 'Invalid token'
//     });
//   }

//   if (err.name === 'TokenExpiredError') {
//     return res.status(401).json({
//       message: 'Token expired'
//     });
//   }

//   // Default error
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal server error'
//   });
// };

// export default errorHandler; 