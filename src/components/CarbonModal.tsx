import { BCTcontractAddress, MCO2contractAddress, NCTcontractAddress } from "../contracts";

import BCTbox from "../assets/BCTbox.png";
import MCO2box from "../assets/MCO2box.png";
import NCTbox from "../assets/NCTbox.png";

function ModalSelector(props: {
  logo: string;
  setCarbonType: (c: string) => void;
  setModal: (b: boolean) => void;
  setPoolToken: (s: string) => void;
  isSelected: boolean;
  carbonType: string;
  poolAddress: string;
}) {
  return (
    <button
      style={{ backgroundColor: props.isSelected ? "#4A4A4A" : "#303030" }}
      className="select-coin-button"
      onClick={() => {
        props.setCarbonType(props.carbonType);
        props.setModal(false);
        props.setPoolToken(props.poolAddress);
      }}
    >
      <img className="coin-box" src={props.logo} alt="USDC" />
      <div className="coin-details">
        <div className="coin-name">{props.carbonType}</div>
      </div>
    </button>
  );
}

export function CarbonModal(props: {
  currentCarbonType: string;
  setModal: (b: boolean) => void;
  setPoolToken: (address: string) => void;
  setCurrentCarbonType: (coin: string) => void;
}) {
  return (
    <div
      onClick={() => {
        props.setModal(false);
      }}
      className="modal-background"
    >
      <div className="modal-container">
        <div className="modal-header">
          <span className="card-title">Select Carbon Type</span>
          <button className="modal-close" onClick={() => props.setModal(false)}>
            &times;
          </button>
        </div>
        <div>
          <ModalSelector
            logo={BCTbox}
            carbonType="BCT"
            isSelected={props.currentCarbonType === "BCT"}
            poolAddress={BCTcontractAddress}
            setPoolToken={props.setPoolToken}
            setModal={props.setModal}
            setCarbonType={props.setCurrentCarbonType}
          />
          <ModalSelector
            logo={MCO2box}
            carbonType="MCO2"
            isSelected={props.currentCarbonType === "MCO2"}
            poolAddress={MCO2contractAddress}
            setPoolToken={props.setPoolToken}
            setModal={props.setModal}
            setCarbonType={props.setCurrentCarbonType}
          />
          <ModalSelector
            logo={NCTbox}
            carbonType="NCT"
            isSelected={props.currentCarbonType === "NCT"}
            poolAddress={NCTcontractAddress}
            setPoolToken={props.setPoolToken}
            setModal={props.setModal}
            setCarbonType={props.setCurrentCarbonType}
          />
        </div>
      </div>
    </div>
  );
}
