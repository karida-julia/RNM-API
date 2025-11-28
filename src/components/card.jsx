import s from './card.module.css'


export const Card = ({image, name, species}) => {
    return(
        <>
        
              <img src={image} alt={name}/>
              <h2>{name}</h2>
              <p>{species}</p>
        </>
    )
}