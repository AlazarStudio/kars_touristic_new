import React from 'react';
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
} from 'react-admin';
import { handleSave } from '../JS/fileUploadUtils';

export const DiscussionsList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="phone" label="Phone" />
      <TextField source="email" label="E-mail" />
      <TextField source="company" label="Company" />
      <TextField source="budget" label="Budget" />
      <TextField source="message" label="Message" />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание категории
export const DiscussionsCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <TextInput source="phone" label="Phone" />
      <TextInput source="email" label="E-mail" />
      <TextInput source="company" label="Company" />
      <TextInput source="budget" label="Budget" />
      <TextInput source="message" label="Message" />
    </SimpleForm>
  </Create>
);

// Редактирование категории
export const DiscussionsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <TextInput source="phone" label="Phone" />
      <TextInput source="email" label="E-mail" />
      <TextInput source="company" label="Company" />
      <TextInput source="budget" label="Budget" />
      <TextInput source="message" label="Message" />
    </SimpleForm>
  </Edit>
);
