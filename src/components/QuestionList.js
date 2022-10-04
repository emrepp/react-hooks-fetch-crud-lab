import React, {useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions}) {

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(json => setQuestions(json))
  }, [])

  const renderQuestionItemFactory = () => {
    if(!!questions) {
      let questionNumber = 0;
      return questions.map(currentQuestion => {
        questionNumber += 1;
        return (
          <QuestionItem 
            key={currentQuestion.id} 
            questionNumber={questionNumber} 
            question={currentQuestion} 
            questions={questions} 
            setQuestions={setQuestions} 
          />
        )
      })
    }
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderQuestionItemFactory()}</ul>
    </section>
  );
}

export default QuestionList;