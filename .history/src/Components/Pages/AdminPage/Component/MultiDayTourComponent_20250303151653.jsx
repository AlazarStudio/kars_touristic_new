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

import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  ArrayField,
  SingleFieldList,
  ChipField,
  ReferenceField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const MultiDayToursList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" label="Название тура" />
      <TextField source="transport" label="Транспорт" />
      <TextField source="duration" label="Длительность" />
      <TextField source="price" label="Цена" />

      {/* Отображение привязанного региона */}
      <ReferenceField source="regionId" reference="regions" label="Регион">
        <TextField source="title" />
      </ReferenceField>

      {/* Отображение изображений */}
      <ArrayField source="img" label="Изображения">
        <SingleFieldList>
          <ImageField source="src" title="Изображение" />
        </SingleFieldList>
      </ArrayField>

      {/* Отображение дат туров */}
      <ArrayField source="tourDates" label="Даты туров">
        <SingleFieldList>
          <ChipField source="." />
        </SingleFieldList>
      </ArrayField>

      {/* Отображение мест тура */}
      <ArrayField source="places" label="Места">
        <SingleFieldList>
          <ChipField source="." />
        </SingleFieldList>
      </ArrayField>

      {/* Отображение чек-листа */}
      <ArrayField source="checklists" label="Чек-лист">
        <SingleFieldList>
          <ChipField source="." />
        </SingleFieldList>
      </ArrayField>

      {/* Количество дней в туре */}
      <TextField source="infoByDays.length" label="Кол-во дней" />

      <EditButton />
      <DeleteButton />
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

        {/* 🔥 Поле для добавления дней тура с Drag & Drop */}
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
import { useState, useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ITEM_TYPE = 'DAY';

const DraggableDay = ({ index, moveDay, record }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item) {
      if (item.index !== index) {
        moveDay(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <TextInput source={`infoByDays[${index}].title`} label="Название дня" />
      <TextInput
        source={`infoByDays[${index}].description`}
        label="Описание"
        multiline
      />
    </div>
  );
};

export const MultiDayToursEdit = () => {
  const [days, setDays] = useState([]);
  const moveDay = useCallback((fromIndex, toIndex) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      const [movedDay] = updatedDays.splice(fromIndex, 1);
      updatedDays.splice(toIndex, 0, movedDay);
      return updatedDays;
    });
  }, []);

  return (
    <Edit
      mutationMode="pessimistic"
      transform={(data) => ({
        ...data,
        infoByDays: days.map((day, index) => ({
          id: day.id,
          title: day.title,
          description: day.description,
          order: index,
        })),
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

        {/* 🔥 Drag & Drop для дней тура */}
        <ArrayInput source="infoByDays" label="Дни тура">
          <SimpleFormIterator>
            {days.map((day, index) => (
              <DraggableDay
                key={index}
                index={index}
                moveDay={moveDay}
                record={day}
              />
            ))}
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};
