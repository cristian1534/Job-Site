import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/database/config";

export const fetchProfileById = createAsyncThunk(
  "profile/fetchProfileById",
  async (profileId) => {
    const profileRef = db.collection("profiles").doc(profileId);
    const snapshot = await profileRef.get();
    if (snapshot.exists) {
      const profileData = snapshot.data();
      return { id: snapshot.id, ...profileData };
    }
    throw new Error("Profile not found");
  }
);

const profileSlice = createSlice({
  name: "profileById",
  initialState: {
    profiles: [],
    loading: false,
    error: null,
    currentProfile: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = action.payload;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;