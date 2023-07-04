import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogFormState {
  text: string;
  selectedImage: File | null;
  selectedImageUrl: string | null;
}

const initialState: BlogFormState = {
  text: "",
  selectedImage: null,
  selectedImageUrl: null,
};

const blogFormSlice = createSlice({
  name: "blogForm",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },

    setSelectedImageUrl: (state, action: PayloadAction<string | null>) => {
      state.selectedImageUrl = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setText, setSelectedImageUrl, resetForm } =
  blogFormSlice.actions;

export default blogFormSlice.reducer;
