import BCTbox from "../assets/BCTbox.png";
import MCO2box from "../assets/MCO2box.png";
import USDCbox from "../assets/USDCbox.png";
import KLIMAbox from "../assets/KLIMAbox.png";
import NCTbox from "../assets/NCTbox.png";

export function ConversionPanel(props: {
  currentCoin: string;
  currentCarbonType: string;
}) {
  const carbonLogo =
    props.currentCarbonType === "BCT"
      ? BCTbox
      : props.currentCarbonType === "NCT"
      ? NCTbox
      : MCO2box;
  const coinLogo =
    props.currentCoin === "BCT"
      ? BCTbox
      : props.currentCoin === "MCO2"
      ? MCO2box
      : props.currentCoin === "NCT"
      ? NCTbox
      : props.currentCoin === "USDC"
      ? USDCbox
      : KLIMAbox;
  function CoinPanel(props: { coin: string; id: string; logo: string }) {
    return (
      <div className="conversion">
        <img src={props.logo} className="coin-box" alt="coinLogo" />
        <span id={props.id}>0.00</span>
      </div>
    );
  }

  return (
    <div>
      <div className="seperate">
        <p className="input-title">COST</p>
        <p className="input-title">BURNING</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CoinPanel
          logo={coinLogo}
          coin={props.currentCoin}
          id="convertedAmount"
        />
        <span data-tooltip = "This cost includes slippage and the aggregation fee of 1%." className="arrow">→</span>
        <CoinPanel
          logo={carbonLogo}
          coin={props.currentCarbonType}
          id="BCTamount"
        />
      </div>
      <p />
    </div>
  );
}
