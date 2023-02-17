import s from './style.module.css'

export const CardGame = ({name, img, description}) => {
    return (<div className={s.game}>
        <img src={img} alt={description} className={s.img} />
        <div className={s.name}>{name}</div>
        <div className={s.description}>{description}</div>
    </div>)
}