import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import moment from "moment";
import {queryClient} from "../index";

/*
export const getFn = async () => {
    return fetch('http://localhost:8000/calendar').then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(res)
        return res;
    }).catch(error => {
        console.error('Error:', error);
    });
}*/


export const useEntries = () => {
    return useQuery({
        queryFn: async () => {
            const {data} = await axios.get('http://localhost:8000/calendar');
            return data;
        },
        queryKey: ['GET_ENTRIES']
    })
}


const postEntry = async (newEntry) => {
    const {data} = await axios.post('http://localhost:8000/calendar', {

            title: newEntry.title,
            startDate: moment(newEntry.start).format(),
            endDate: moment(newEntry.end).format(),
            color: newEntry.color,
            allDay: newEntry.allDay? newEntry.allDay:false,

    });
    return data;

}
export const useCreateEntries = () => {
    return useMutation({
        mutationFn: postEntry,
        onSuccess: () => {
            queryClient.invalidateQueries(['GET_ENTRIES']);
    }})
};

