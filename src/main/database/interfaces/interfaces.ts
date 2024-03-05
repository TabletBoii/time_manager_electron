export interface IProjects {
    id: number;
    project_name: string;
    project_desc: string;
    price: number;
};

export interface IWork {
    project_id: number;
    start_date: string;
    finish_date: string;
    name: string;
    desc: string;
    effective_time: number;
}