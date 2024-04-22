const router = require("express").Router();

const {
    userGet,
    getOneUser,
    userCreate,
    userUpdate,
    deleteUser,
} = require("../../controllers/user.Controllers");


router.route("/").get(userGet).post(userCreate);


router.route("/:userId").get(getOneUser).put(userUpdate).delete(deleteUser); 

module.exports = router;