import { useState } from "react"

export type CardsProps = {
    values: number[]
}

export const Cards: React.FunctionComponent<CardsProps> = (props) => {
    const { values } = props
    const [ selected, setSelected ]= useState(null);
    return (
      <div className="cards-table">
        <ul>
          {values.map((v, i) => {
            return (
              <li key={i} onClick={() => setSelected(v)}>
                <div className="table-card">
                  <span> {v}</span>
                </div>
              </li>
            );
          })}
        </ul>
        {JSON.stringify(selected)}
      </div>
    );
}