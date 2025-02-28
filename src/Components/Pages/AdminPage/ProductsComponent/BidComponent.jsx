import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  Edit,
} from "react-admin";

// 📌 Список всех заявок
export const BidList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Имя" />
      <TextField source="phone" label="Телефон" />
      <TextField source="email" label="Email" />
      <TextField source="form" label="Форма" />
      <TextField source="inn" label="ИНН" />
      <TextField source="comment" label="Комментарий" />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);


export const BidCreate = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" label="Имя" />
        <TextInput source="phone" label="Телефон" />
        <TextInput source="email" label="Email" />
        <TextInput source="form" label="Форма" />
        <TextInput source="inn" label="ИНН" />
        <TextInput source="comment" label="Комментарий" />
      </SimpleForm>
    </Create>
  );


  // 📌 Редактирование заявки
export const BidEdit = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" label="Имя" />
        <TextInput source="phone" label="Телефон" />
        <TextInput source="email" label="Email" />
        <TextInput source="form" label="Форма" />
        <TextInput source="inn" label="ИНН" />
        <TextInput source="comment" label="Комментарий" />
      </SimpleForm>
    </Edit>
  );