import { useEffect } from "react";

export const useCustomEffect =(customFunction: () => void, status :boolean) => {
    useEffect(() => {
        const handleKeyPressEnter = (event:KeyboardEvent) => {
          if(event.key === 'Enter' && !status) {
            customFunction()
          }
        }
        document.addEventListener('keydown', handleKeyPressEnter)
        return () => {
          document.removeEventListener('keydown', handleKeyPressEnter)
        }
      },[customFunction])
}