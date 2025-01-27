import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverUrl from "../serverURL";
import axios from 'axios'

const initialState = {
  components: [], // List of form components
};

export const saveForm = createAsyncThunk("form/saveForm", async (formData, { rejectWithValue }) => {
  try {

    const response = await axios.post(`${serverUrl}/api/forms/save`, formData,{withCredentials:true});

    if (!response.ok) {
      throw new Error("Failed to save the form");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addComponent: (state, action) => {
      state.components.push(action.payload);
    },
    updateComponent: (state, action) => {
      const { id, updatedAttributes } = action.payload;
      const component = state.components.find((comp) => comp.id === id);
      if (component) {
        component.attributes = { ...component.attributes, ...updatedAttributes };
      }
    },
    moveComponent: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const [removed] = state.components.splice(dragIndex, 1);
      state.components.splice(hoverIndex, 0, removed);
    },
    removeComponent: (state, action) => {
      const { id } = action.payload;
      state.components = state.components.filter((component) => component.id !== id);
    },
    extraReducers: (builder) => {
      builder
        .addCase(saveForm.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(saveForm.fulfilled, (state) => {
          state.status = "succeeded";
        })
        .addCase(saveForm.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  },
});

export const { addComponent, updateComponent, moveComponent,removeComponent } = formSlice.actions;
export default formSlice.reducer;