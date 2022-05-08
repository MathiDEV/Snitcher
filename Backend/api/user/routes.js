const router = require('express').Router();
const auth = require("../../middleware/auth");
const user = require("./user");
const login = require("../login/login");
const bestUsers = require("./bestUsers");

router.post('/', (req, res) => {
    login.check_user(req, res);
});

router.post('/changeUsername',auth, (req, res) => {
    user.changeUsername(req, res);
});

router.get('/automations', auth, (req, res) => {
    user.automations(req, res);
});

router.get('/automations/:id',auth, (req, res) => {
    user.automations_by_id (req, res);
});

router.get('/bestusers', auth, (req, res) => {
    bestUsers.bestUsers(req, res);
});

router.post('/saveLater', auth, (req, res) => {
    user.saveLater(req, res);
});

router.get('/getAllSave', auth, (req, res) => {
    user.getAllSave(req, res);
});

router.get('/saveLatter/:id', auth, (req, res) => {
    user.saveLatter_by_id(req, res);
});

module.exports = router;