/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dayjs } from 'dayjs';
import { Todo } from './pages/target/models/models';
import { ReactNode } from 'react';
import { EStatus } from './pages/Student/enum';
import { ENoteType } from './pages/note/enum';

export interface ITimeLineData {
   Buoi_so?: string;
   BĐ?: string;
   Can_TN?: string;
   Ghi_chu?: string;
   KT?: string;
   Khoi_luong?: string;
   Kip?: string;
   Ky?: string;
   Loai_lop?: string;
   Ma_HP?: string;
   Ma_QL?: string;
   Ma_lop?: string;
   Ma_lop_kem?: string;
   Phong?: string;
   SL_Max?: string;
   SLĐK?: number;
   Ten_HP?: string;
   Ten_HP_Tieng_Anh?: string;
   Thoi_gian?: string;
   Thu?: string;
   Trang_thai?: string;
   Truong_Vien_Khoa?: string;
   Tuan?: string;
   Đot_mo?: string;
   id?: string;
   name?: string;
   totalCollageCredit?: number;
   dataModel?: any;
}

export interface ITimeData {
   start: number;
   end: number;
}

export interface INoteModel {
   name?: string;
   note?: string;
   createdAt?: string;
   updatedAt?: string;
   id?: string;
   noteType?: ENoteType;
}
export interface ITargetModel {
   name?: string;
   note?: string;
   createdAt?: string;
   updatedAt?: string;
   id?: string;
   target?: Todo[] | string;
   startDate?: Dayjs;
   endDate?: Dayjs;
}

export interface INoteBodyModel {
   name?: string;
   note?: string;
   date?: string;
   imageId?: string;
}

export interface ITargetBodyModel {
   target?: Todo[] | [];
   name?: string;
   note?: string;
   createdAt?: string;
   updatedAt?: string;
   id?: string;
   startDate?: Dayjs | string;
   endDate?: Dayjs | string;
}
export interface ITargetListOverview {
   content?: string;
   isDone?: boolean;
}

export interface ITargetFormModel extends ITargetModel {
   todo?: Todo[];
}

export interface ITimeLine {
   children?: string | ReactNode;
   color?: string;
   label?: string | ReactNode;
}

export interface IFileModel {
   fileName?: string;
   filePath?: string;
}

export interface IOption extends ITimeLineData {
   label: string;
   value: string;
   key?: string;
}

export interface IViewResultRef {
   getFieldValue: () => 1;
}

export interface IOptionType {
   other: number;
   availabel: number;
}

export interface IFormOption {
   options?: string;
   specialized?: string[];
   curriculum?: string[];
   level?: string[];
   availabelSelect?: string[];
   otherSelect?: string[];
}

export interface ITimeLineBaseDataCollection {
   name?: string;
   result?: ITimeLineDataResponseModel[];
   scheduleId?: string;
   status?: EStatus;
   note?: string;
   semester?: number;
}

export interface ITimeLineDataResponseModel {
   subject?: string;
   note?: string;
   createDate?: string;
   classNo?: number;
   subClassNo?: number;
   name?: string;
   registered?: number;
   classType?: string;
   time?: string;
   day?: string;
   recordId?: string;
   scheduleId?: string;
   semester?: number;
   tableName?: string;
   result?: ITimeLineData[];
   totalCollageCredit?: number;
}

export interface IListNoteFilter {
   status: EStatus | string;
   semester?: number;
   dateTime?: string;
   dataSearch?: string;
}

export interface ICalanderBody {
   type?: boolean[];
}
export interface ISelectOptionRef {
   handleValidateForm: any;
}
