import Fire from "../assets/fire.png";
import PendingApproval from "../assets/approving.png";

export function BurnModal(props: { setBurnModal: (a: boolean) => void }) {
  return (
    <div
      onClick={() => {
        props.setBurnModal(false);
      }}
      className="modal-background"
    >
      <div className="modal-container">
        <div className="modal-header">
          <span className="card-title">Burn</span>
          <button
            className="modal-close"
            onClick={() => props.setBurnModal(false)}
          >
            &times;
          </button>
        </div>
        <div className="loading">
          <img id="burnSymbol" className="loading-symbol" src={Fire} alt="" />
          <img
            id="approvalpic"
            className="approving"
            src={PendingApproval}
            alt="approving"
          />
        </div>
        <p id="approvingStatus" style={{ margin: "auto" }}>
          Retiring...
        </p>
      </div>
    </div>
  );
}
