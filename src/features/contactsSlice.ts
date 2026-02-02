import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://iliahomework70-default-rtdb.europe-west1.firebasedatabase.app';

export interface Contact {
    id: string
    name: string
    phone: string
    email: string
    photo: string
}

export interface ContactsState {
    items: Contact[]
    selectedContact: Contact | null
    loading: boolean
}

const initialState: ContactsState = {
    items: [],
    selectedContact: null,
    loading: false,
}

export const fetchContacts = createAsyncThunk<Contact[]>(
    'contacts/fetchContacts',
    async () => {
        const response = await axios.get(`${BASE_URL}/contacts.json`)
        if (!response.data) return []
        return Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
        }))
    }
);

export const fetchContactById = createAsyncThunk<Contact, string>(
    'contacts/fetchContactById',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/contacts/${id}.json`)
        return {
            id,
            ...response.data,
        }
    }
);

export const saveContact = createAsyncThunk(
    'contacts/saveContact',
    async (contact: { id?: string; name: string; phone: string; email: string; photo: string }) => {
        if (contact.id) {
            const response = await axios.put(`${BASE_URL}/contacts/${contact.id}.json`, contact);
            return { ...contact };
        } else {
            const response = await axios.post(`${BASE_URL}/contacts.json`, contact);
            return { id: response.data.name, ...contact };
        }
    }
)

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id: string) => {
        await axios.delete(`${BASE_URL}/contacts/${id}.json`);
        return id;
    }
);


const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        clearSelectedContact: (state) => {
            state.selectedContact = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.loading = false
            })
            .addCase(fetchContactById.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchContactById.fulfilled, (state, action: PayloadAction<Contact>) => {
                state.loading = false
                state.selectedContact = action.payload
            })
            .addCase(fetchContactById.rejected, (state) => {
                state.loading = false
            })
            .addCase(saveContact.pending, (state) => {
                state.loading = true
            })
            .addCase(saveContact.fulfilled, (state, action: PayloadAction<Contact>) => {
                state.loading = false
                const index = state.items.findIndex(c => c.id === action.payload.id)
                if (index >= 0) {
                    state.items[index] = action.payload
                } else {
                    state.items.push(action.payload)
                }
            })
            .addCase(saveContact.rejected, (state) => {
                state.loading = false
            })
            .addCase(deleteContact.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteContact.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false
                state.items = state.items.filter(contact => contact.id !== action.payload)
            })
            .addCase(deleteContact.rejected, (state) => {
                state.loading = false
            })
    }

})

export const { clearSelectedContact } = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer
