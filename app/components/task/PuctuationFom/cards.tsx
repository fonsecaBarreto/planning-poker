export type CardsProps = {
  values: number[];
  value: number | null;
  onChange: ( value: any) => void
  block?: boolean
};

export const Cards: React.FunctionComponent<CardsProps> = (props) => {
  const { values, onChange, value, block =false} = props;
  return (
    <>
      <div className={`cards-table ${block ? "block" : ""}`}>
        <ul>
          {values.map((v, i) => {
            return (
              <li key={i} onClick={() => onChange(v)}>
                <div className={`table-card ${v === value ? 'selected' : ''} `}>
                  <span> {v}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
