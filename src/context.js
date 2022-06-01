import React, { useState, useContext } from "react";
import axios from "axios";

const categoryTable = {
	sports: 21,
	history: 23,
	politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

// const starterUrl = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
// const testUrl = "https://opentdb.com/api.php?amount=50&category=24&difficulty=medium"; // This will give no results

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [waiting, setWaiting] = useState(true);
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [index, setIndex] = useState(0);
	const [correct, setCorrect] = useState(0);
	const [error, setError] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [startQuiz, setStartQuiz] = useState({
		amount: 10,
		category: "sports",
		difficulty: "easy",
	});

	const { amount, category, difficulty } = startQuiz;
	const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
	console.log(url);


	const nextQuestion = () => {
		setIndex((prevIndex) => {
			const updatedIndex = prevIndex + 1;
			if (updatedIndex > questions.length - 1) {
				openModal();
				return 0;
			} else {
				return updatedIndex;
			}
		});
	};

	const verifyAnswer = (isCorrect) => {
		if (isCorrect) {
			setCorrect((oldTotal) => oldTotal + 1);
		}
		nextQuestion();
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setWaiting(true);
		setCorrect(0);
	};

	const handleQuizChange = (e) => {
		console.log(e.target.value);
		const { name, value } = e.target;
		setStartQuiz((prevValues) => ({ ...prevValues, [name]: value }));
	};
	const handleQuizSubmit = (e) => {
    // no refreshes plz
		e.preventDefault();
    // construct our api url
		const { amount, category, difficulty} = startQuiz;
		const catNum = categoryTable[category];
    console.log(`Amount ${amount}, category ${category}, difficulty ${difficulty}`)
    console.log(`catNum is ${catNum}`)
		const url = `${API_ENDPOINT}amount=${amount}&category=${catNum}&difficulty=${difficulty}&type=multiple`;
    // fetch!
		const fetchQuestions = async (url) => {
			setLoading(true); // waiting for the promise to resolve
			setWaiting(false); // we are no longer making a choice in our form
			try {
				const response = await axios.get(url);
				if (response.data.results.length > 0) {
					const data = response.data.results;
					setQuestions(data);
					setLoading(false);
					setWaiting(false);
					setError(false);
					console.log(data);
				} else {
					setWaiting(true);
					setError(true);
					console.log("No results");
				}
			} catch (err) {
				console.err(err);
				setWaiting(true);
			}
		};

		fetchQuestions(url);
	};

	return (
		<AppContext.Provider
			value={{
				waiting,
				loading,
				questions,
				index,
				correct,
				error,
				isModalOpen,
				nextQuestion,
				verifyAnswer,
				closeModal,
				handleQuizChange,
				handleQuizSubmit,
				startQuiz,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
