import React, {useEffect, useState} from "react";
import { Link, useLocation ,useParams } from 'react-router-dom';
import moment from 'moment';

import PlusBtn from "./PlusBtn";
import BackBtn from "./BackBtn";

import {Dialog, DialogActions, DialogContent, DialogContentText, 
    DialogTitle, TextField, Button , Typography, Box, Badge } from '@mui/material';
    import FeedIcon from '@mui/icons-material/Feed';

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

import axios from "axios";

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



function AddEvent({open, setOpen, groupIdx, seeingMonth, seeingYear , daysInMonth, setTags}){
    const [eventName, setEventName] = useState("");
    const [eventColor, setEventColor] = useState("#000");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
  
    const handleCancel = () => {
        setOpen(false);
    }

    const handleSubmit = async () => {
        const instance = axios.create({
            timeout: 30000,
          });
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };

        const data = {
            endDate: `${eventEndDate.getFullYear()}-${eventEndDate.getMonth()+1 < 10? '0'+`${eventEndDate.getMonth()+1}` : eventEndDate.getMonth()+1}-${eventEndDate.getDate() < 10 ? '0'+`${eventEndDate.getDate()}`: eventEndDate.getDate()}`,
            matchingRoomId: groupIdx,
            rgb: eventColor,
            startDate: `${eventStartDate.getFullYear()}-${eventStartDate.getMonth()+1 < 10? '0'+`${eventStartDate.getMonth()+1}` : eventStartDate.getMonth()+1}-${eventStartDate.getDate() < 10 ? '0'+`${eventStartDate.getDate()}`: eventStartDate.getDate()}`,
            tagName: eventName
        };

        console.log(data);
        
        await instance.post(`/api/tag`,data, config)
        .then(res => {
            console.log(res);
        })
        .catch(err =>{
            console.log(err);
        });             

        await instance.get(`/api/tag?MatchingRoomId=${groupIdx}&Month=${seeingYear}-${seeingMonth}`,config)
        .then(res => {
            console.log(res.data.value);
            var arr = Array.from({length: 31}, () => []);
            res.data.value.tagResponseList.forEach(elem => {
                var startDate = elem.startDate.split("-");
                var endDate = elem.endDate.split("-");

                var newStartDay = null;
                
                if(seeingYear === parseInt(startDate[0]) && seeingMonth === parseInt(startDate[1])){
                    newStartDay = parseInt(startDate[2]);
                }else{
                    newStartDay = 1;
                }

                var newEndDay = null;
                if(seeingMonth === parseInt(endDate[1])){
                    newEndDay = parseInt(endDate[2]);
                }else{
                    newEndDay = daysInMonth;
                }

                for(var i=newStartDay; i<=newEndDay; i++){
                    arr[i].push({name: elem.tagName, writer: elem.writer, rgb: elem.rgb, isStart: i === newStartDay, isEnd: i===newEndDay});
                }
            });
            setTags(arr);
            // console.log(arr);
        })
        .catch(err =>{
            console.log(err);
            // setTags(err);
        });     
        await setOpen(false);
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

function Day({isBlank, day, event, year, month, location, groupName, groupImg, groupUserList, tags}){
    

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
                <Link 
                    to={{
                        pathname: `${location.pathname}/${year}-${month}-${day}`,
                        state: {
                            groupName:groupName, 
                            groupImg: groupImg, 
                            groupUserList: groupUserList, 
                        }
                    }}>
                    <Box sx={{width:"100%", height:"100%", '&:hover':{backgroundColor:"secondary.light"}}}>
                        <Typography variant="body1">{day}</Typography>
                        {
                            // <Badge badgeContent={postNum} color="primary">
                            //     <FeedIcon color="action" />
                            // </Badge>
                        }

                        {
                            tags?
                            tags.length > 0?
                                tags.map(tag => {
                                    if(tag.isStart){
                                        return(<Box sx={{ backgroundColor: tag.rgb, margin: "5px 0px", borderRadius:"10px 0px 0px 10px",paddingLeft:"1px", display:"flex", width:"100%"}}>{tag.name}</Box>);
                                    }else if(tag.isEnd){
                                        return(<Box sx={{ backgroundColor: tag.rgb, margin: "5px 0px", borderRadius:"0px 10px 10px 0px"}}>{tag.name}</Box>);
                                    }else{
                                        return(<Box sx={{ backgroundColor: tag.rgb, margin: "5px 0px"}}>{tag.name}</Box>);
                                    }
                                })
                                    
                                :
                                null
                            :
                            null
                        }
                    </Box>
                </Link>
            </td>
    )
}

