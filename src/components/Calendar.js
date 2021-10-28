import React, {useState} from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Calendar.css';

function Calendar(){
    const [date, setDate] = useState(moment());
    const [allmonths, setAllMonths] = useState(moment.months());

    const weekdayshort = moment.weekdaysShort();
    const weekdayshortname = weekdayshort.map(day => {
        return(
            <th key={day} className="week-day">
            {day}
            </th>
        );
    })

    const firstDayOfMonth = () => {
        let firstDay = moment(date)
                        .startOf("month")
                        .format("d");
        console.log(firstDay);
        return firstDay;
    }

    const currentDay = () => {
        return date.format("D");
    };

    const month = () => {
        return date.format("MMMM");
    }

     let blanks = [];
     for(let i=0; i<firstDayOfMonth(); i++)
     {
        blanks.push(
            <td className="calendar-day empty">
                <Link to="#">
                    <div>
                        {""}
                    </div>
                </Link>
            </td>
        );
     }

     let daysInMonth=[];
     for(let d=1; d<=moment(date).daysInMonth(); d++)
     {
        let curDay = d === currentDay() ? "today" : "";
        daysInMonth.push(
            <td key={d} className={`calendar-day ${curDay}`}>
                <Link to="#">
                    <div>
                        {d}
                    </div>
                </Link>
            </td>
        );
     }

     var totalSlots = [...blanks, ...daysInMonth];
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
        <div>
            <div className="tail-datetime-calendar">
                <div className="calendar-navi">
                {month()}
                </div>
            </div>
            <table className="calendar-day">
                <thead>
                    <tr>{weekdayshortname}</tr>
                </thead>
                <tbody>{daysinmonth}</tbody>
            </table>
        </div>
    );
}

export default Calendar;