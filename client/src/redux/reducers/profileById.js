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

export const updateProfileById = createAsyncThunk(
  "profile/updateProfileById",
  async ({ profileId, newData }) => {
    const profileRef = db.collection("profiles").doc(profileId);
    const snapshot = await profileRef.get();
    if (snapshot.exists) {
      await profileRef.update(newData);
      return { id: snapshot.id, ...newData };
    }
    throw new Error("Profile not found");
  }
);

export const deleteProfileById = createAsyncThunk(
  "profile/deleteProfileById",
  async (profileId) => {
    const profileRef = db.collection("profiles").doc(profileId);
    const snapshot = await profileRef.get();
    if (snapshot.exists) {
      await profileRef.delete();
      return profileId;
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
      })
      .addCase(deleteProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = state.profiles.filter(
          (profile) => profile.id !== action.payload
        );
      })
      .addCase(deleteProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.profiles.findIndex(
          (profile) => profile.id === action.payload.id
        );
        if (index !== -1) {
          state.profiles[index] = action.payload;
          state.currentProfile = action.payload;
        }
      })
      .addCase(updateProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
