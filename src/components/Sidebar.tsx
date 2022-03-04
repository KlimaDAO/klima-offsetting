import KLIMAlogo from "../assets/logo.png";

export function Sidebar(props: { address: string }) {
  return (
    <div className="sidebar">
      <a
        rel="noreferrer"
        target="_blank"
        style={{ textDecoration: "none" }}
        href="http://www.klimadao.finance/"
      >
        <button className="klima-button">
          <img src={KLIMAlogo} alt="KLIMA" className="logo" />
          <header className="logo-font">KlimaDAO</header>
        </button>
      </a>
      <hr />
      <header className="your-address">Your Wallet Address:</header>
      <header className="address">
        {props.address === "NOT CONNECTED"
          ? props.address
          : props.address.substring(0, 4) +
            "..." +
            props.address.substring(props.address.length - 4)}
      </header>
      <hr />
    </div>
  );
}
