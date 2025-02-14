import { configureStore, createSlice } from "@reduxjs/toolkit";

// Load saved state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("surveyState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    return undefined;
  }
};

const initialState = loadState() || {
  username: "",
  page: 0,
  answers: {},
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      state.page -= 1;
    },
    saveAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    resetSurvey: (state) => {
      state.username = "";
      state.page = 0;
      state.answers = {};
    },
  },
});

export const { setUsername, nextPage, prevPage, saveAnswer, resetSurvey } = surveySlice.actions;

const store = configureStore({
  reducer: {
    survey: surveySlice.reducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("surveyState", JSON.stringify(store.getState().survey));
});

export default store;
