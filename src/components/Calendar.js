import React, {useState} from "react";
import { Link, useLocation  } from 'react-router-dom';
import moment from 'moment';

import PlusBtn from "./PlusBtn";
import BackBtn from "./BackBtn";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button , IconButton, Box} from '@mui/material';

import DatePicker from '@mui/lab/DatePicker';
/*
 eventArr = [
    {id: 0, startDate: "2021-10-29", endDate:"2021-10-30", desc:"party", color: "#111111"},
    ...
 ]
*/

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';
// import StaticDatePicker from '@mui/lab/StaticDatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { styled } from '@mui/material/styles';

import { ColorPicker } from 'material-ui-color';

import './Calendar.css';

const ColorButton = styled(Button)({
    width: '126px',
    height: '41px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '18px',
    padding: '10px',
    lineHeight: 1.5,
    color: 'white',
    backgroundColor: '#3181C6',
    borderColor: '#0063cc',
    fontFamily: 'Roboto Condensed',
    marginTop: '60px',
    '&:hover': {
      backgroundColor: '#4892d2',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#4892d2',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });



function AddEvent({open, setOpen}){
    const [eventName, setEventName] = useState("");
    const [eventColor, setEventColor] = useState("#000");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
  
    const handleCancel = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        setOpen(false);
    }

    return(
        <Dialog open={open} onClose={() => {setOpen(false)}}>
        <DialogTitle>Add event</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                id="name"
                label="Event name"
                type="text"
                fullWidth
                variant="standard"
                sx={{marginBottom:"20px"}}
                onChange={e => setEventName(e.target.value)}
            />
            <Box  sx={{marginBottom:"20px", display:"flex"}}>
                <Box sx={{marginRight: "10px"}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        label="Start date"
                        value={eventStartDate}
                        onChange={(newValue) => {
                        setEventStartDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </Box>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="End date"
                        value={eventEndDate}
                        onChange={(newValue) => {
                        setEventEndDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </Box>
            </Box>
            <ColorPicker defaultValue="#000" value={eventColor} onChange={(value) => setEventColor(value.css.backgroundColor)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    )
}

function Day({isBlank, day, event, year, month, location}){

    return(
        isBlank?
            <td className="calendar-day empty">
                <Link to={`${location.pathname}`}>
                    <div>
                    </div>
                </Link>
            </td>
            :
            <td key={day} className={`calendar-day`}>
                <Link to={`${location.pathname}/${year}-${month}-${day}`}>
                    <Box sx={{width:"100%", height:"100%", '&:hover':{backgroundColor:"secondary.light"}}}>
                        <div>{day}</div>

                        {
                            event?
                                <div className={`calendar-day__event`}>
                                    {event}
                                </div>
                                :
                                null
                        }
                    </Box>
                </Link>
            </td>
    )
}

function Calendar({eventData}){
    const location = useLocation();

    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf("month").format("d"));
    const [daysInMonth, setDaysInMonth] = useState(moment().daysInMonth());

    const [seeingYear, setSeeingYear] = useState(moment().year());
    const [seeingMonth, setSeeingMonth] = useState(moment().month()+1);
    const [seeingMonthStr, setSeeingMonthStr] = useState(moment().format("MMMM"));

    const [showAddEvent, setShowAddEvent] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [datePickerVal, setDatePickerVal] = useState(new Date());

    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = "/home";
    }

    const handleCalendarBtn = (e) => {
        e.preventDefault();
        setShowDatePicker(!showDatePicker);
    }

    const eventArr = [];
    for(var i=1; i<=daysInMonth; i++){
        eventArr.push({id: i, event: null});
    }

    // event 부르는 api 호출

    // const handleChange = (e) => {
    //     console.log(e.target.value);
    //     let dateArr = e.target.value.split('-');
    //     let year = parseInt(dateArr[0]);
    //     let month = parseInt(dateArr[1]);

    //     setSeeingYear(year);
    //     setSeeingMonth(month);
    //     setFirstDayOfMonth(moment(e.target.value, "YYYY-MM").startOf("month").format("d"));
    //     setDaysInMonth(moment(e.target.value).daysInMonth());
    //     setSeeingMonthStr(moment().month(month-1).format("MMMM"));
    // }

    const weekdayshort = moment.weekdaysShort();
    const weekdayshortname = weekdayshort.map(day => {
        return(
            <th key={day} className="week-day">
                <div>{day}</div>
            </th>
        );
    })

    const currentDay = () => {
        return moment().format("D");
    };

     let blanks = [];
     for(let i=0; i<firstDayOfMonth; i++)
     {
        blanks.push(
            <Day
                isBlank={true}
                location={location}/>
        );
     }

     let days=[];
     for(let d=1; d<=daysInMonth; d++)
     {
        days.push(
            <Day
                isBlank={false}
                day={d}
                month={seeingMonth}
                year={seeingYear}
                location={location}/>
        );
     }

     var totalSlots = [...blanks, ...days];
     let rows = [];
     let cells = [];

     totalSlots.forEach((row, i) => {
        if(i%7 !== 0){
            cells.push(row);
        }else{
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
        if( i === totalSlots.length - 1){
            rows.push(cells);
        }
     });

     let daysinmonth = rows.map((d, i) => {
        return <tr>{d}</tr>;
     });

    return(
        // showAddEvent ?
        //     <AddEvent setShowAddEvent={setShowAddEvent}/>
        //     :
        <div className="entire-calendar">
            <AddEvent open={showAddEvent} setOpen={setShowAddEvent} />
            <div className="tail-datetime-calendar">
                
                <div className="calendar-navi">
                    <div className="calendar-navi__monthIndicator">
                        <div className="calendar-navi__month">{seeingMonthStr}</div>
                        <Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                sx={{color:"primary"}}
                                label="Custom input"
                                value={datePickerVal}
                                onChange={(newValue) => {
                                    var date = new Date(newValue);
                                    setSeeingYear(date.getFullYear());
                                    setSeeingMonth(date.getMonth()+1);
                                    setFirstDayOfMonth(moment(date, "YYYY-MM").startOf("month").format("d"));
                                    setDaysInMonth(moment(date).daysInMonth());
                                    setSeeingMonthStr(moment().month(date.getMonth()).format("MMMM"));
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box ref={inputRef}></Box>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                        </Box>
                    </div>
                    
                    <PlusBtn setShowContents={setShowAddEvent} desc={"+ Add Event"}/>
                </div>
            </div>
            <table className="calendar">
                <thead>
                    <tr>{weekdayshortname}</tr>
                </thead>
                <tbody>
                    {daysinmonth}
                </tbody>
            </table>
        </div>

    );
}

export default Calendar;