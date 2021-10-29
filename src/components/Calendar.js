import React, {useState} from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Calendar.css';

function Calendar(){
//     const [date, setDate] = useState(moment());
    const [allmonths, setAllMonths] = useState(moment().months());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf("month").format("d"));
    const [daysInMonth, setDaysInMonth] = useState(moment().daysInMonth());

    const [seeingYear, setSeeingYear] = useState(moment().year());
    const [seeingMonth, setSeeingMonth] = useState(moment().month());
    const [seeingMonthStr, setSeeingMonthStr] = useState(moment().month(seeingMonth).format("MMMM"));

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
            <td className="calendar-day empty">
                <Link to="#">
                    <div>

                    </div>
                </Link>
            </td>
        );
     }

     let days=[];
     for(let d=1; d<=daysInMonth; d++)
     {
        let curDay = d === currentDay() ? "today" : "";
        days.push(
            <td key={d} className={`calendar-day ${curDay}`}>
                <Link to="#">
                    <div>
                        {d}
                    </div>
                </Link>
            </td>
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
        <div className="entire-calendar">
            <div className="tail-datetime-calendar">
                <div className="calendar-navi">
                    <div className="calendar-navi__month">{seeingMonthStr}</div>
                    <input
                        type="month"
                        onChange={handleChange}/>
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