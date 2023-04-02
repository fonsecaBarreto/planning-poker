export function MessageContainer ({ socketId, message }: any)  {
  const { from, payload } = message;
  const itsMe = from === socketId;
  return (
    <div className="message-container" style={{ color: itsMe ?'#0a2fab' : '#aa0606' }}>
      <span>
        {socketId} - {from == socketId ? "Você" : from}
      </span>
      <br />
      <span>{payload}</span>
    </div>
  );
};