function Calendar({ groupName, groupImg, groupUserList}){
    // console.log( groupName, groupImg, groupUserList);
    const {groupIdx} = useParams();
    const location = useLocation();

    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf("month").format("d"));
    const [daysInMonth, setDaysInMonth] = useState(moment().daysInMonth());

    const [seeingYear, setSeeingYear] = useState(moment().year());
    const [seeingMonth, setSeeingMonth] = useState(moment().month()+1);
    const [seeingMonthStr, setSeeingMonthStr] = useState(moment().format("MMMM"));

    const [showAddEvent, setShowAddEvent] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [datePickerVal, setDatePickerVal] = useState(new Date());
    const [tags, setTags] = useState([]);

    const [postInfo, setPostInfo] = useState([]);

    useEffect(async () => {
        const instance = axios.create({
            timeout: 30000,
          });
        const token = localStorage.getItem("userToken");
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        };
        
        console.log(groupIdx);
        await instance.get(`/api/tag?MatchingRoomId=${groupIdx}&Month=${seeingYear}-${seeingMonth}`,config)
        .then(res => {
            console.log(res.data.value);
            var arr = Array.from({length: 31}, () => []);
            res.data.value.tagResponseList.forEach(elem => {
                var startDate = elem.startDate.split("-");
                var endDate = elem.endDate.split("-");

                var newStartDay = null;
                
                if(seeingYear === parseInt(startDate[0]) && seeingMonth === parseInt(startDate[1])){
                    newStartDay = parseInt(startDate[2]);
                }else{
                    newStartDay = 1;
                }

                var newEndDay = null;
                if(seeingMonth === parseInt(endDate[1])){
                    newEndDay = parseInt(endDate[2]);
                }else{
                    newEndDay = daysInMonth;
                }

                for(var i=newStartDay; i<=newEndDay; i++){
                    arr[i].push({name: elem.tagName, writer: elem.writer, rgb: elem.rgb, isStart: i === newStartDay, isEnd: i===newEndDay});
                }
            });
            setTags(arr);
            // console.log(arr);
        })
        .catch(err =>{
            console.log(err);
            // setTags(err);
        });     

        // console.log(`/api/postDate?MatchingRoomId=${groupIdx}&postDate=${`${year}-${month<10? `0${month}`:month}-${day<10? `0${day}`: day}`}`);
        // await instance.get(`/api/postDate?MatchingRoomId=${groupIdx}&postDate=${`${year}-${month<10? `0${month}`:month}-01`}`,config)
        // .then(res => {
        //     setPostNum(res.data.value.length);
        //     // console.log(res);
        // })
        // .catch(err => {
        //     console.log(err);
        // });

        sessionStorage.setItem('seeingYear', JSON.stringify(seeingYear));
        sessionStorage.setItem('seeingMonth', JSON.stringify(seeingMonth));

    }, [seeingYear, seeingMonth]);

    useEffect(() => {
        if(sessionStorage.getItem('seeingYear') && sessionStorage.getItem('seeingMonth'))
        { 
            var year = JSON.parse(sessionStorage.getItem('seeingYear'));
            var month = JSON.parse(sessionStorage.getItem('seeingMonth'));
            setSeeingYear(year);
            setSeeingMonth(month);
            setSeeingMonthStr(moment(`${year}-${month<10? `0${month}`: month}`, "YYYY-MM").format("MMMM"));
            setFirstDayOfMonth(moment(`${year}-${month<10? `0${month}`: month}`, "YYYY-MM").startOf("month").format("d"));
            setDaysInMonth(moment(`${year}-${month<10? `0${month}`: month}`, "YYYY-MM").daysInMonth());
        }    
    },[]);
    
    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = "/home";
    }

    const handleCalendarBtn = (e) => {
        e.preventDefault();
        setShowDatePicker(!showDatePicker);
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
                location={location}
                groupName={groupName}
                groupImg={groupImg}
                groupUserList={groupUserList}
                />
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
                location={location}
                groupName={groupName}
                groupImg={groupImg}
                groupUserList={groupUserList}
                groupIdx={groupIdx}
                tags={tags[d-1]}
                />
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
            <AddEvent open={showAddEvent} setOpen={setShowAddEvent} groupIdx={groupIdx} setTags={setTags}
                seeingMonth={seeingMonth} seeingYear={seeingYear} daysInMonth={daysInMonth}/>
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
                                onChange={async (newValue) => {
                                    var date = new Date(newValue);
                                    await setSeeingYear(date.getFullYear());
                                    await setSeeingMonth(date.getMonth()+1);
                                    await setFirstDayOfMonth(moment(date, "YYYY-MM").startOf("month").format("d"));
                                    await setDaysInMonth(moment(date).daysInMonth());
                                    await setSeeingMonthStr(moment().month(date.getMonth()).format("MMMM"));
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