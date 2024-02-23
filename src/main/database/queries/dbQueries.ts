import db from '../db';

let records: any[] = [];

export interface IProjects {
  id: number;
  project_name: string;
  project_desc: string;
  price: number;
};

export function getProjectList(){
  return new Promise( (resolve, reject) => {
      let responseObj;
      db.all("SELECT * FROM projects", [], (err: any, rows: IProjects[]) => {
        if (err) {

          responseObj = {
            'error': err
          };

          reject(responseObj);
        } else {
          resolve(rows);
        }
      });
  });
}

export function createProject(project: any){
  console.log(project)
  db.run(`INSERT INTO projects(project_name, project_desc, price) VALUES(?, ?, ?)`, [project.name, project.desc, project.price], function(err: any) {
    if (err) {
      return err.message;
    }
  })
  console.log("Done")
}
