import { toast } from "sonner";
import { type Sentence } from "../types";
import useLocalStorage from "./useLocalStorage";

const useWords = (initialState: Sentence[]) => {
  const [words, setWords] = useLocalStorage('words', initialState)

  const addNewWord = (content: string) => {
    const newWord: Sentence = {
      id: Date.now(),
      content: content
    }

    const repeated = words.find((word: Sentence) => word.content === content)
    if (repeated || content === '') {
      toast.error('Esta palabra ya se encuentra en la lista o intentas agregar espacios vacíos')
      return
    } else {
      setWords([...words, newWord])
      toast.success('La palabra ha sido agregada a la lista')
    }
  }

  const deleteWord = (wordId: number) => {
    setWords(words.filter((word: Sentence) => word.id !== wordId))
  }

  return { words, addNewWord, deleteWord }
}

export default useWords