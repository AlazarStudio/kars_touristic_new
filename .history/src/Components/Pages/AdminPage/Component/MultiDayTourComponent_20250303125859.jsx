import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ImageInput,
  ImageField,
  ReferenceField,
  useDataProvider,
  useNotify,
  useRedirect,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
} from 'react-admin';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Edit } from 'react-admin';
import { uploadFile, uploadFiles } from '../JS/fileUploadUtils';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

export const MultiDayToursList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="transport" />
      <TextField source="duration" />
      <ReferenceField source="regionId" reference="regions">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);

export const MultiDayToursCreate = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSuccess = async (data) => {
    try {
      await dataProvider.create('infobydays', {
        data: {
          title: `Описание для ${data.title}`,
          description: 'Добавьте описание дня',
          multiDayTourId: data.id,
        },
      });
      notify('Тур и описание дня успешно созданы!');
      redirect('list', 'multidaytours');
    } catch (error) {
      notify('Ошибка при создании InfoByDays', { type: 'warning' });
    }
  };

  return (
    <Create mutationOptions={{ onSuccess: handleSuccess }}>
      <SimpleForm>
        <TextInput source="title" fullWidth />
        <TextInput source="transport" />
        <TextInput source="duration" />
        <TextInput source="timeToStart" />
        <TextInput source="type" />
        <TextInput source="level" />
        <TextInput source="minNumPeople" />
        <TextInput source="maxNumPeople" />
        <TextInput source="price" />
        <TextInput source="addInfo" multiline />
        <ArrayInput source="img">
          <SimpleFormIterator>
            <TextInput label="Image URL" />
          </SimpleFormIterator>
        </ArrayInput>
        <ReferenceInput source="regionId" reference="regions">
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

// ------------------ MultiDayTours Edit ------------------
export const MultiDayToursEdit = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSave = async (values) => {
    try {
      await dataProvider.update('multidaytours', {
        id: values.id,
        data: values,
      });
      if (values.infoByDays && values.infoByDays.length > 0) {
        await Promise.all(
          values.infoByDays.map((day) =>
            dataProvider.update('infobydays', { id: day.id, data: day })
          )
        );
      }
      notify('Тур и описание дней обновлены!');
      redirect('list', 'multidaytours');
    } catch (error) {
      notify('Ошибка при обновлении!', { type: 'warning' });
    }
  };

  return (
    <Edit
      mutationMode="pessimistic"
      mutationOptions={{ onSuccess: handleSave }}
    >
      <SimpleForm>
        <TextInput source="title" fullWidth />
        <TextInput source="transport" />
        <TextInput source="duration" />
        <TextInput source="timeToStart" />
        <TextInput source="type" />
        <TextInput source="level" />
        <TextInput source="minNumPeople" />
        <TextInput source="maxNumPeople" />
        <TextInput source="price" />
        <TextInput source="addInfo" multiline />
        <ArrayInput source="img">
          <SimpleFormIterator>
            <TextInput label="Image URL" />
          </SimpleFormIterator>
        </ArrayInput>
        <ReferenceInput source="regionId" reference="regions">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ArrayInput source="infoByDays">
          <SimpleFormIterator>
            <TextInput source="title" />
            <TextInput source="description" multiline />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};
