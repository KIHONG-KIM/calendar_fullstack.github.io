const router = require("express").Router(); 
const {postSchedule,getSchedule,deleteSchedule,editSchedule} = require("./controllers/schedule");
router.get("/schedule",getSchedule);
router.post("/schedule",postSchedule);
router.put("/schedule",editSchedule);
router.delete("/schedule/:id",deleteSchedule);

module.exports = router;

