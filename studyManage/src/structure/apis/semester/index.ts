import axios from 'axios';

export const getListSemester = async () => {
   const { data } = await axios.get('semester/getListSemester');
   return data;
};
