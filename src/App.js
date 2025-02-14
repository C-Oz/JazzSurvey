import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, nextPage, saveAnswer, prevPage, resetSurvey } from "./store";
import surveyPages from "./surveyData";

function App() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const page = useSelector((state) => state.survey.page);
  const username = useSelector((state) => state.survey.username);
  const answers = useSelector((state) => state.survey.answers);

  const handleStart = () => {
    if (name.trim()) {
      dispatch(setUsername(name));
      dispatch(nextPage());
    }
  };

  return (
    <div>
      {page === 0 ? (
        <div>
          <h2>Welcome to the Survey</h2>
          <p>Please enter your name to start:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleStart}>Start Survey</button>
        </div>
      ) : (
        <div>
          <h2>Survey</h2>
          <p>Hi {username}, let's begin!</p>
          {surveyPages[page - 1].map((q) => (
            <div key={q.id}>
              <p>{q.question}</p>
              {q.options.map((option) => (
                <label key={option.label} style={{ display: "block", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option.label}
                    onChange={() => dispatch(saveAnswer({ questionId: q.id, answer: option.label }))}
                  />
                  <img src={option.image} alt={option.label} style={{ width: 150, height: 150, margin: "10px" }} />
                  <audio controls>
                    <source src={option.sound} type="audio/midi" />
                    Your browser does not support the audio tag.
                  </audio>
                </label>
              ))}
            </div>
          ))}
          <div>
            {page > 1 && <button onClick={() => dispatch(prevPage())}>Previous</button>}
            {page < surveyPages.length ? (
              <button onClick={() => dispatch(nextPage())}>Next</button>
            ) : (
              <button onClick={() => dispatch(resetSurvey())}>Restart</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
