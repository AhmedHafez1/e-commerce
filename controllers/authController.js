const login = async (req, res) => {
  res.send('Login');
};

const register = async (req, res) => {
  res.send('Register');
};

const logout = async (req, res) => {
  res.send('Logout');
};

module.exports = { login, logout, register };
