import { Link } from 'react-router-dom';
import { classNames } from 'renderer/shared/lib/classNames';
import cls from './Sidebar.module.scss'

interface SidebarProps {
    className: string;
}

export const Sidebar = ({className}: SidebarProps) => {
    return (
        <div className={ classNames(cls.Sidebar, {}, [className]) }>

            <Link className={ classNames(cls.nav) } to={"/"}>Учет времени</Link>

            <Link className={ classNames(cls.nav) } to={"/todo"}>TODO</Link>

            <Link className={ classNames(cls.nav) } to={"/notes"}>Заметки</Link>
        </div>
    );
};
