import React, {useRef, useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import ApiDataFetch from './ApiDataFetch'
import "react-datepicker/dist/react-datepicker.css";

 
const DatePickerSet = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    let selectdDateStart = useRef('');
    let selectdDateEnd = useRef('');
    const [data, setData] = useState([]);

    function startSelect(date) {
      date = moment(date).format("YYYY-MM-DD"); 
      selectdDateStart.current = date;
    }

    function endSelect(date) {
        date = moment(date).format("YYYY-MM-DD");
        selectdDateEnd.current = date;
    }
      
    return (
      <>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onSelect={startSelect}
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onSelect={endSelect}
        />
        <ApiDataFetch startDateSelect={selectdDateStart} EndDateSelect={selectdDateEnd} />
      </>
  
      
    );
  };
  export default DatePickerSet;