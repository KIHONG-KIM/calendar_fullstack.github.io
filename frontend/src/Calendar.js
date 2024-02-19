import React, { useCallback, useEffect, useRef, useState } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import "./styles.css";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Req from "./config/axios";
import axios from "axios";

const calendars= [
  {
    id: "1",
    name: "Completed",
    color: "#ffffff",
    bgColor: "#57db04",
    dragBgColor: "#57db04",
    borderColor: "#57db04"
  },
  {
    id: "2",
    name: "TO DO",
    color: "#ffffff",
    bgColor: "#fc2626",
    dragBgColor: "#fc2626",
    borderColor: "#fc2626"
  },
  {
    id: "3",
    name: "On Going",
    color: "#ffffff",
    bgColor: "#00a8ff",
    dragBgColor: "#00a8ff",
    borderColor: "#00a8ff"
  }
];

function Calendar({view, workweek}) {

  const cal = useRef(null);
  const [schedules,setSchedules] = useState([]);
  
  const handleNext = ()=>{
    cal.current.calendarInst.next()
  }

  const handlePrev = ()=>{
    cal.current.calendarInst.prev()
  }

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);
    console.log(e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback(async (scheduleData) => {
    console.log(scheduleData);
    const schedule = {
      calendarId:scheduleData.calendarId,
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
    };
    try{
      const obj = await Req.post("/schedule",schedule);
      console.log(obj);
      schedule.id = obj.id;
      cal.current.calendarInst.createSchedules([schedule]);
    } catch(err){
      console.log(err);
    }
    
  }, []);
  const onBeforeDeleteSchedule = useCallback(async (res) => {
    console.log(res);
    const { id, calendarId } = res.schedule;
    try{
      const obj = await Req.delete(`/schedule/${id}`);
      console.log(obj);
      cal.current.calendarInst.deleteSchedule(id, calendarId);
    } catch(err){
      console.log(err);
    }
  }, []);

  const onBeforeUpdateSchedule = useCallback(async (e) => {
    console.log(e);

    const { schedule, changes } = e;
    
    try{
      changes.id = schedule.id;
      console.log(changes);
      const obj = await Req.put("/schedule",{changes});
      console.log(obj);
      cal.current.calendarInst.updateSchedule(
        schedule.id,
        schedule.calendarId,
        changes
      );
    } catch(err){
      console.log(err);
    }
    
  }, []);
  function _getFormattedTime(time) {

    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();
    if(m<10){
      return `${h}:0${m}`;
    }
    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];
    if (!isAllDay) { 
      html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
    }

    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");

    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }
    return html.join("");
  }

  const templates = {
    time: function (schedule) {
      return _getTimeTemplate(schedule, false);
    }
  };

  const getSchedules = async()=>{
    const res = await Req.get("/schedule");
    console.log(res);
    res.data.forEach(sch=>{
      sch.id = sch._id;
      console.log('after', sch.id)
    })
    setSchedules(res.data);
  }

  useEffect(()=>{
    getSchedules();
  },[]);
  return (
    <div className="App">
      <div style={{marginBottom:"2rem"}}>
      <Button onClick={()=>handlePrev()} style={{marginLeft:"1rem"}}>Previous</Button>
      <Button onClick={()=>handleNext()} style={{marginLeft:"2rem"}}>Next</Button>
      </div>
      
      <TUICalendar
       ref={cal}
       height="200%"
       view={view}
       useCreationPopup={true}
       useDetailPopup={true}
       template={templates}
       calendars={calendars}
       schedules={schedules}
       taskView={false}
       week={{
         workweek:workweek
       }}
       onClickSchedule={onClickSchedule}
       onBeforeCreateSchedule={onBeforeCreateSchedule}
       onBeforeDeleteSchedule={onBeforeDeleteSchedule}
       onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
    </div>
  );
}

export default Calendar;
