import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ImageInput,
  ImageField,
  Create,
  SimpleForm,
  TextInput,
  Edit,
} from 'react-admin';
import { uploadFile, uploadFiles } from '../JS/fileUploadUtils';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../uploadsConfig';

// Список всех регионов
export const RegionList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Название" />
      <TextField source="description" label="Описание" />
      <TextField source="link" label="Ссылка" />
      <TextField source="img" label="Изображения" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание региона
export const RegionCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="title" label="Название" fullWidth />
      <TextInput source="description" label="Описание" multiline fullWidth />
      <TextInput source="link" label="Ссылка" fullWidth />
      <ImageInput source="img" label="Загрузить изображения" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

// Редактирование региона
export const RegionEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="title" label="Название" fullWidth />
      <TextInput source="description" label="Описание" multiline fullWidth />
      <TextInput source="link" label="Ссылка" fullWidth />
      <ImageInput
        source="imagesRaw"
        label="Загрузить новые изображения"
        multiple
        accept="image/*"
      >
        <ImageField source="src" title="title" />
      </ImageInput>
      <ImageInput
        source="img"
        label="Старые изображения"
        multiple
        accept="image/*"
        format={(value) =>
          value && value.length
            ? value.map((image) => ({
                src: image.includes('http') ? image : `${uploadsConfig}${image}`,
                title: image,
              }))
            : []
        }
        parse={(value) =>
          value.map((file) => {
            if (file.rawFile) {
              return file.rawFile;
            }
            return file.src.replace(`${uploadsConfig}`, '');
          })
        }
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
