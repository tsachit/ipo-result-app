import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export const fetchUsers = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `select * from users;`,
      [],
      (_, { rows: { _array } }) => callback(_array)
    );
  });
};

export const dropTable = () => {
  console.log('called drop');
  db.transaction((tx) => {
    tx.executeSql(
      "drop table users;"
    );
  });
};

export const createTable = () => {
  console.log('called create');
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists users (id integer primary key not null, name text, boid int unique );"
    );
  });
};

export const createUserOnDB = (name, boid, successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql("select * from users where boid = ?", [boid],
      (_, { rows: { _array } }) => {
        if(_array.length) {
          return errorCallback('BOID is already saved, insert a different one')
        } else {
          let lastRowId;
          // create only if there is no record with same boid
          db.transaction(
            (tx) => {
              tx.executeSql("insert into users (name, boid) values (?, ?)", [name, boid],
              (_, { insertId }) => { lastRowId = insertId; successCallback(insertId) },
              () => errorCallback('Something went wrong, make sure you type everything correctly'));
            },
            () => {
              errorCallback('Something went wrong, make sure you type everything correctly');
            }
          );
        }
      }
    );
  });

};

export const updateUserOnDB = (id, name, boid, successCallback, errorCallback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`update users set name = ?, boid = ? where id = ?;`, [name, parseInt(boid, 10), id]);
    },
    (error) => {
      console.log(error);
      errorCallback('Something went wrong, make sure you type everything correctly');
    },
    () => successCallback(),
  );
};

export const deleteUserOnDB = (id, successCallback, errorCallback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`delete from users where id = ?;`, [id]);
    },
    () => {
      errorCallback('Something went wrong, make sure you type everything correctly');
    },
    (t) => {
      successCallback(1);
    },
  );
};