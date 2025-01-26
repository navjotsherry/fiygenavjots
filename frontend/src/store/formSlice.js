import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  components: [], // List of form components
};

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
  },
});

export const { addComponent, updateComponent, moveComponent,removeComponent } = formSlice.actions;
export default formSlice.reducer;