import ApprovalCheck from "../assets/approvingCheck.png";

export function successfulApprove() {
  (document.getElementById("approvalpic") as HTMLImageElement).src =
    ApprovalCheck;
  document.getElementById("approvalpic").classList.add("approve-outcome");
  document.getElementById("approvalpic").classList.remove("approving");
  document.getElementById("approvingStatus").textContent =
    "Approved!";
}
