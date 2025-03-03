import React, { useState, useEffect, useCallback, useRef } from 'react';
import { List, TextField, useDataProvider, useNotify } from 'react-admin';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ITEM_TYPE_TOUR = 'TOUR';

// 🔥 DraggableTour - Компонент одного тура
const DraggableTour = ({ tour, index, moveTour }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE_TOUR,
    hover(item) {
      if (item.index !== index) {
        moveTour(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE_TOUR,
    item: { index, id: tour.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}>
      <td>{tour.id}</td>
      <td>{tour.title}</td>
      <td>{tour.transport}</td>
      <td>{tour.duration}</td>
      <td>{tour.price}</td>
      <td>{tour.region?.title || 'Нет региона'}</td>
    </tr>
  );
};

// 🔥 MultiDayToursList - Список туров с Drag & Drop
export const MultiDayToursList = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    dataProvider
      .getList('multidaytours', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'order', order: 'ASC' }, // Загружаем туры в порядке order
      })
      .then(({ data }) => setTours(data))
      .catch(() => notify('Ошибка загрузки туров', { type: 'warning' }));
  }, [dataProvider, notify]);

  const moveTour = useCallback((fromIndex, toIndex) => {
    setTours((prev) => {
      const updatedTours = [...prev];
      const [movedTour] = updatedTours.splice(fromIndex, 1);
      updatedTours.splice(toIndex, 0, movedTour);
      return updatedTours;
    });
  }, []);

  const saveOrder = async () => {
    try {
      await dataProvider.updateMany('multidaytours/order', {
        ids: tours.map((tour) => tour.id),
        data: {
          orderedTours: tours.map((tour, index) => ({
            id: tour.id,
            order: index, // Устанавливаем новый порядок
          })),
        },
      });
      notify('Порядок туров обновлен!', { type: 'success' });
    } catch (error) {
      notify('Ошибка обновления порядка!', { type: 'warning' });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название тура</th>
            <th>Транспорт</th>
            <th>Длительность</th>
            <th>Цена</th>
            <th>Регион</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour, index) => (
            <DraggableTour
              key={tour.id}
              tour={tour}
              index={index}
              moveTour={moveTour}
            />
          ))}
        </tbody>
      </table>
      <button
        onClick={saveOrder}
        style={{ marginTop: '10px', padding: '5px 10px' }}
      >
        Сохранить порядок
      </button>
    </DndProvider>
  );
};
