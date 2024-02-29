
import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [inputString, setInputString] = useState("Hi there. My name is Sam. This is my lucky day. I like coding so much. This is it.");
  const [skipLastNWords, setSkipLastNWords] = useState(2);
  const [output, setOutput] = useState("");

  const reverseSentences = () => {
    const sentences = inputString.match(/[^.!?]+[.!?]*/g) || [];

    const reversedSentences = sentences.map(sentence => {
      // Capture trailing spaces and punctuation
      const match = sentence.match(/([\s]*[.!?]+)$/);
      const endPunctuation = match ? match[0] : '';

      // Remove the trailing spaces and punctuation for processing
      const trimmedSentence = sentence.replace(/[\s]*[.!?]+$/, '');
      const words = trimmedSentence.split(' ');

      const wordsToReverse = skipLastNWords === 0 ? words : words.slice(0, -skipLastNWords);
      const wordsToKeep = skipLastNWords === 0 ? [] : words.slice(-skipLastNWords);

      const reversed = wordsToReverse.reverse().join(' ');

      // Combine the reversed part with the wordsToKeep part and add back the end punctuation
      return `${reversed}${wordsToKeep.length > 0 ? ' ' + wordsToKeep.join(' ') : ''}${endPunctuation}`;
    });

    // Join the reversed sentences without adding extra spaces
    setOutput(reversedSentences.join(''));
  };

  return (
    <div className='main'>
      <h2>String Manipulation Tool</h2>
      <label htmlFor="inputString">Input String:</label><br />
      <textarea
        id='inputString'
        rows="4"
        cols="37"
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
      /><br />

      <label htmlFor="skipLastNWords">Skip last </label>
      <input
        id='skipCount'
        type="number"
        value={skipLastNWords}
        onChange={(e) => {
          const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
          setSkipLastNWords(Number.isNaN(value) ? 0 : value);
        }}

      />
      <label> words in a sentence.</label><br /><br />

      <button className='btn' onClick={reverseSentences}>Run</button><br /><br />

      <label htmlFor="output">Output:</label><br />
      <textarea
        id='inputString'
        rows="4"
        cols="39"
        value={output}
        readOnly
      />
    </div>
  );
}

export default App;