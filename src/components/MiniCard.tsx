export function MiniCard(props: {
  title: string;
  symbol: any;
  amount: string;
  subtitle: string;
}) {
  return (
    <div className="mini-card">
      <img className="card-symbol" src={props.symbol} alt=""></img>
      <span style={{ verticalAlign: "top" }}>{props.title}</span>
      <p className="big-number">{props.amount}</p>
      <span className="bct-burned">{props.subtitle}</span>
    </div>
  );
}
