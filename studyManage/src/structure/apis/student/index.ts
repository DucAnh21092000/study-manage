import { IListNoteFilter, ITimeLineBaseDataCollection } from '@structure/utils';
import axios from 'axios';

export const getOptionCurriculum = async () => {
   return await axios.get('/getCurriculum');
};

export const getOptionSpecialize = async () => {
   return await axios.get('/getSpecialize');
};

export const createSchedule = async (data: ITimeLineBaseDataCollection) => {
   return axios.post('/plan/createListSchedule', data);
};

export const getListSchedule = async (data: IListNoteFilter) => {
   return axios.post('/plan/getListSchedule', data);
};

export const getScheduleById = async (id: string) => {
   return axios.get('/plan/getScheduleById/' + id);
};

export const deleteScheduleById = async (id: string) => {
   return axios.delete('/plan/deleteSchedule/' + id);
};

export const updateScheduleById = async (data: ITimeLineBaseDataCollection) => {
   return axios.put('/plan/updateSchedule/', data);
};

export const getScheduleByRecordId = async (id: string) => {
   return axios.get('/plan/getDetailSchedule/' + id);
};

export const getCurrentSchedule = async (id: string) => {
   return axios.get('/plan/getCurrentSchedule/' + id);
};
