import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import cls from './WorkTable.module.scss'
import { convertSeconds } from 'renderer/utils/utils';
import { ExcelButton } from 'renderer/widgets/ExcelButton';
import { TableSlicer } from 'renderer/widgets/TableSlicer';

const WorkTable = ({ props }: any) => {
    const [data, setData] = useState(props.workList);
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});
    const [totalTime, setTotalTime] = useState(0);

    const [filterYear, setFilterYear] = useState('');
    const [filterMonth, setFilterMonth] = useState('');

    const [uniqueYears, setUniqueYears] = useState(Array);
    const [uniqueMonths, setUniqueMonths] = useState(Array);

    useEffect(() => {
        const years = new Set();
        const months = new Set();
        let totalTimeInit = 0;
        props.workList.forEach((item: any) => {
            const date = new Date(item.start_date); // Assuming start_date is a Unix timestamp
            years.add(date.getFullYear());
            months.add(date.getMonth() + 1); // JavaScript months are 0-indexed
            totalTimeInit += item.effective_time;
        });
        setTotalTime(totalTimeInit)
        setUniqueYears(Array.from(years).sort());
        setUniqueMonths(Array.from(months).sort());
        
    }, [props.workList]);


    const sortTable = (key: any) => {
        let direction = 'asc';
        if(sortConfig.key === key && sortConfig.direction == 'asc') {
            direction = 'desc';
        }

        const sortedData = [...data].sort((a:any, b:any) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        })

        setData(sortedData);
        setSortConfig({key, direction});
    }

    useEffect(() => {
        let totalTimeFiltered = 0;
        const filtered = props.workList.filter((item: any) => {
            const date = new Date(item.start_date); // Convert Unix timestamp to Date object
            return (!filterYear || date.getFullYear().toString() === filterYear) &&
                   (!filterMonth || (date.getMonth() + 1).toString() === filterMonth);
        });
        filtered.forEach((item: any) => {
            totalTimeFiltered += item.effective_time;
        });
        setData(filtered);
        setTotalTime(totalTimeFiltered);
    }, [filterYear, filterMonth, props.workList]);

    function getOptimalColumnWidths(data: any) {
        let maxWidths: any[] = [];
      
        // Пройти по всем строкам данных
        data.forEach((row: any) => {
          Object.keys(row).forEach((key, index) => {
            // Преобразовать все значения в строки и вычислить их длину
            const valueLength = row[key] ? row[key].toString().length : 0;
            // Установить или обновить максимальную ширину для каждого столбца
            maxWidths[index] = Math.max(maxWidths[index] || 0, valueLength);
          });
        });
      
        // Преобразовать ширину в символах в ширину столбца для Excel
        // Можно настроить коэффициент, чтобы учитывать различные шрифты и размеры ячеек
        const columnWidths = maxWidths.map(chars => ({ wch: chars + 1 })); // Добавить немного дополнительного места
        return columnWidths;
    }

    const exportToExcel = () => {
    // Generate Excel file
        let fileName = "data"
        let dataToLoad = data.map((item: any) => ({
            "ID работы": item.id,
            "Название": item.name,
            "Начало": new Intl.DateTimeFormat('ru-RU', 
            {
                year: 'numeric', 
                month: 'long',
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit'
            })
            .format(item.start_date),
            "Окончание": new Intl.DateTimeFormat('ru-RU', 
            {
                year: 'numeric', 
                month: 'long',
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit'
            })
            .format(item.finish_date),
            "Описание": item.desc,
            "Затраченное время": convertSeconds(item.effective_time)
        }));
        dataToLoad = [...dataToLoad, {
            // ваш новый объект
            "ID работы": "",
            "Начало": "",
            "Окончание": "",
            "Описание": "Общее затраченное время:",
            "Затраченное время": convertSeconds(totalTime)
        }, {
            "ID работы": "",
            "Начало": "",
            "Окончание": "",
            "Описание": "Итого:",
            "Затраченное время": Math.round((totalTime/60/60)*props.projectPrice)
        }];

        

        const workbook = XLSX.utils.book_new();
        
        const worksheet = XLSX.utils.json_to_sheet(dataToLoad);

        const optimalWidths = getOptimalColumnWidths(dataToLoad);
        worksheet['!cols'] = optimalWidths;

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Create a temporary anchor element and trigger download
        const exportFileName = `${fileName}.xlsx`;
        const dataBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const blob = new Blob([dataBlob], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = exportFileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    };


    return (
        <div className={cls.table}>
            <div className={cls.tableSettings}>
                <div className={cls.tableFilters}>
                    <TableSlicer 
                        setFilter={setFilterYear} 
                        filterData={filterYear} 
                        uniqueData={uniqueYears} 
                        title="Выберите год"
                        
                    />

                    <TableSlicer 
                        setFilter={setFilterMonth} 
                        filterData={filterMonth}
                        uniqueData={uniqueMonths} 
                        title="Выберите месяц"
                        className={cls.monthFilter}
                    />

                </div>
                <div className={cls.downloadBtns}>
                    <ExcelButton onClick={exportToExcel}/>
                </div>
            </div>
            <div className={cls.workTableDiv}>
                <table className={cls.workTable}>
                    <thead>
                        <tr>
                            <th onClick={ () => sortTable('name') }>
                                Название {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={ () => sortTable('desc') }>
                                Описание {sortConfig.key === 'desc' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={ () => sortTable('start_date') }>
                                Начало {sortConfig.key === 'start_date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={ () => sortTable('finish_date') }>
                                Окончание {sortConfig.key === 'finish_date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={ () => sortTable('effective_time') }>
                                Время {sortConfig.key === 'effective_time' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            {/* <th onClick={ () => sortTable('name') }>Действия</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {/* data.length > 0 ? */}
                        { data.map((work: any, index: any) => (
                            <tr key={index}>
                                <td>{work.name}</td>
                                <td>{work.desc}</td>
                                <td>
                                    {new Intl.DateTimeFormat('ru-RU', 
                                    {
                                        year: 'numeric', 
                                        month: 'long',
                                        day: '2-digit', 
                                        hour: '2-digit', 
                                        minute: '2-digit', 
                                        second: '2-digit'
                                    })
                                    .format(work.start_date)}
                                </td>
                                <td>
                                    {new Intl.DateTimeFormat('ru-RU', 
                                    {
                                        year: 'numeric', 
                                        month: 'long',
                                        day: '2-digit', 
                                        hour: '2-digit', 
                                        minute: '2-digit', 
                                        second: '2-digit'
                                    })
                                    .format(work.finish_date)}
                                </td>
                                <td>
                                    {convertSeconds(work.effective_time)}
                                </td>
                                {/* <td>
                                    <IconButton>
                                        <DeleteForeverIcon 
                                            className={ cls.buttonIcon }
                                            onClick={()=>deleteWorkByID(work.id)}
                                        />
                                    </IconButton>
                                </td> */}
                            </tr>
                            
                        // )) : "Работ по проекту ещё не велось"
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="table-total">
                            <td colSpan={3}>Итоговое время: {convertSeconds(totalTime)}</td>
                            <td colSpan={2}>Итого: {Math.round((totalTime/60/60)*props.projectPrice)} KZT</td>
                        </tr>
                    </tfoot>
                </table>

                
            </div>
            {/* <div className={cls.totalInfo}>
                <div className={cls.totalTime}>Итоговое время: {convertSeconds(totalTime)} </div>
                <div className={cls.price}>Итого: {Math.round((totalTime/60/60)*props.projectPrice)} KZT</div>
            </div> */}
            
            
        </div>
    );
};

export {
    WorkTable
}