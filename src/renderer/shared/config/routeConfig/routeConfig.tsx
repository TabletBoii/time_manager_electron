import { AboutPage } from "renderer/pages/AboutPage"
import { MainPage } from "renderer/pages/MainPage"
import { CreateProjectPage } from "renderer/pages/CreateProjectPage"
import { RouteProps } from "react-router-dom"
import { WorkPage } from "renderer/pages/WorkPage"
import { CreateWorkPage } from "renderer/pages/CreateWorkPage"
import { WorkListPage } from "renderer/pages/WorkListPage"
import { StartWorkpage } from "renderer/pages/StartWorkPage"



export enum AppRoutes {
    MAIN = 'main',
    CREATE_PROJECT = 'create_project',
    WORK = 'work',
    CREATE_WORK = 'create_work',
    WORK_LIST = 'work_list',
    START_WORK = 'start_work',
}


export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CREATE_PROJECT]: '/create_project',
    [AppRoutes.WORK]: '/work',
    [AppRoutes.CREATE_WORK]: '/create_work',
    [AppRoutes.WORK_LIST]: '/work_list',
    [AppRoutes.START_WORK]: '/start_work',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },
    [AppRoutes.CREATE_PROJECT]: {
        path: RoutePath.create_project,
        element: <CreateProjectPage/>
    },
    [AppRoutes.WORK]: {
        path: RoutePath.work,
        element: <WorkPage/>
    },
    [AppRoutes.CREATE_WORK]: {
        path: RoutePath.create_work,
        element: <CreateWorkPage/>
    },
    [AppRoutes.WORK_LIST]: {
        path: RoutePath.work_list,
        element: <WorkListPage/>
    },
    [AppRoutes.START_WORK]: {
        path: RoutePath.start_work,
        element: <StartWorkpage/>
    },
}
