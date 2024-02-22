import db from "main/database/db";

let records: any[] = [];

export function getProjectList(){
    
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM projects'
        db.all(sql,[],(err: any, rows: any)=>{
          if(err){
            return console.error(err.message);
          }
          rows.forEach((row: any)=>{
            console.log(row)
            records.push(row);
          });
          
         resolve(records);
      })
        
    })
}
