import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ImageField,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ImageInput,
  FunctionField,
  BooleanInput,
} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit } from 'react-admin';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';
import RichTextInput from '../Auth/RichTextInput';

// 📌 Список поддержек
export const SupportList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Название" />
      <TextField source="description" label="Описание" />
      <TextField source="typeSupport.title" label="Тип" />
      <TextField source="popular" label="Популярное" />
      {/* ✅ Отображение тегов через запятую */}
      <FunctionField
        source="tags"
        label="Теги"
        render={(record) =>
          record.tags?.map((tag) => tag.title).join(', ') || '-'
        }
      />

      {/* ✅ Отображение первого изображения */}
      <TextField source="img" label="Изображение" />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// 📌 Создание поддержки
export const SupportCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="title" label="Название" />
      <RichTextInput source="description" label="Описание" multiline />

      {/* ✅ Выбор типа поддержки */}
      <ReferenceInput
        source="typeSupportId"
        reference="typeSupports"
        label="Тип поддержки"
      >
        <SelectInput optionText="title" />
      </ReferenceInput>
      <BooleanInput source="popular" label="Популярное?" />
      {/* ✅ Выбор нескольких тегов */}
      <ReferenceArrayInput
        source="tagIds"
        reference="tagsSupports"
        label="Теги"
      >
        <SelectArrayInput optionText="title" />
      </ReferenceArrayInput>

      {/* ✅ Загрузка изображений */}
      <ImageInput
        source="img"
        label="Загрузить изображения"
        multiple
        accept="image/*"
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

// 📌 Редактирование поддержки
export const SupportEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="title" label="Название" />
      <RichTextInput source="description" label="Описание" multiline />

      {/* ✅ Выбор типа поддержки */}
      <ReferenceInput
        source="typeSupportId"
        reference="typeSupports"
        label="Тип поддержки"
      >
        <SelectInput optionText="title" />
      </ReferenceInput>
      <BooleanInput source="popular" label="Популярное?" />
      {/* ✅ Выбор нескольких тегов */}
      <ReferenceArrayInput
        source="tagIds"
        reference="tagsSupports"
        label="Теги"
      >
        <SelectArrayInput optionText="title" />
      </ReferenceArrayInput>

      {/* ✅ Загрузка новых изображений */}
      <ImageInput
        source="imagesRaw"
        label="Загрузить новые изображения"
        multiple
        accept="image/*"
      >
        <ImageField source="src" title="title" />
      </ImageInput>

      {/* Поле для отображения старых изображений */}
      <ImageInput
        source="img"
        label="Старые изображения"
        multiple
        accept="image/*"
        format={(value) =>
          value && value.length
            ? value.map((image) => ({
                src: image.includes('http')
                  ? image
                  : `${uploadsConfig}${image}`,
                title: image,
              }))
            : []
        }
        parse={(value) =>
          value.map((file) => {
            // Если это новый файл (имеет rawFile), вернем только его имя
            if (file.rawFile) {
              return file.rawFile;
            }
            // Если это старое изображение (имеет только src), извлекаем имя файла
            return file.src.replace(`${uploadsConfig}`, '');
          })
        }
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
