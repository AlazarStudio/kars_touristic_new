import React from "react";
import { Admin, Resource, List, Datagrid, TextField, ReferenceField, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, Create, ArrayInput, SimpleFormIterator, useDataProvider, useNotify, useRedirect } from "react-admin";
import dataProvider from "ra-data-prisma";

const API_URL = "http://localhost:4000"; // Замените на свой URL
const prismaDataProvider = dataProvider(API_URL);

// ------------------ MultiDayTours List ------------------
const MultiDayToursList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="transport" />
      <TextField source="duration" />
      <ReferenceField source="regionId" reference="regions"><TextField source="name" /></ReferenceField>
    </Datagrid>
  </List>
);

// ------------------ MultiDayTours Create ------------------
const MultiDayToursCreate = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSuccess = async (data) => {
    try {
      await dataProvider.create("infobydays", {
        data: {
          title: `Описание для ${data.title}`,
          description: "Добавьте описание дня",
          multiDayTourId: data.id,
        },
      });
      notify("Тур и описание дня успешно созданы!");
      redirect("list", "multidaytours");
    } catch (error) {
      notify("Ошибка при создании InfoByDays", { type: "warning" });
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
const MultiDayToursEdit = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSave = async (values) => {
    try {
      await dataProvider.update("multidaytours", { id: values.id, data: values });
      if (values.infoByDays && values.infoByDays.length > 0) {
        await Promise.all(
          values.infoByDays.map((day) =>
            dataProvider.update("infobydays", { id: day.id, data: day })
          )
        );
      }
      notify("Тур и описание дней обновлены!");
      redirect("list", "multidaytours");
    } catch (error) {
      notify("Ошибка при обновлении!", { type: "warning" });
    }
  };

  return (
    <Edit mutationMode="pessimistic" mutationOptions={{ onSuccess: handleSave }}>
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

