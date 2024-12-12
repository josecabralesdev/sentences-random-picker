import diceIcon from './assets/icons/dice-3.svg'
import caretRight from './assets/icons/caret-right.svg'
import deleteWordIcon from './assets/icons/backspace.svg'
import { type Sentence } from "./types"
import useWords from './hooks/useWords'
import { useState } from 'react'

const initialSentences: Sentence[] = []

export default function App() {
  const [word, setWord] = useState('')
  const [random, setRandom] = useState('')
  const { words, addNewWord, deleteWord } = useWords(initialSentences)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
  }

  const handleRandomWord = () => {
    const randomWord = Math.floor(Math.random() * words.length)
    setRandom(words[randomWord].content)
  }

  return (
    <div className="max-w-full min-h-screen bg-gradient-to-tr from-[#e3bfc3] via to-[#dd7a83] flex flex-col justify-around items-start px-6 py-2 gap-20 overflow-hidden">
      <h1 className='text-slate-800 text-4xl font-semibold italic'>Seleccionador aleatorio de palabras</h1>

      <div className='flex items-center'>
        <input
          className='bg-slate-200 bg-opacity-20 p-1 rounded-l-md text-slate-800 text-2xl font-semibold w-2/3 h-12'
          value={random}
          id='random'
          readOnly
        />
        <img
          className='bg-slate-200 size-12 rounded-r-md bg-opacity-80 w-1/4 py-1'
          onClick={handleRandomWord}
          src={diceIcon}
          alt='dice icon'
        />
      </div>

      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-5'>
          <label className='text-2xl font-semibold underline' htmlFor='search'>Nueva palabra</label>
          <div className='flex items-center'>
            <input
              className='bg-slate-200 bg-opacity-20 p-1 rounded-l-md text-slate-800 text-2xl font-semibold w-2/3 h-12'
              autoFocus
              id='search'
              value={word}
              onChange={handleChange}
            />
            <img
              className='cursor-pointer bg-slate-200 size-12 rounded-r-md bg-opacity-80 w-1/4 py-1'
              onClick={() => addNewWord(word)}
              src={caretRight}
              alt='caret right icon'
            />
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <h2 className='text-2xl font-semibold underline'>Lista de palabras</h2>
          <div className='border-2 border-slate-800 rounded p-2 bg-slate-200 bg-opacity-20 flex flex-wrap gap-3 justify-center items-center'>
            {words && words.map((word: Sentence) => (
              <div className='bg-pink-500 flex gap-1 justify-center items-center p-2 rounded-2xl text-center' key={word.id}>
                <span className='text-white text-xl font-medium'>{word.content}</span>
                <img
                  className='size-8'
                  onClick={() => deleteWord(word.id)}
                  src={deleteWordIcon}
                  alt='backspace icon'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
