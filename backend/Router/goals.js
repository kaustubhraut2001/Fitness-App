const router = require("express").Router();
const User = require("../Controllers/User");
const Goals = require("../Controllers/Goals");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });



router.post("/addgoals", Goals.createGoal);

router.get("/getallgoals", Goals.getallgoals);

router.get("/getgoal/:id", Goals.getgoalbyid);

router.put("/updategoal/:id", Goals.updategoal);

router.delete("/deletegoal/:id", Goals.deletegoals);



module.exports = router;