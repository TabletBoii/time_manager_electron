import { classNames } from 'renderer/shared/lib/classNames';
import cls from './AboutPage.module.scss'
const AboutPage = () => {
    return (
        <div  className={ classNames(cls.aboutPage, {}, []) }>
            ABOUT PAGE
        </div>
    );
};

export default AboutPage;