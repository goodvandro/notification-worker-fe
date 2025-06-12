import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Message,
  PaginatedResponse,
} from "../features/messages/message.type";

interface State {
  items: Message[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const initialState: State = {
  items: [],
  meta: {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  },
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.items = action.payload;
    },
    updateMessageStatus(state, action: PayloadAction<Message>) {
      const updated = action.payload;
      const index = state.items.findIndex((m) => m.id === updated.id);
      if (index >= 0) {
        state.items[index].status = updated.status;
      }
    },
    setPaginatedMessages(
      state,
      action: PayloadAction<PaginatedResponse<Message>>
    ) {
      state.items = action.payload.items;
      state.meta = action.payload.meta;
    },
  },
});
export const { setMessages, updateMessageStatus, setPaginatedMessages } =
  messageSlice.actions;
export default messageSlice.reducer;
