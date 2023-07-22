import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/database/config";

export const fetchMessages = createAsyncThunk(
  "contact/fetchMessages", 
  async () => {
    const messagesRef = db.collection("messages");
    const snapshot = await messagesRef.get();
    const messages = snapshot.docs.map((doc) => doc.data());
    return messages;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
