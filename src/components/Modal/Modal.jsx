import s from './style.module.css'

export const Modal = ({ openModal, children }) => {
  return (
    <div className={s.modal}>
      <div className={s.content}>
        <div onClick={() => openModal(false)} className={s.cross}>
         ☒
        </div>
        {children}
      </div>
    </div>
  )
}


