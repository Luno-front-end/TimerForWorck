import s from "./Button.module.css"
export default function Button({ children, onClick }) {
   return   <button className={s.button} type="button" onClick={onClick}>
             {children}
      </button>
}