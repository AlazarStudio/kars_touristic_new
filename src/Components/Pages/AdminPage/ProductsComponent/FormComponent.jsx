import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Edit } from 'react-admin';

// 📌 Список всех форм
export const FormsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Название" />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// 📌 Создание формы
export const FormsCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" label="Название" />
    </SimpleForm>
  </Create>
);

// 📌 Редактирование формы
export const FormsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" label="Название" />
    </SimpleForm>
  </Edit>
);
