import ApprovalX from "../assets/approvingX.png";

export function errorApprove() {
  (document.getElementById("approvalpic") as HTMLImageElement).src = ApprovalX;
  document.getElementById("approvalpic").classList.add("approve-outcome");
  document.getElementById("approvalpic").classList.remove("approving");
  document.getElementById("approvingStatus").textContent = "Declined.";
}
