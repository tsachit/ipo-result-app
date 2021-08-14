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

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists users (id integer primary key not null, name text, boid int unique );"
    );
  });
};

export const createUserOnDB = (name, boid) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into users (name, boid) values (?, ?)", [name, boid]);
    },
    null,
    true
  );
};

export const updateUserOnDB = (id, name, boid) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`update users set name = ?, boid = ? where id = ?;`, [
        name,
        boid,
        id,
      ]);
    },
    null,
    true
  );
};

export const deleteUserOnDB = (id) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`delete from users where id = ?;`, [id]);
    },
    null,
    true
  );
};