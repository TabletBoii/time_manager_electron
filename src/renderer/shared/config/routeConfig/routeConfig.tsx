import { AboutPage } from "renderer/pages/AboutPage"
import { MainPage } from "renderer/pages/MainPage"
import { CreateProjectPage } from "renderer/pages/CreateProjectPage"
import { RouteProps } from "react-router-dom"



export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    CREATE_PROJECT = 'create_project'
}


export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.CREATE_PROJECT]: '/create_project'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage/>
    },
    [AppRoutes.CREATE_PROJECT]: {
        path: RoutePath.create_project,
        element: <CreateProjectPage/>
    }
}
