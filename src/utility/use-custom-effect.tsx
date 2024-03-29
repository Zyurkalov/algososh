import { useEffect } from "react";

export const useCustomEffect =(customFunction: () => void, status: boolean, key: string = "Enter") => {
    useEffect(() => {
        const handleKeyPressEnter = (event:KeyboardEvent) => {
          if(event.key === key && !status) {
            customFunction()
          }
        }
        document.addEventListener('keydown', handleKeyPressEnter)
        return () => {
          document.removeEventListener('keydown', handleKeyPressEnter)
        }
      },[customFunction])
}