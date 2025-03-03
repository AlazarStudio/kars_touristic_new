import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  useRecordContext,
} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit } from 'react-admin';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ITEM_TYPE = 'DAY';

// 🔥 Компонент DraggableDay (день тура с возможностью перетаскивания)
const DraggableDay = ({ index, moveDay, day }) => {
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
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        border: '1px solid #ddd',
        marginBottom: '4px',
        cursor: 'grab',
      }}
    >
      <TextInput source={`infoByDays[${index}].title`} label="Название дня" fullWidth defaultValue={day.title} />
      <TextInput source={`infoByDays[${index}].description`} label="Описание" multiline fullWidth defaultValue={day.description} />
    </div>
  );
};

// 🔥 MultiDayToursList (список туров)
export const MultiDayToursList = () => (
  <DndProvider backend={HTML5Backend}>
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" label="Название тура" />
        <TextField source="transport" label="Транспорт" />
        <TextField source="duration" label="Длительность" />
        <TextField source="price" label="Цена" />

        {/* Привязанный регион */}
        <ReferenceField source="regionId" reference="regions" label="Регион">
          <TextField source="title" />
        </ReferenceField>

        {/* Изображения */}
        <ArrayField source="img" label="Изображения">
          <SingleFieldList>
            <ImageField source="src" title="Изображение" />
          </SingleFieldList>
        </ArrayField>

        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  </DndProvider>
);

// 🔥 MultiDayToursCreate (создание тура)
export const MultiDayToursCreate = () => (
  <Create
    transform={(data) => ({
      ...data,
      infoByDays: data.infoByDays?.map((day) => ({
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

      {/* Поле для добавления дней тура */}
      <ArrayInput source="infoByDays" label="Дни тура">
        <SimpleFormIterator>
          <TextInput source="title" label="Название дня" />
          <TextInput source="description" label="Описание" multiline />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

// 🔥 MultiDayToursEdit (редактирование тура с drag-and-drop дней)
export const MultiDayToursEdit = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();
  const record = useRecordContext();
  const [days, setDays] = useState([]);

  // Загружаем данные при монтировании
  useEffect(() => {
    if (record?.id) {
      dataProvider.getOne('multidaytours', { id: record.id }).then(({ data }) => {
        setDays(data.infoByDays || []);
      });
    }
  }, [dataProvider, record?.id]);

  // Функция для перемещения дней
  const moveDay = useCallback((fromIndex, toIndex) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      const [movedDay] = updatedDays.splice(fromIndex, 1);
      updatedDays.splice(toIndex, 0, movedDay);
      return updatedDays;
    });
  }, []);

  // Функция сохранения изменений
  const saveOrder = async (data) => {
    try {
      await dataProvider.update('multidaytours', {
        id: data.id,
        data: {
          ...data,
          infoByDays: days.map((day, index) => ({
            id: day.id,
            title: day.title,
            description: day.description,
            order: index,
          })),
        },
      });
      notify('Порядок дней обновлен!', { type: 'success' });
      redirect('list', 'multidaytours');
    } catch (error) {
      notify('Ошибка обновления!', { type: 'warning' });
    }
  };

  return (
    <Edit mutationMode="pessimistic" transform={saveOrder}>
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
              <DraggableDay key={day.id} index={index} moveDay={moveDay} day={day} />
            ))}
          </SimpleFormIterator>
        </ArrayInput>

        <button type="submit" style={{ marginTop: '10px', padding: '5px 10px' }}>
          Сохранить изменения
        </button>
      </SimpleForm>
    </Edit>
  );
};
