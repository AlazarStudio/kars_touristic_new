import React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import {
  ProductsCreate,
  ProductsEdit,
  ProductsList,
} from './ProductsComponent/ProductsComponent';
// import LoginPage from './LoginPage1';
import serverConfig from '../../../serverConfig';
// import authProvider from './JS/authProvider';
import { fetchJsonWithToken } from './JS/fetchJsonWithToken';
// import {
//   CategoriesCreate,
//   CategoriesEdit,
//   CategoriesList,
// } from './ProductsComponent/CategoriesComponent';

// import {
//   DiscussionsList,
//   DiscussionsCreate,
//   DiscussionsEdit,
// } from './ProductsComponent/DiscussionsComponent';
import authProvider from './JS/authProvider';
import LoginPage from './LoginPage';
// import {
//   ShopCreate,
//   ShopEdit,
//   ShopList,
// } from './ProductsComponent/ShopComponent';
import {
  NewsCreate,
  NewsEdit,
  NewsList,
} from './ProductsComponent/NewsComponent';
import {
  FormsCreate,
  FormsEdit,
  FormsList,
} from './ProductsComponent/FormComponent';
import {
  TypeSupportCreate,
  TypeSupportEdit,
  TypeSupportList,
} from './ProductsComponent/TypeSupportComponent';
import {
  TagsSupportCreate,
  TagsSupportEdit,
  TagsSupportList,
} from './ProductsComponent/TagsSupportComponent';
import {
  CenterCreate,
  CenterEdit,
  CenterList,
} from './ProductsComponent/CenterComponent';
import {
  ServiceCreate,
  ServiceEdit,
  ServiceList,
} from './ProductsComponent/ServiceComponent.jsx';
import {
  SupportCreate,
  SupportEdit,
  SupportList,
} from './ProductsComponent/SupportComponent.jsx';
import {
  MapCreate,
  MapEdit,
  MapList,
} from './ProductsComponent/MapComponent.jsx';
import {
  BidCreate,
  BidEdit,
  BidList,
} from './ProductsComponent/BidComponent.jsx';

const dataProvider = simpleRestProvider(`${serverConfig}`, fetchJsonWithToken); // Ваш API
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const AdminPage = () => (
  <Admin
    basename="/admin"
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    authProvider={authProvider}
    loginPage={<LoginPage />}
  >
    <Resource
      name="forms"
      options={{ label: 'Правовая форма' }}
      list={FormsList}
      create={FormsCreate}
      edit={FormsEdit}
    />
    <Resource
      name="centers"
      options={{ label: 'Центры' }}
      list={CenterList}
      create={CenterCreate}
      edit={CenterEdit}
    />
    <Resource
      name="services"
      options={{ label: 'Услуги' }}
      list={ServiceList}
      create={ServiceCreate}
      edit={ServiceEdit}
    />
    <Resource
      name="typeSupports"
      options={{ label: 'Типы поддержки' }}
      list={TypeSupportList}
      create={TypeSupportCreate}
      edit={TypeSupportEdit}
    />

    <Resource
      options={{ label: 'Теги поддержки' }}
      name="tagsSupports"
      list={TagsSupportList}
      create={TagsSupportCreate}
      edit={TagsSupportEdit}
    />
    <Resource
      options={{ label: 'Меры поддержки' }}
      name="supports"
      list={SupportList}
      create={SupportCreate}
      edit={SupportEdit}
    />
    <Resource
      name="News"
      options={{ label: 'Новости' }}
      list={NewsList}
      create={NewsCreate}
      edit={NewsEdit}
    />
    <Resource
      name="Maps"
      options={{ label: 'Карта СМСП' }}
      list={MapList}
      create={MapCreate}
      edit={MapEdit}
    />
    <Resource
      name="bids"
      options={{ label: 'Заявки' }}
      list={BidList}
      create={BidCreate}
      edit={BidEdit}
    />
  </Admin>
);

export default AdminPage;
