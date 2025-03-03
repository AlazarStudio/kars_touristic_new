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
  ArrayField,
  SingleFieldList,
  ChipField,
} from 'react-admin';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Edit } from 'react-admin';
import { uploadFile, uploadFiles } from '../JS/fileUploadUtils';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../uploadsConfig';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Компонент для одного дня тура с возможностью перетаскивания
const DraggableDay = ({ day, index, moveDay }) => {
  const [, ref] = useDrag({
    type: 'DAY',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'DAY',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveDay(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ padding: '8px', border: '1px solid #ddd', marginBottom: '4px', cursor: 'grab' }}>
      <strong>{day.title}</strong>
      <p style={{ margin: 0 }}>{day.description}</p>
    </div>
  );
};

// Основной компонент списка MultiDayTours с draggable днями
export const MultiDayToursList = () => {
  const [infoByDays, setInfoByDays] = useState([]);
  const dataProvider = useDataProvider();
  const notify = useNotify();

  // Функция для перемещения дней
  const moveDay = useCallback((fromIndex, toIndex) => {
    setInfoByDays((prev) => {
      const updatedDays = [...prev];
      const [movedItem] = updatedDays.splice(fromIndex, 1);
      updatedDays.splice(toIndex, 0, movedItem);
      return updatedDays;
    });
  }, []);

  // Функция сохранения нового порядка дней
  const saveOrder = async (multiDayTourId) => {
    try {
      await dataProvider.update('multidaytours', {
        id: multiDayTourId,
        data: { infoByDays },
      });
      notify('Порядок дней обновлен!', { type: 'success' });
    } catch (error) {
      notify('Ошибка обновления порядка дней!', { type: 'warning' });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
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

          {/* Отображение дней тура с Drag and Drop */}
          <ArrayField source="infoByDays" label="Дни тура">
            <div>
              {infoByDays.length > 0 ? (
                infoByDays.map((day, index) => (
                  <DraggableDay key={day.id} index={index} day={day} moveDay={moveDay} />
                ))
              ) : (
                <p>Нет информации о днях</p>
              )}
              <button onClick={() => saveOrder()} style={{ marginTop: '10px', padding: '5px 10px' }}>
                Сохранить порядок
              </button>
            </div>
          </ArrayField>

          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    </DndProvider>
  );
};


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
