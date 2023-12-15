import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css"
import {Calendar, dateFnsLocalizer, momentLocalizer} from "react-big-calendar";
import {Button, Form, Flex, Input, DatePicker} from "antd";
import moment from 'moment';
import CustomToolbar from "./components/CustomToolbar";
import AddEventPopup from "./components/AddEventPopup";
import CustomEvent from "./components/CustomEvent";
import {lighten, modularScale, rgba} from 'polished'
import {LeftOutlined} from "@ant-design/icons";
import Icon from "antd/es/icon";
import TestPopup from "./components/TestPopup";




const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Termin 3",
    start: moment('2023-12-08T10:00:00').toDate(),
    end: moment('2023-12-08T11:00:00').toDate(),
      color: '#F5222D',
  },

  {
    title: "Termin 1",
    start: new Date(2023,11,6),
    end: new Date(2023,11,8),
      color: '#FA8C16',
  },

  {
    title: "Termin 2",
    start: moment('2023-12-13T10:00:00').toDate(),
    end: moment('2023-12-14T14:00:00').toDate(),
      color: '#8BBB11',
  }
]

function App() {
  //const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
  const [allEvents, setAllEvents] = useState(events)
  const [isAddEventPopupOpen, setIsAddEventPopupOpen] = useState(false)

  const onCancelAddEvent = () =>
  {
    setIsAddEventPopupOpen(false);
  }

  function handleAddEvent(newEvent) {
    setAllEvents([...allEvents, newEvent])
  }

    const eventStyleGetter = (event, start, end, isSelected) =>{
        console.log(event);
        var backgroundColor = lighten(0.42, event.color);
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '4px',
            backgroundOpacity: 'rgba(0,0,0,0.5)',
            color: event.color,
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

  const transformMonth  = (m) =>
  {
    return (parseInt(m)-1).toString().padStart(2, '0')
  }

  const onFinish = (fieldsValue) =>
  {
      let color= '#1677FF';
      console.log('Color from From: ',fieldsValue['colorPicker'])
      if(fieldsValue['colorPicker'] !== undefined)
      {
          color = fieldsValue['colorPicker'].toHexString();//fieldsValue['colorPicker'];
      }

    const startYear = fieldsValue["rangepicker"][0].format('YYYY');
    const startMonth = transformMonth(fieldsValue["rangepicker"][0].format('MM'));

    const startDay = fieldsValue["rangepicker"][0].format('DD');
    const startHour = fieldsValue["rangepicker"][0].format('HH');
    const startMinute = fieldsValue["rangepicker"][0].format('mm');
    const endYear = fieldsValue["rangepicker"][1].format('YYYY');
    const endMonth = transformMonth(fieldsValue["rangepicker"][1].format('MM'));
    const endDay = fieldsValue["rangepicker"][1].format('DD');
    const endHour = fieldsValue["rangepicker"][1].format('HH');
    const endMinute = fieldsValue["rangepicker"][1].format('mm');
    const newEvent = {
     title: fieldsValue["eventTitle"],
     start: new Date(startYear, startMonth, startDay, startHour, startMinute),
     end: new Date(endYear, endMonth, endDay, endHour, endMinute),
        color: color
   }
      handleAddEvent(newEvent)
      console.log(newEvent.start)
      setIsAddEventPopupOpen(false);
  }

  const components = {
      toolbar: props => (<CustomToolbar {...props} setIsAddEventPopupOpen={setIsAddEventPopupOpen} />),
      event: props => (<CustomEvent {...props} color={'#0047ab'}/>)
  }

    return (
        <div>

          {isAddEventPopupOpen && <AddEventPopup onCancel={onCancelAddEvent} onFinish={onFinish}/>}
            <div style={{height: "100vh"}}>
                <Calendar components={{toolbar: props => (<CustomToolbar {...props} setIsAddEventPopupOpen={setIsAddEventPopupOpen} />)}}

                          views={['month', 'week', 'day']}
                          localizer={localizer}
                          events={allEvents}
                          startAccessor="start"
                          endAccessor="end"
                          toolbar={true}
                          eventPropGetter={(eventStyleGetter)}
                />

            </div>
        </div>
    );
  /*

  components={{toolbar: props => (<CustomToolbar {...props} setIsAddEventPopupOpen={setIsAddEventPopupOpen} />),
                                        event: ({event}) => {return <CustomEvent event={event} color={'#21132'}/>}}}

  //<AddEventPopup onCancel={onCancelAddEvent} onFinish={onFinish}/>}
   */
}

export default App;
