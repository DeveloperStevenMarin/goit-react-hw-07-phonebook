import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Importa el almacenamiento que deseas utilizar (puede ser localStorage, sessionStorage, etc.)
import contactsReducer from './reducer';

const persistConfig = {
  key: 'root', // La clave para el almacenamiento en el que se guardarán los datos. Puedes cambiarla si es necesario.
  storage,
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
  reducer: {
    contacts: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };