import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = "info" | "success" | "error";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.items.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
    clearNotifications(state) {
      state.items = [];
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
