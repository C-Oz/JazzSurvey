import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, nextPage, prevPage, recordAnswer, resetSurvey } from "./store";
import surveyData from "./surveyData";

const App = () => {
  const dispatch = useDispatch();
  const { username, currentPage, responses } = useSelector(
    (state) => state.survey
  );

  // Reset & Start Over
  const handleRestart = () => {
    localStorage.clear();
    dispatch(resetSurvey());
  };

  // Landing Page
  if (currentPage === 0) {
    return (
      <div>
        <h1>Welcome to the Survey</h1>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />

        <button onClick={() => dispatch(nextPage()) } disabled={!username}>Start</button>
      </div>
    );
  }

  // Survey Finished Page
  if (currentPage >= surveyData.length + 1) {
    return (
      <div>
        <h2>Thank you for completing the survey, {username}!</h2>
        <button onClick={handleRestart}>Restart</button>
      </div>
    );
  }

  // Get Current Question
  const currentQuestion = surveyData[currentPage - 1];

  return (
    <div>
      <h2>Question {currentPage} of {surveyData.length}</h2>
      <p>{currentQuestion.question}</p>

      {/* Render different question types */}
      {currentQuestion.type === "imagePair" && (
        <div>
          {currentQuestion.options.map((option) => (
            <label key={option.id}>
              <input
                type="radio"
                name={`question-${currentPage}`}
                value={option.id}
                checked={responses[currentPage] === option.id}
                onChange={() =>
                  dispatch(recordAnswer({ page: currentPage, answer: option.id }))
                }
              />
              <img src={option.image} alt={`Option ${option.id}`} width="100" />
            </label>
          ))}
        </div>
      )}

      {currentQuestion.type === "imageSound" && (
        <div>
          <img src={currentQuestion.image} alt="Question Image" width="200" />
          <audio controls>
            <source src={currentQuestion.sound} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div>
            {currentQuestion.options.map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name={`question-${currentPage}`}
                  value={value}
                  checked={responses[currentPage] === value}
                  onChange={() =>
                    dispatch(recordAnswer({ page: currentPage, answer: value }))
                  }
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        {currentPage > 0 && <button onClick={() => dispatch(prevPage())}>Back</button>}
        <button onClick={() => dispatch(nextPage())} disabled={!responses[currentPage]}>
          Next
        </button>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
};

export default App;
