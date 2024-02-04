interface IDynamicItem {
   children: React.ReactNode;
   isShowItem: boolean;
}

const DynamicItem = ({ children, isShowItem }: IDynamicItem) => {
   return <>{isShowItem && children}</>;
};

export default DynamicItem;
