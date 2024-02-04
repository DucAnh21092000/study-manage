export interface IFilterDropDown {
   setSelectedKeys: (value: string | string[]) => string;
   selectedKeys: string[] | string;
   confirm: any;
   clearFilters: VoidFunction;
   close: VoidFunction;
}
