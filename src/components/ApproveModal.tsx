import PendingApproval from "../assets/approving.png";

export function ApproveModal(props: { setApproveModal: (a: boolean) => void }) {
  return (
    <div
      onClick={() => {
        props.setApproveModal(false);
      }}
      className="modal-background"
    >
      <div className="modal-container">
        <div className="modal-header">
          <span className="card-title">Approve</span>
          <button
            className="modal-close"
            onClick={() => props.setApproveModal(false)}
          >
            &times;
          </button>
        </div>
        <div className="loading">
          <img
            id="approvalpic"
            className="approving"
            src={PendingApproval}
            alt="approving"
          />
        </div>
        <p id="approvingStatus" style={{ margin: "auto" }}>
          Approving...
        </p>
      </div>
    </div>
  );
}
