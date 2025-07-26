import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "@/store/slices/notificationsSlice";
import modalsReducer from "@/store/slices/modalsSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    modals: modalsReducer,
  },
});
