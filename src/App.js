import './App.css';
import React, {useState} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css"
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment';
import CustomToolbar from "./components/CustomToolbar";
import AddEventPopup from "./components/AddEventPopup";
import CustomEvent from "./components/CustomEvent";
import {lighten, modularScale, rgba} from 'polished'
import {getFn, useCreateEntries, useEntries} from "./requests/requestFunc";
import axios from "axios";
import {createEvent} from "./components/AddEventPopup";


const localizer = momentLocalizer(moment);


function App() {
    const fetchedData = useEntries();

    const entries = fetchedData.data?.map(entry => ({
         title: entry.title,
         start: new Date(entry.startDate),
         end: new Date(entry.endDate),
         color: entry.color,
         allDay: entry.allDay
     }))

    //const [allEvents, setAllEvents] = useState(entries)
    const [isAddEventPopupOpen, setIsAddEventPopupOpen] = useState(false)

    const onCancelAddEvent = () => {
        setIsAddEventPopupOpen(false);
    }

    /*
    function handleAddEvent(newEvent) {
        setAllEvents([...allEvents, newEvent])
    }*/

    const eventStyleGetter = (event, start, end, isSelected) => {
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


    const {mutateAsync: createEntry} = useCreateEntries()

    const onFinish = async (fieldsValue) => {

        const newEvent = createEvent(fieldsValue)
        if(fieldsValue['isNew']) {
            console.log(newEvent)
            createEntry(newEvent)
        }

        //handleAddEvent(newEvent)
        setIsAddEventPopupOpen(false);
    }

    const components = {
        toolbar: props => (<CustomToolbar {...props} setIsAddEventPopupOpen={setIsAddEventPopupOpen}/>),
        event: props => (<CustomEvent {...props} color={'#0047ab'}/>)
    }

    return (
        <div>

            {isAddEventPopupOpen && <AddEventPopup onCancel={onCancelAddEvent} onFinish={onFinish} isNew={true}/>}
            <div style={{height: "100vh"}}>
                <Calendar components={{
                    toolbar: props => (<CustomToolbar {...props} setIsAddEventPopupOpen={setIsAddEventPopupOpen}/>)
                }}

                          views={['month', 'week', 'day']}
                          localizer={localizer}
                          events={entries}
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
    //const getData = axios.get('http://localhost:8000/calendar').then((response) => {console.log(response)})
     */
}

export default App;
