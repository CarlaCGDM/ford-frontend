import React, {useState, useEffect} from 'react';

function Child(props) {

    const [newWord, setNewWord] = useState('');
    useEffect(() => {
        props.changeWord(newWord)
    },[newWord]);

    return (
        <div className="child">
            <h1>{newWord}</h1>
            <input type="text" onChange={(e) => {setNewWord(e.target.value)}}></input>
            <button onClick={() => props.changeWord(newWord)}>Click to change title.</button>
        </div>
    );
}

export default Child;