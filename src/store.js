import { configureStore, createSlice } from "@reduxjs/toolkit";

// Try loading persisted state
const persistedState = localStorage.getItem("reduxState");

let initialState;
try {
  initialState = persistedState ? JSON.parse(persistedState) : undefined;
} catch (error) {
  console.error("Corrupt local storage detected, resetting state...");
  localStorage.clear();
  initialState = undefined;
}

// Define survey slice
const surveySlice = createSlice({
  name: "survey",
  initialState: initialState || {
    username: "",
    currentPage: 0,
    responses: {},
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    prevPage: (state) => {
      if (state.currentPage > 0) state.currentPage -= 1;
    },
    recordAnswer: (state, action) => {
      const { page, answer } = action.payload;
      state.responses[page] = answer;
    },
    resetSurvey: () => ({
      username: "",
      currentPage: 0,
      responses: {},
    }),
  },
});

// Save state to local storage on changes
const store = configureStore({
  reducer: { survey: surveySlice.reducer },
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState().survey));
});

// Export actions and store
export const { setUsername, nextPage, prevPage, recordAnswer, resetSurvey } =
  surveySlice.actions;
export default store;
