
import React from "react";

function QuestionItem({ question, questions, setQuestions, questionNumber }) {
  const { id, prompt, answers, correctIndex } = question;

  // Long form:
  // const id = question.id
  // const prompt = question.prompt
  // const answers = question.answers
  // const correctIndex = question.correctIndex

  const thisQuestionURL = "http://localhost:4000/questions/" + id

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const deleteQuestion = () => {
    fetch(thisQuestionURL, {
      method: 'DELETE'
    })
    .then(() => {
      setQuestions(questions.filter(eachQuestion => {
        return eachQuestion.id !== id
      }))
    })
  }

  const updateQuestionWithCorrectIndexAPI = (event) => {
    fetch(thisQuestionURL, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: event.target.value
      })
    })
    .then(response => response.json())
    .then(json => updateQuestionWithCorrectIndexState(json))
  }

  const updateQuestionWithCorrectIndexState = (currentQuestion) => {
    let currentQuestionIndex = questions.findIndex(question => question.id === currentQuestion.id)
    let spreadQuestions = [...questions]
    spreadQuestions.splice(currentQuestionIndex, 1, currentQuestion)
    setQuestions(spreadQuestions)
  }

  return (
    <li>
      <h4>Question {questionNumber}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={updateQuestionWithCorrectIndexAPI} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
