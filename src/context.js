import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const starterUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
const testUrl = 'https://opentdb.com/api.php?amount=50&category=24&difficulty=medium' // This will give no results

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false)



  // For now we will use useEffect so that we have something to work with
  // But afterwards will wire up the fetch to the form button
  useEffect(() => {
    const fetchQuestions = async(url) => {
      setLoading(true); // waiting for the promise to resolve
      setWaiting(false); // we are no longer making a choice in our form
      try {
        const response = await axios.get(url);
        if (response.data.results.length > 0){
          const data = response.data.results
          setQuestions(data)
          setLoading(false)
          setWaiting(false)
          setError(false)
          console.log(data);
        } else {
          setWaiting(true)
          setError(true)
          console.log('No results')
        }
      } catch (err) {
        console.err(err);
        setWaiting(true)
      }
    }
    fetchQuestions(starterUrl)

  }, [error])

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      const updatedIndex = prevIndex + 1
      if (updatedIndex > questions.length - 1){
        // openModal
        return 0
      } else {
        return updatedIndex
      }
    })
  }

  const verifyAnswer = (isCorrect) => {
    if (isCorrect){
      setCorrect((oldTotal) => oldTotal + 1)
    }
    nextQuestion()
  }


  return <AppContext.Provider value={{ waiting, loading, questions, index, correct, error, isModalOpen, nextQuestion, verifyAnswer }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
