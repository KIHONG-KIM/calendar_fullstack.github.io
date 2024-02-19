const Schedule = require("../models/schedule");

// 일정저장 (CREATE)
exports.postSchedule = async (req,res) =>{
    const {
        title,
        body,
        isAllDay,
        start,
        end,
        color,
        isVisible,
        bgColor,
        dragBgColor,
        borderColor,
        calendarId,
        category,
        dueDateClass,
        customStyle,
        isPending,
        isFocused,
        isReadOnly,
        isPrivate,
        location,
        recurrenceRule,
    } = req.body;
    const schedule = new Schedule({
        title,
        body,
        isAllDay,
        start: start._date,
        end: end._date,
        color,
        isVisible,
        bgColor,
        dragBgColor,
        borderColor,
        calendarId,
        category,
        dueDateClass,
        customStyle,
        isPending,
        isFocused,
        isReadOnly,
        isPrivate,
        location,
        recurrenceRule,
    });
    try{
        await schedule.save();
        res.json({msg:"saved",id:schedule._id});
    } catch (err){
        console.log("ERROR COULDN'T COMPLETE SCHEDULE SAVE",err);
        res.json({msg:"ERROR COULDN'T COMPLETE SCHEDULE SAVE",err});
    }

}

// 일정 수정 (EDIT)
exports.editSchedule = async (req,res) =>{
    const {changes} = req.body;
    console.log(changes);
    if(changes.hasOwnProperty('start')){
        changes.start = changes.start._date;
    }
    if(changes.hasOwnProperty('end')){
        changes.end = changes.end._date;
    }
    try{
        const schedule = await Schedule.findOne({_id:changes.id});
        let objForUpdate={
            ...schedule._doc,
            ...changes,
        };
        objForUpdate = { $set: objForUpdate};
        console.log(objForUpdate);
        const newSched = await Schedule.findOneAndUpdate({_id:changes.id},objForUpdate,{new:true});
        res.json({msg:"edited",id:schedule._id});
    } catch (err){
        console.log("ERROR COULDN'T COMPLETE SCHEDULE EDIT");
        res.json({msg:"ERROR COULDN'T COMPLETE SCHEDULE EDIT",err});
    }

}

// 일정 읽어오기 (READ)
exports.getSchedules = async (req,res)=>{
    try{
        const schedules = await Schedule.find({});
        res.json(schedules);
    } catch (err){
        console.log("ERROR COULDN'T COMPLETE SCHEDULE RETREIVAL");
        res.json({msg:"ERROR COULDN'T COMPLETE SCHEDULE RETREIVAL",err});
    }
}

// 일정 삭제 (DELETE)
exports.deleteSchedule = async (req,res) =>{
    const { id } = req.params;
    console.log(id, "id");
    try{
        await Schedule.findOneAndDelete({_id: id});
        res.json({msg:"deleted"});
    } catch (err){
        console.log("ERROR COULDN'T COMPLETE SCHEDULE DELETE");
        res.json({msg:"ERROR COULDN'T COMPLETE SCHEDULE DELETE",err});
    }

}