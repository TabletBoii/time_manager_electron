import React from 'react';
import cls from './CreateProjectPage.module.scss'


const CreateProjectPage = () => {
    return (
        <div className={cls.CreateProjectPage}>
            <div className={cls.content}>
                <form>
                    <div className={cls.input}>
                        <span>Название проекта: </span><input type="text"/>
                    </div>
                    <div className={cls.input}>
                        <span>Описание проекта: </span><br />
                        <textarea rows={1} cols={1}>

                        </textarea>
                    </div>
                    <div className={cls.input}>
                        <span>Нормочас: </span><input type="number" />
                    </div>
                    <button className={cls.createProjectButton}>
                        Создать проект
                    </button>
                </form>
            </div>  
        </div>
    );
};

export default CreateProjectPage;