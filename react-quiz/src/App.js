import React, { useEffect , useReducer } from 'react'
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './components/NextButton'
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';

const SECS_PER_QUESTION = 20

function reducer(state , action) {
  switch (action.type) {
    case 'dataReceived' : 
      return { ...state , questions: action.payload , status: 'ready'}
    case 'dataFailed' : 
      return { ...state , status: 'error'}
    case 'start' :
      return { ...state , status: 'active' , index: 0 , points: 0 , answer: null , secondsRemaining: state.questions.length * SECS_PER_QUESTION}
    case 'newAnswer' : 
      const question = state.questions.at(state.index)
      return { ...state , answer: action.payload , points: action.payload === question.correctOption ? state.points + question.points : state.points, }
    case 'nextQuestion' : 
      return { ...state , index: state.index + 1 , answer: null}
    case 'finished' :
      return { ...state , status: 'finished' , highscore: state.points > state.highscore ? state.points : state.highscore}
    case 'tick' : 
      return { ...state , secondsRemaining: state.secondsRemaining - 1 , status: state.secondsRemaining === 0 ? 'finished' : state.status}

    default:
      throw new Error('Invalid action')
  }

}

const initialState = {
  questions: [], 
  status: 'loading', // loading, ready, error , active , finished 
  index: 0,
  answer: null,
  points: 0,
  highscore: 0 ,
  secondsRemaining: null,
}



export default function App() {

  const [{questions,status,index, answer , points , highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState)
  const questionsLength = questions.length
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)


  useEffect( () => {
    async function fetchQuestions() {
      try {
      const response = await fetch('http://localhost:9000/questions')
      const data = await response.json()
      dispatch({type: 'dataReceived' , payload : data})
      } catch (error) {
        dispatch({type: 'dataFailed'})
      }
    }
    fetchQuestions()
  },[])



  return (
    <div style={{display: "flex" , flexDirection: "column" , justifyContent: "center" , alignItems: "center"}}>
      <Header/>
      <Main>
       {status === 'loading' && <Loader/>}
       {status === 'error' && <Error/>}
       {status === 'ready' && <StartScreen questionsLength={questionsLength} dispatch = {dispatch} />}
       {status === 'active' && (
        <>
          <Progress index={index} questionsLength={questionsLength} points={points} maxPoints = {maxPoints} answer={answer}/>
          <Question question={questions[index]} dispatch= {dispatch} answer={answer}/>
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
            <NextButton dispatch={dispatch} answer={answer}  questionsLength={questionsLength} index={index}/>
          </Footer>
        </>
        )}
        {status === 'finished' && <FinishScreen points={points} maxPoints={maxPoints} dispatch={dispatch} highscore={highscore}/>}
      </Main>
    </div>
  )
}
