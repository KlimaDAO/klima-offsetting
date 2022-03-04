import ApprovalCheck from "../assets/approvingCheck.png";

export function successfulBurn() {
  (document.getElementById("burnSymbol") as HTMLImageElement).src = "#";
  (document.getElementById("approvalpic") as HTMLImageElement).src =
    ApprovalCheck;
  document.getElementById("approvalpic").classList.add("approve-outcome");
  document.getElementById("approvalpic").classList.remove("approving");
  document.getElementById("approvingStatus").textContent =
    "Transaction Submitted!";
}
