import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  SelectInput,
  ImageInput,
  ImageField,
  ReferenceArrayInput,
  SelectArrayInput,
} from 'react-admin';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  useGetList,
  ReferenceInput,
} from 'react-admin';
import { Edit } from 'react-admin';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

// Компонент для выбора категории
const CategorySelectInput = ({ source, label }) => {
  const { data, isLoading, error } = useGetList('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'title', order: 'ASC' },
  });

  if (isLoading) {
    return <SelectInput source={source} label={label} choices={[]} disabled />;
  }

  if (error) {
    console.error('Ошибка загрузки категорий:', error);
    return <div>Ошибка загрузки категорий</div>;
  }

  const choices = data.map((category) => ({
    id: category.id,
    name: category.title,
  }));

  return <SelectInput source={source} label={label} choices={choices} />;
};

// Список продуктов
export const ShopList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="organization" label="Организация" />
      <TextField source="description" label="Описание" />
      <TextField source="tags" label="Теги" />
      <TextField source="category" label="Категория" />
      <NumberField source="price" label="Цена" />
      <TextField source="img" label="Изображения" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание продукта
// React: компонент ProductsCreate
// import { Create, SimpleForm, TextInput, NumberInput, ReferenceArrayInput, SelectArrayInput, ImageInput, ImageField } from 'react-admin';

export const ShopCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <NumberInput source="price" label="Цена" />
      <ReferenceArrayInput
        source="categoryIds"
        reference="categories"
        label="Категории"
        allowEmpty
      >
        <SelectArrayInput optionText="title" />
      </ReferenceArrayInput>
      <ImageInput source="img" label="Загрузить изображения" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="description" label="Описание" />
      <TextInput source="organization" label="Организация" />
      {/* <TextInput source="tags" label="Теги (через запятую)" /> */}
    </SimpleForm>
  </Create>
);

// Редактирование продукта
export const ShopEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <NumberInput source="price" label="Цена" />
      <ReferenceInput
        source="categoryId"
        reference="categories"
        label="Категория"
        allowEmpty
      >
        <SelectInput optionText="title" />
      </ReferenceInput>
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
          Array.isArray(value)
            ? value.map((image) => ({
                src: image.includes('http') ? image : `${uploadsConfig}${image}`,
                title: image,
              }))
            : []
        }
        parse={(value) =>
          Array.isArray(value)
            ? value.map((file) =>
                file.rawFile ? file.rawFile : file.src.replace(`${uploadsConfig}`, '')
              )
            : []
        }
      >
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="description" label="Описание" />
      <TextInput source="organization" label="Организация" />
      {/* <TextInput source="tags" label="Теги" /> */}
    </SimpleForm>
  </Edit>
);

