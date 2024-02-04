import { INoteBodyModel } from '@structure/utils';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:2109/api';

interface IGetListModel {
   dataSearch: string;
}

export const getListNote = async (value: IGetListModel) => {
   const { data } = await axios.post('/note/getListNote', value);
   return data;
};

export const createNote = async (data: INoteBodyModel) => {
   return await axios.post('/note/createNote', data);
};

export const getNoteById = async (id: string) => {
   const { data } = await axios.get('/note/getNoteById/' + id);
   return data;
};

export const getListNoteType = async () => {
   const { data } = await axios.get('/note/getNoteTypeOption');
   return data;
};

export const deleteNoteById = async (id: string) => {
   const { data } = await axios.get('/note/deleteNoteById/' + id);
   return data;
};
