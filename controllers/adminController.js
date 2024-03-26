

const getAdminDashboard = async (req, res) => { res.render('admin'); }
const getAllUsers = async (req, res) => { res.render('allusers'); }
const getHosts = async (req, res) => { res.render('hostusers'); }
const getRenter = async (req, res) => { res.render('renterusers'); }

module.exports = { getAdminDashboard, getAllUsers, getHosts, getRenter }
