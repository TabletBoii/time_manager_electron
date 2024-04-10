import React from 'react';
import cls from './TableSlicer.module.scss'

interface TableSlicerProps {
    setFilter: (value: string) => void;
    filterData: any;
    uniqueData: any;
    title: string;
    className?: string;
}


const TableSlicer: React.FC<TableSlicerProps> = ({ setFilter, filterData, uniqueData, title, className }) => {
    return (
        <select className={`${cls.slicer} ${className}`} value={filterData} onChange={(e) => setFilter(e.target.value)}>
            <option value="">{title}</option>
            {uniqueData.map((item: any) => (
                <option key={item} value={item}>{item}</option>
            ))}
        </select>
    );
};

export {
    TableSlicer
};