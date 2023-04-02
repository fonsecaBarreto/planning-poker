export type CardsProps = {
    total: number
}

export const Cards: React.FunctionComponent<CardsProps> = (props) => {
    const { total } = props
    return (
      <div className="cards-table">
        <ul>
          {[...Array(total)].map((_, i) => {
            return <li key={i}> Carta {i}</li>;
          })}
        </ul>
      </div>
    );
}