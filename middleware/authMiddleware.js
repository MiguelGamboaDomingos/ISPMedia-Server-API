const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = (req, res, next) => {
    console.log('Middleware auth chamado.');
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      console.log('Token não encontrado.');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decodificado:', decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  

const adminAuth = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { auth, adminAuth };
