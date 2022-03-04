import {
  BCTcontractAddress,
  USDCcontractAddress,
  KLIMAcontractAddress,
  sKLIMAcontractAddress,
  wsKLIMAcontractAddress,
  MCO2contractAddress,
  NCTcontractAddress
} from "../contracts";

import BCTbox from "../assets/BCTbox.png";
import MCO2box from "../assets/MCO2box.png";
import USDCbox from "../assets/USDCbox.png";
import KLIMAbox from "../assets/KLIMAbox.png";
import NCTbox from "../assets/NCTbox.png";

function ModalSelector(props: {
  logo: string;
  setCurrentCoin: (c: string) => void;
  setCoinModal: (b: boolean) => void;
  setSourceToken: (s: string) => void;
  setPoolToken: (a: string) => void;
  setCarbonType: (a: string) => void;
  balance: number;
  isSelected: boolean;
  coin: string;
  coinAddress: string;
}) {
  return (
    <button
      style={{ backgroundColor: props.isSelected ? "#4A4A4A" : "#303030" }}
      className="select-coin-button"
      onClick={() => {
        props.setCurrentCoin(props.coin);
        props.setCoinModal(false);
        props.setSourceToken(props.coinAddress);
        if (props.coin === "BCT" || props.coin === "MCO2" || props.coin === "NCT") {
          props.setPoolToken(props.coinAddress);
          props.setCarbonType(props.coin);
        }
      }}
    >
      <img className="coin-box" src={props.logo} alt="CoinLogo" />
      <div className="coin-details">
        <div className="coin-name">{props.coin}</div>
        <div className="coin-balance">
          {props.balance.toFixed(4) + " " + props.coin}
        </div>
      </div>
    </button>
  );
}

export function CoinModal(props: {
  currentCoin: string;
  setModalOpen: (b: boolean) => void;
  setSourceToken: (adress: string) => void;
  setCurrentCoin: (coin: string) => void;
  setPoolToken: (a: string) => void;
  setCarbonType: (a: string) => void;
  BCTbalance: number;
  USDCbalance: number;
  KLIMAbalance: number;
  sKLIMAbalance: number;
  wsKLIMAbalance: number;
  MCO2balance: number;
  NCTbalance: number;
}) {
  return (
    <div
      onClick={() => {
        props.setModalOpen(false);
      }}
      className="modal-background"
    >
      <div className="modal-container">
        <div className="modal-header">
          <span className="card-title">Select Token</span>
          <button
            className="modal-close"
            onClick={() => props.setModalOpen(false)}
          >
            &times;
          </button>
        </div>
        <div>
          <ModalSelector
            logo={BCTbox}
            coin="BCT"
            isSelected={props.currentCoin === "BCT"}
            balance={props.BCTbalance}
            coinAddress={BCTcontractAddress}
            setSourceToken={props.setSourceToken}
            setCoinModal={props.setModalOpen}
            setCurrentCoin={props.setCurrentCoin}
            setPoolToken={props.setPoolToken}
            setCarbonType={props.setCarbonType}
          />
          <ModalSelector
            logo={NCTbox}
            coin="NCT"
            isSelected={props.currentCoin === "NCT"}
            balance={props.NCTbalance}
            coinAddress={NCTcontractAddress}
            setSourceToken={props.setSourceToken}
            setCoinModal={props.setModalOpen}
            setCurrentCoin={props.setCurrentCoin}
            setPoolToken={props.setPoolToken}
            setCarbonType={props.setCarbonType}
          />
          <ModalSelector
            logo={MCO2box}
            coin="MCO2"
            isSelected={props.currentCoin === "MCO2"}
            balance={props.MCO2balance}
            coinAddress={MCO2contractAddress}
            setSourceToken={props.setSourceToken}
            setCoinModal={props.setModalOpen}
            setCurrentCoin={props.setCurrentCoin}
            setPoolToken={props.setPoolToken}
            setCarbonType={props.setCarbonType}
          />
          <ModalSelector
            logo={USDCbox}
            coin="USDC"
            isSelected={props.currentCoin === "USDC"}
            balance={props.USDCbalance}
            coinAddress={USDCcontractAddress}
            setSourceToken={props.setSourceToken}
            setCoinModal={props.setModalOpen}
            setCurrentCoin={props.setCurrentCoin}
            setPoolToken={props.setPoolToken}
            setCarbonType={props.setCarbonType}
          />
          <ModalSelector
            logo={KLIMAbox}
            coin="KLIMA"
            isSelected={props.currentCoin === "KLIMA"}
            balance={props.KLIMAbalance}
            coinAddress={KLIMAcontractAddress}
            setSourceToken={props.setSourceToken}
            setCoinModal={props.setModalOpen}
            setCurrentCoin={props.setCurrentCoin}
            setPoolToken={props.setPoolToken}
            setCarbonType={props.setCarbonType}
          />
          <ModalSelector
            logo={KLIMAbox}
            coin="sKLIMA"
            isSelected={props.currentCoin === "sKLIMA"}
            balance={props.sKLIMAbalance}
            coinAddress={sKLIMAcontractAddress}
            setSourceToken={props.setSourceToken}
            setCoinModal={props.setModalOpen}
            setCurrentCoin={props.setCurrentCoin}
            setPoolToken={props.setPoolToken}
            setCarbonType={props.setCarbonType}
          />
          <ModalSelector
            logo={KLIMAbox}
            coin="wsKLIMA"
            isSelected={props.currentCoin === "wsKLIMA"}
            balance={props.wsKLIMAbalance}
            coinAddress={wsKLIMAcontractAddress}
            setSourceToken={props.setSourceToken}
            setCoinModal={props.setModalOpen}
            setCurrentCoin={props.setCurrentCoin}
            setPoolToken={props.setPoolToken}
            setCarbonType={props.setCarbonType}
          />
        </div>
      </div>
    </div>
  );
}
