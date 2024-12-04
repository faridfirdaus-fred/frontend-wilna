import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: UIState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
