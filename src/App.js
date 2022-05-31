import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const { waiting, loading, questions, index, correct} = useGlobalContext();

  if(waiting) {
    return <SetupForm />
  }

  if (loading){
    return <Loading />
  }

  const {question, incorrect_answers, correct_answer} = questions[0]

  const allAnswers = [correct_answer, ...incorrect_answers]
  console.log(allAnswers)

  return (
    <main>
      { /* <Modal /> */}
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        {/* This will allow us to see the correct characters - do not use this if the user is submitting it (i.e. via form) */}
        <article className="container">
          <h2 dangerouslySetInnerHTML={{__html: question}} />
          <div className="btn-container">
          {allAnswers.map((answer, idx) => (
            <button key={idx} className="answer-btn" dangerouslySetInnerHTML={{__html: answer}}/>
          ))}
          </div>
        </article>
      </section>

    </main>
  )
}

export default App
