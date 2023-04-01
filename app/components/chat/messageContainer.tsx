export function MessageContainer ({ socketId, message }: any)  {
  const { from, payload } = message;
  const itsMe = from === socketId;
  return (
    <div className="message-container" style={{ backgroundColor: itsMe ?'#dfd' : '#edd' }}>
      <span>
        {socketId} - {from == socketId ? "Você" : from}
      </span>
      <br />
      <span>{payload}</span>
    </div>
  );
};
