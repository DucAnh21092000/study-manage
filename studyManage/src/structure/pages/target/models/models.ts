import { ENoteType } from "@structure/pages/note/enum";

export interface Todo {
   isDone: boolean;
   id?: number | undefined;
   todo?: string | undefined;
   startDate?: string | undefined;
   endDate?: string | undefined;
   completedDate?: string | undefined;
   targetType: ENoteType
}
