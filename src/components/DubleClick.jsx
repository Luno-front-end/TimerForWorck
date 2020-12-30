// import {useState, useCallback, useRef,useEffect} from "react"
 

// function useDoubleClick  (callback) { 
// //   / ** зворотний виклик ref Pattern ** / 
//     const [elem, setElem] = useState(null) 

//     const callbackRef = useCallback((node) => {
//         setElem(node)
//         callbackRef.current = node
//     },[])
    

    
//   const countRef = useRef (0)
// // / ** Посилання на таймер ** / 
//   const timerRef = useRef (null)
// // / ** Вхідний зворотний виклик Ref для зворотного виклику пройдений ** / 
//     const inputCallbackRef = useRef(null) 
    
 
//   useEffect (() => { 
//     inputCallbackRef.current = callback 
//   }) 
   
   
//   return [callbackRef, elem] 
//  }