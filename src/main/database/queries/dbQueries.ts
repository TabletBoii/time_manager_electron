import db from '../db';
import { IProjects, ITODO, IWork } from '../interfaces/interfaces';

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
    db.all(sql, [projectID], (err: any, rows: IWork[]) => {
      if (err) {
        reject(err);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });

}

export function getToDoRecords(){
  return new Promise( (resolve, reject) => {
    db.all("SELECT * FROM TODO", [], (err: any, rows: ITODO[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Array<ITODO>);
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
  console.log("Adding project complited")
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
  console.log("Adding work complited")
}

export function deleteWorkByID(work_id: any){
  db.run(`DELETE FROM work WHERE id = ?`, 
  [work_id], function(err: any) {
    if (err) {
      console.log(err.message)
      return err.message;
    }
  })
  console.log("Deleting work completed")
}

export function addTODO(record: any){
  db.run(`INSERT INTO TODO(name, desc, when, status) VALUES(?, ?, ?, ?)`, 
  [record.name, record.desc, record.when, record.status], function(err: any) {
    if (err) {
      console.log(err.message)
      return err.message;
    }
  })
  console.log("Adding entry completed")
}

export function deleteTODO(record_id: any) {
  db.run(`DELETE FROM TODO WHERE id = ?`, 
  [record_id], function(err: any) {
    if (err) {
      console.log(err.message)
      return err.message;
    }
  })
  console.log("Deleting TODO completed")
}

export function updateTODO(todo: any) {
  db.run(`UPDATE TODO SET name=?, desc=?, when=?, status=? WHERE id=${todo.id}`, 
  [todo.name, todo.desc, todo.when, todo.status], function(err: any) {
    if (err) {
      console.log(err.message)
      return err.message;
    }
  })
} 