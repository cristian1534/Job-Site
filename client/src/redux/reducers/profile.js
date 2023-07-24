import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/database/config";

export const fetchProfiles = createAsyncThunk("profile/fetchProfiles", async () => {
  const profilesRef = db.collection("profiles");
  const snapshot = await profilesRef.get();
  const profiles = snapshot.docs.map((doc) => {
    const profileData = doc.data();
    return { id: doc.id, ...profileData };
  });
  return profiles;
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
