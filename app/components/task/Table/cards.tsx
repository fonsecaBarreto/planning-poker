import { useMemo } from "react";

export type CardsProps = {
  values: number[];
  onChange?: ( value: any) => void
  block?: boolean
};
export const Cards: React.FunctionComponent<CardsProps> = (props) => {
  const { values, block =false} = props;

  const observableCards = useMemo(()=>{
    return [ ...values, 0, 0, 0];
  },[ values])
  return (
    <>
      <div className={`cards-table ${block ? "" : ""}`}>
        <ul>
          {observableCards.map((v, i) => {
            return (
              <li key={i}>
                <div className={`table-card  ${v != 0 ? "filled" : ""}`}>
                  <span> {v == 0 ? "" : v}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
