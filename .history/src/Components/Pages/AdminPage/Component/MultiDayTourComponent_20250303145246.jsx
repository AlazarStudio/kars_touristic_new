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
import uploadsConfig from '../../../uploadsConfig';

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
  return (
    <Create
      transform={(data) => ({
        ...data,
        infoByDays:
          data.infoByDays?.map((day) => ({
            title: day.title,
            description: day.description,
          })) || [],
      })}
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
        <ImageInput source="img" label="Загрузить изображение" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
        <ReferenceInput source="regionId" reference="regions">
          <SelectInput optionText="title" />
        </ReferenceInput>

        {/* 🔥 Поле для добавления дней тура */}
        <ArrayInput source="infoByDays" label="Дни тура">
          <SimpleFormIterator>
            <TextInput source="title" label="Название дня" />
            <TextInput source="description" label="Описание" multiline />
          </SimpleFormIterator>
        </ArrayInput>
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
      transform={handleSaveWithImages}
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
        <ImageInput
          source="imagesRaw"
          label="Загрузить новые изображения"
          multiple
          accept="image/*"
        >
          <ImageField source="src" title="title" />
        </ImageInput>

        {/* Поле для отображения старых изображений, если они есть */}
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
