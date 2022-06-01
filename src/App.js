import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
	const { waiting, loading, questions, index, correct, nextQuestion, verifyAnswer } = useGlobalContext();

	if (waiting) {
		return <SetupForm />;
	}

	if (loading) {
		return <Loading />;
	}

	const { question, incorrect_answers, correct_answer } = questions[index];

	// const allAnswers = [correct_answer, ...incorrect_answers];
  let allAnswers = [...incorrect_answers];
  // Get a random index between 0-3 to decide where to insert our correct answer
  const randIndex = Math.floor(Math.random() * 3)
  // Push the answer at this randomIndex position at the back of the array (which will double it)
  allAnswers.push(allAnswers[randIndex])
  // Now we have two incorrect answers that are the same. Replace the first one with the correct answer
  allAnswers[randIndex] = correct_answer

	return (
		<main>
			{<Modal />}
			<section className='quiz'>
				<p className='correct-answers'>
					correct answers : {correct}/{index}
				</p>
				{/* This will allow us to see the correct characters - do not use this if the user is submitting it (i.e. via form) */}
				<article className='container'>
					<h2 dangerouslySetInnerHTML={{ __html: question }} />
					<div className='btn-container'>
						{allAnswers.map((answer, idx) => (
							<button
								className="answer-btn"
								key={idx}
                onClick={() => verifyAnswer(answer === correct_answer)}
								dangerouslySetInnerHTML={{ __html: answer }}
							/>
						))}
					</div>
				</article>
				<button onClick={nextQuestion} className='next-question'>
					Next Question
				</button>
			</section>
		</main>
	);
}

export default App;
