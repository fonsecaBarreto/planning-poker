export type CardsProps = {
  values: number[];
  value: number | null;
  onChange: ( value: any) => void
  block?: boolean
};

export const Hand: React.FunctionComponent<CardsProps> = (props) => {
  const { values, onChange, value, block =false} = props;

  return (
    <>
      <div className={`cards-hand ${block ? "block" : ""}`}>
        <ul>
          {values.map((v, i) => {
            return (
              <li key={i} onClick={() => onChange(v)}>
                <div className={`hand-card ${v === value ? 'selected' : ''} `}>
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
