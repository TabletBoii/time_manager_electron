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
      db.all("SELECT * FROM projects", [], (err: any, rows: IProjects[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Array<IProjects>);
        }
      });
  });
}

export function getWorkByProjectID(projectID: number){
  let sql = `SELECT *
           FROM work
           WHERE project_id = ?`;
  return new Promise( (resolve, reject) => {
    db.all(sql, [projectID], (err: any, rows: any) => {
      if (err) {
        reject(err);
      } else {
        console.log(rows);
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

export function createWork(work: any){
  console.log(work)
  db.run(`INSERT INTO work(project_id, start_date, finish_date, name, desc, effective_time) VALUES(?, ?, ?, ?, ?, ?)`, 
  [work.project, work.begin, work.finish, work.name, work.desc, work.time], function(err: any) {
    if (err) {
      console.log(err.message)
      return err.message;
    }
  })
  console.log("Done")
}