import './App.css';
import React, {useState} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css"
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment';
import CustomToolbar from "./components/CustomToolbar";
import AddEventPopup from "./components/AddEventPopup";
import CustomEvent from "./components/CustomEvent";
import {lighten, modularScale, rgba} from 'polished'
import {getFn, useCreateEntries, useDeleteEntries, useEntries, useUpdateEntries} from "./requests/requestFunc";
import axios from "axios";
import {createEvent} from "./components/AddEventPopup";
import UploadImportPopup from "./components/UploadImportPopup";


const localizer = momentLocalizer(moment);


function App() {
    const fetchedData = useEntries();

    const entries = fetchedData.data?.map(entry => ({
         title: entry.title,
         start: new Date(entry.startDate),
         end: new Date(entry.endDate),
         color: entry.color,
         allDay: entry.allDay,
         id: entry._id,
     }))

    //console.log('internal :', entries)

    //const [allEvents, setAllEvents] = useState(entries)
    const [isAddEventPopupOpen, setIsAddEventPopupOpen] = useState(false)
    const [isUpdateEventPopupOpen, setIsUpdateEventPopupOpen] = useState(false)
    const [isUploadImportPopupOpen, setIsUploadImportPopupOpen] = useState(false)
    const [currentEvent, setCurrentEvent] = useState(null)



    const onCancelAddEvent = () => {
        setIsAddEventPopupOpen(false);
        setIsUpdateEventPopupOpen(false);
    }

    const onCancelUploadImport = () => {
        setIsUploadImportPopupOpen(false)
    }

   const onClickEvent = (event) => {
       // console.log('eventClickHandler: ', event)
        setCurrentEvent(event);
       setIsUpdateEventPopupOpen(true);
   }

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
    const {mutateAsync: updateEntry} = useUpdateEntries()
    const {mutateAsync: deleteEntry} = useDeleteEntries()

    const deleteEntryFuncArg = (id) =>
    {
        deleteEntry(id)
        setIsUpdateEventPopupOpen(false);
    }

    const onFinishAddEvent = async (fieldsValue) => {

        const newEvent = createEvent(fieldsValue)
        if(fieldsValue['params'].isNew) {
            createEntry(newEvent)
        }

        else
        {
            updateEntry(newEvent)
        }

        //handleAddEvent(newEvent)
        setIsAddEventPopupOpen(false);
        setIsUpdateEventPopupOpen(false);
    }

    const components = {
        toolbar: props => (<CustomToolbar {...props} setIsAddEventPopupOpen={setIsAddEventPopupOpen}/>),
        event: props => (<CustomEvent {...props} color={'#0047ab'}/>)
    }

    return (
        <div>

            {isAddEventPopupOpen && <AddEventPopup onCancel={onCancelAddEvent} onFinish={onFinishAddEvent} isNew={true}/>}
            {isUpdateEventPopupOpen && <AddEventPopup onCancel={onCancelAddEvent} onFinish={onFinishAddEvent} isNew={false} event={currentEvent} deleteEntry={deleteEntryFuncArg}/>}
            {isUploadImportPopupOpen && <UploadImportPopup onCancel={onCancelUploadImport} setIsUploadImportPopupOpen={setIsUploadImportPopupOpen}/>}
            <div style={{height: "100vh"}}>
                <Calendar components={{
                    toolbar: props => (<CustomToolbar {...props} setIsAddEventPopupOpen={setIsAddEventPopupOpen} setIsUploadImportPopupOpen={setIsUploadImportPopupOpen}/>)
                }}

                          views={['month', 'week', 'day']}
                          onSelectEvent ={onClickEvent}
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

    //<AddEventPopup onCancel={onCancelAddEvent} onFinishAddEvent={onFinishAddEvent}/>}
    //const getData = axios.get('http://localhost:8000/calendar').then((response) => {console.log(response)})
     */
}

export default App;
