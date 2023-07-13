import React, { useEffect, useState} from "react";
import './App.css';
import SelectorButton from "./SelectorButton";
import SnippetSelector from "./SnippetSelector";


function App() {
    const buttonTextItems = [
        'Bears, beats, battlestar galactica',
        'What\'s Forrest Gumps\'s password? 1Forrest1',
        'Where do programmers like to hang out? The Foo Bar'
    ];
    const initialGameState = {
        victory: false,
        startTime: null,
        endTime: null
    };
    const [userText, setUserText] = useState('');
    const [snippet, setSnippet] = useState('');
    const [gameState, setGameState] = useState(initialGameState);
    const [wins, setWins] = useState(1);
    const [hasError, setHasError] = useState(false);
    const [films, setFilms] = useState([]);
    const [wpm, setWpm] = useState(0);

    const userInput = document.getElementById("user-input");

    const fetchData = async () => {
      const response = await fetch("https://ghibliapi.vercel.app/films?limit=3");
      response
        .json()
        .then(response => setFilms(response))
        .catch(setHasError(true));
    }

    const updateWins = async () => await setWins(wins + 1);
    const updateWpm = async () => await setWpm(((userText.split(" ").length) / 5) / (gameState.endTime / 1000 / 60));

    useEffect(() => {
      fetchData();
    }, []);
    
    useEffect(() => {
      if (gameState.victory) { updateWins(); }
      document.title = `${(gameState.victory) ? `You won! ${wins} Time: ${(gameState.endTime / 1000).toFixed(2)}s ${wpm}/WPM` : 'Keep trying...'}`;
    }, [gameState.victory]);
    
    const updateUserText = (e) => {
      setUserText(e.target.value);

      if (e.target.value === snippet) {
        setGameState({
          ...gameState,
          victory: true,
          endTime: new Date().getTime() - gameState.startTime
        });
      }
    };

    const chooseSnippet = (selectedSnippet) => {
      setSnippet(selectedSnippet);
      setGameState({
        ...gameState,
        startTime: new Date().getTime()
      });
      userInput.focus();
    }

    return (
      <div>
        <h2>TypeRace</h2>
        <hr />
        <h2>Snippet</h2>
        <div className = { "snippet" }>{
            snippet.split("").map((_, i) => {
            if (i === userText.length) {
              return <span className="highlight">{_}</span> 
            } else if (userText[i] === _ && i < userText.length) {
              return <span className="correct">{_}</span>
            } else if (userText[i] !== _ && i < userText.length) {
              return <span className="incorrect">{_}</span>
            } else {
              return _;
            }
          })}
      </div>
        <input type="text" value={userText} onChange={updateUserText} id="user-input" data-testid="input"></input>
        <SnippetSelector chooseSnippet={chooseSnippet} films={films}/>
      </div>
    )
}

export default App;