const { Schema, model } = require("mongoose");

const schedule = new Schema({
    bgColor:{
        type:String,
        
    },
    dragBgColor:{
        type:String,
        
    },
    color:{
        type:String,
        
    },
    category:{
        type:String,
        
    },
    calendarId:{
        type:String,
        
    },
    borderColor:{
        type:String,
        
    },
    body:{
        type:String,
    },
    start:{
        type:String,
        
    },
    end:{
        type:String,
        
    },
    location:{
        type:String,
    },
    title:{
        type:String,
        
    },
    recurrenceRule:{
        type:String,
    },
    id:{
        type:String,
    },
    isAllDay:{
        type:Boolean,
        
    },
    isFocused:{
        type:Boolean,
    },
    isPending:{
        type:Boolean,
    },
    isPrivate:{
        type:Boolean,
        
    },
    isReadOnly:{
        type:Boolean,
        
    },

});

module.exports = model('Schedule', schedule);