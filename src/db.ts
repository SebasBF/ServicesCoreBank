import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const { USERDB, HOST, PASSWORD, DATABASE, PGPORT } = process.env;

const connection = new Pool({
    user: USERDB,
    password: PASSWORD,
    host: HOST,
    port: Number(PGPORT),
    database: DATABASE,
    keepAlive: true 
})

connection.on('error', () => {
    console.log('error from database')
})

const reconect = () => {
    console.log('reconnecting...')
    connection.connect((err, client) => {
        if(err){
            setTimeout(reconect, 5000)
        }
        else {
            console.log('connection success')
        }
    })

}

connection.connect((err, client) => {
    if(err){
        console.log('connection error')
        reconect()
    }
    else{
        console.log('connection success')
    }
});

// create table if not exists PROFESOR(id_profesor serial primary key, nombre_profesor varchar(50) not null, id_area integer, foreign key (id_area) references AREA(id_area));
// create table if not exists AREA(id_area serial primary key, nombre_area varchar(50));
// create table if not exists REVIEW(id_review serial primary key, id_profesor integer, calificacion integer, comentario text, foreign key (id_profesor) references PROFESOR(id_profesor));
// create table if not exists UNIVERSIDAD (id_universidad serial primary key, nombre_universidad varchar(50));
// create table if not exists PROFESOR_UNIVERSIDAD(id_profesor_universidad serial primary key, id_profesor integer, id_universidad integer, foreign key (id_profesor) references PROFESOR(id_profesor), foreign key (id_universidad) references UNIVERSIDAD(id_universidad));

const query = async (text: string, params: string[]) => {
    try{
      const res = await connection.query(text, params);
      return res;
    }
    catch(e: any){
      throw new Error(e);
    }
}

export default query;