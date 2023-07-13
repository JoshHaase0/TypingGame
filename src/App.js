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


// import React, { useEffect, useState } from 'react';
// import './App.css';
// const App = () => {
//   const input = document.getElementsByClassName("main-input")[0];
//   const initialGameState = {
//     started: false,
//     victory: false,
//     startTime: null,
//     endTime: null,
//     errors: null,
//     wpm: null
//   };
  

  
//   const buttonTextItems = [
//     'Editing is a growing field of work in the service industry. Paid editing services may be provided by specialized editing firms or by self-employed (freelance) editors. Editing firms may employ a team of in-house editors, rely on a network of individual contractors or both.',
//     'Many touch typists also use keyboard shortcuts or hotkeys when typing on a computer. This allows them to edit their document without having to take their hands off the keyboard to use a mouse.',
//     'One morning my friend and I were thinking about how we could plan our summer break away from school. Driving from our own state to several nearby states would help to expand our limited funds.'
//   ];

//   const [snippet, setSnippet] = useState(buttonTextItems[Math.floor(Math.random() * buttonTextItems.length)]);
//   const [userText, setUserText] = useState('');
//   const [gameState, setGameState] = useState(initialGameState);
//   const [percentFinished, setPercentFinished] = useState(0.0);

//   useEffect(() => {
//     document.title = `${ (gameState.victory) ? 'You won!' : 'Keep going!'}`;
//   }, [gameState.victory])


//   const updateUserText = e => {
//     if (!gameState.started) {
//       console.log("started");
//       setGameState({
//         ...gameState,
//         started: true,
//         startTime: new Date().getTime()
//       });
//     }
//     setUserText(e.target.value);
//     setPercentFinished((userText.length < snippet.length) ? Math.floor(userText.length / (snippet.length - 1) * 100) : 100);
//     if (e.target.value.length >= snippet.length && !gameState.victory) {
//       input.readOnly = true;
//       setGameState({
//         ...gameState,
//         victory: true,
//         endTime: Number((new Date().getTime() - gameState.startTime) / 1000).toFixed(2),
//         errors: userText.split("").filter((_, i) => _ !== snippet[i]).length,
//         wpm: Number(((userText.split(" ").length) - (userText.split("").filter((_, i) => _ !== snippet[i]).length)) / ((Number((new Date().getTime() - gameState.startTime) / 1000).toFixed(2)) / 60)).toFixed(2)
//       });
//     }
//   };
//   const chooseSnippet = index => {
//     input.focus();
//     input.readOnly = false;
//     clearInterval();
//     setUserText('');
//     setSnippet(buttonTextItems[index]);
//     setGameState(initialGameState);
//     setPercentFinished(0);
//   }

//   return (
//     <div>
//       <h2>TypeRace</h2>
//       <hr />
//       <div className = { "snippet" }>{
//             snippet.split("").map((_, i) => {
//             if (i === userText.length) {
//               return <span className="highlight">{_}</span> 
//             } else if (userText[i] === _ && i < userText.length) {
//               return <span className="correct">{_}</span>
//             } else if (userText[i] !== _ && i < userText.length) {
//               return <span className="incorrect">{_}</span>
//             } else {
//               return _;
//             }
//           })}
//       </div>
//       <h4 className={ 'stats' }>{gameState.victory ? `Time: ${ gameState.endTime }s Errors: ${ gameState.errors } WPM: ${ gameState.wpm }` : null}</h4>
//       <div className= { 'main-input-wrapper' }><input
//         readOnly = { false }
//         className= { 'main-input' }
//         autoFocus
//         value = { userText }
//         onChange = { updateUserText }
//       /></div>
//       <div id="progress-bar-wrapper"><div id="progress-bar" style={{width: percentFinished + "%"}}></div></div>
//       <hr />
//       { buttonTextItems.map((_, i) => <button onClick={ () => chooseSnippet(i) }>Option { i + 1 }</button>)}
//     </div>
//   );
// };

// export default App;