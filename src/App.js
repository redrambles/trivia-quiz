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

	const shuffle = (arr) => {
		return arr.sort(() => Math.random() - 0.5);
	};

	const allAnswers = [correct_answer, ...incorrect_answers];

	return (
		<main>
			{/* <Modal /> */}
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
								className={answer === correct_answer ? "red answer-btn" : "answer-btn"}
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
