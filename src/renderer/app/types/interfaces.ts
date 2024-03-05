interface IWorkModelData {
    startTime: Date;
    finalTime: Date;
    effectiveTime: number;
    project: IProject;
}

interface IProject {
    id: number;
    project_name: string;
    project_desc: string;
    price: number;
}