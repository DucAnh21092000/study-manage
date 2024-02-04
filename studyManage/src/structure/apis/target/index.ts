import { ITargetBodyModel } from '@structure/utils';
import axios from 'axios';

interface IGetListModel {
   dataSearch: string;
}
export const getListTarget = async (dataSearch: IGetListModel) => {
   const { data } = await axios.post('/target/getListTarget', dataSearch);
   return data;
};

export const createTarget = async (data: ITargetBodyModel) => {
   return await axios.post('/target/createTarget', data);
};

export const getTargetById = async (id: string) => {
   const { data } = await axios.get('/target/getTargetById/' + id);
   return data;
};

export const updateTarget = async (data: ITargetBodyModel) => {
   return await axios.put('/target/updateTarget', data);
};
