import React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';


import serverConfig from '../../serverConfig';

import { fetchJsonWithToken } from './JS/fetchJsonWithToken';

// import authProvider from './JS/authProvider';
// import LoginPage from './LoginPage';


const dataProvider = simpleRestProvider(`${serverConfig}`, fetchJsonWithToken); // Ваш API
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const AdminPage = () => (
  <Admin
    basename="/admin"
    dataProvider={dataProvider}
    // i18nProvider={i18nProvider}
    // authProvider={authProvider}
    // loginPage={<LoginPage />}
  >
  
  </Admin>
);

export default AdminPage;
