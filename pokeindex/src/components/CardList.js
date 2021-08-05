import Card from './Card'


const CardList = ({ pokemon }) => {
  return (
    <div>
      {
        pokemon.map(pmon => {
          return <Card pokemon={pmon} />
        })
      }
    </div>
  )
}

export default CardList
