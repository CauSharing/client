import React, {useState} from "react";
import { Link, useLocation  } from 'react-router-dom';
import moment from 'moment';
import './Calendar.css';
import PlusBtn from "./PlusBtn";
import BackBtn from "./BackBtn";

/*
 eventArr = [
    {id: 0, startDate: "2021-10-29", endDate:"2021-10-30", desc:"party", color: "#111111"},
    ...
 ]
*/

function AddEvent({setShowAddEvent}){
    const [eventName, setEventName] = useState("");
    const [eventColor, setEventColor] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");

    const handleNameChange = (e) => {
        e.preventDefault();
        setEventName(e.target.value);
    }
    const handleColorChange = (e) => {
        e.preventDefault();
        setEventColor(e.target.value);
    }
    const handleStartDateChange = (e) => {
        e.preventDefault();
        setEventStartDate(e.target.value);
    }
    const handleEndDateChange = (e) => {
        e.preventDefault();
        setEventEndDate(e.target.value);
    }

    const handleClick = (e) => {
//         e.preventDefault();
        console.log(eventName, eventColor, eventStartDate, eventEndDate);
    }

    return(
        <div className="addEvent">
            <BackBtn setShowContents={setShowAddEvent}/>
            <form className="addEventForm">
                <label htmlFor="eventName">Event name</label><input id="eventName" onChange={handleNameChange}/>
                <label htmlFor="eventColor">Color</label><input type="color" id="eventColor" onChange={handleColorChange}/>
                <label htmlFor="eventStartDate">Start date</label><input type="date" id="eventStartDate" onChange={handleStartDateChange}/>
                <label htmlFor="eventEndDate">End date</label><input type="date" id="eventEndDate" onChange={handleEndDateChange}/>
                <button onClick={handleClick} className="addEventForm__btn">Submit</button>
            </form>
        </div>
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
                    <div>{day}</div>

                    {
                        event?
                            <div className={`calendar-day__event`}>
                                {event}
                            </div>
                            :
                            null
                    }

                </Link>
            </td>
    )
}

function Calendar({eventData}){
    const location = useLocation();

    const [allmonths, setAllMonths] = useState(moment().months());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf("month").format("d"));
    const [daysInMonth, setDaysInMonth] = useState(moment().daysInMonth());

    const [seeingYear, setSeeingYear] = useState(moment().year());
    const [seeingMonth, setSeeingMonth] = useState(moment().month()+1);
    const [seeingMonthStr, setSeeingMonthStr] = useState(moment().format("MMMM"));

    const [showAddEvent, setShowAddEvent] = useState(false);

    const eventArr = [];
    for(var i=1; i<=daysInMonth; i++){
        eventArr.push({id: i, event: null});
    }

    // event 부르는 api 호출

    const handleChange = (e) => {
        console.log(e.target.value);
        let dateArr = e.target.value.split('-');
        let year = parseInt(dateArr[0]);
        let month = parseInt(dateArr[1]);

        setSeeingYear(year);
        setSeeingMonth(month);
        setFirstDayOfMonth(moment(e.target.value, "YYYY-MM").startOf("month").format("d"));
        setDaysInMonth(moment(e.target.value).daysInMonth());
        setSeeingMonthStr(moment().month(month-1).format("MMMM"));
    }

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
        showAddEvent ?
            <AddEvent setShowAddEvent={setShowAddEvent}/>
            :
<div className="entire-calendar">
                                <div className="tail-datetime-calendar">
                                    <div className="calendar-navi">
                                        <div className="calendar-navi__monthIndicator">
                                            <div className="calendar-navi__month">{seeingMonthStr}</div>
                                            <input
                                                type="month"
                                                onChange={handleChange}/>
                                        </div>
                                        <PlusBtn setShowContents={setShowAddEvent}/>
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