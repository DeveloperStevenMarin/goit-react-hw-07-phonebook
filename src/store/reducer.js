import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://64c88ee3a1fe0128fbd5e7e1.mockapi.io';

// Operación fetchContacts (GET)
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
    const response = await axios.get(`${API_BASE_URL}/contacts`);
    return response.data;
});

// Operación addContact (POST)
export const addContact = createAsyncThunk('contacts/addContact', async (contactData) => {
    const response = await axios.post(`${API_BASE_URL}/contacts`, contactData);
    return response.data;
});

// Operación deleteContact (DELETE)
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
    await axios.delete(`${API_BASE_URL}/contacts/${contactId}`);
    return contactId;
});

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        filter: '',
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addContact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteContact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter((contact) => contact.id !== action.payload);
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },

});
export const setFilter = createAction('contacts/setFilter');
export default contactsSlice.reducer;

