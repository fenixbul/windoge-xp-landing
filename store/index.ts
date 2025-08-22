import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "@/store/slices/connectionSlice";
import walletReducer from "@/store/slices/walletSlice";
import notificationsReducer from "@/store/slices/notificationsSlice";
import modalsReducer from "@/store/slices/modalsSlice";
import systemReducer from "@/store/slices/systemSlice";
import userReducer from "@/store/slices/userSlice";

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    wallet: walletReducer,
    notifications: notificationsReducer,
    modals: modalsReducer,
    system: systemReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
