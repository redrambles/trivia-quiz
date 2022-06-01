import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
	const { startQuiz, handleQuizSubmit, handleQuizChange, error } = useGlobalContext();
	return (
		<main>
			<section className='quiz quiz-small'>
				<form className='setup-form'>
					<div className='form-control'>
						<label htmlFor='amount'>number of questions</label>
						<input
							className='form-input'
							type='number'
							name='amount'
							id='amount'
							value={startQuiz.amount}
							onChange={handleQuizChange}
							min={1}
							max={50}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='category'>Category</label>
						<select className='form-input' name='category' id='category' value={startQuiz.category} onChange={handleQuizChange}>
							<option value='sports'>sports</option>
							<option value='history'>history</option>
							<option value='politics'>politics</option>
						</select>
					</div>
					<div className='form-control'>
						<label htmlFor='difficulty'>Difficulty</label>
						<select className='form-input' name='difficulty' id='difficulty' value={startQuiz.difficulty} onChange={handleQuizChange}>
							<option value='easy'>easy</option>
							<option value='medium'>intermediate</option>
							<option value='hard'>challenging</option>
						</select>
					</div>
					{error && <p className='error'>Unable to comply - please try different options.</p>}
					<button className='submit-btn' type='submit' onClick={handleQuizSubmit}>
						Start
					</button>
				</form>
			</section>
		</main>
	);
};

export default SetupForm;
