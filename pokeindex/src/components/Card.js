

const Card = ({ pokemon }) => {
  const { name, img, exp } = pokemon
  console.log("From card", pokemon)
  return (
    <div className="bg-light-green dib br2 pa3 ma2 grow bw2 shadow-5" style={{width: "300px"}}>
      <img alt="Pokemon" src={img} />
      <div>
        <h2>{name}</h2>
        <p>{exp}</p>
      </div>
    </div>
  )
}

export default Card
