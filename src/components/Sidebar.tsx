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
      <a
        className="sidebar-button"
        rel="noreferrer"
        href="https://dapp.klimadao.finance/#/stake"
      >
        <div className="icon-container">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAA8ElEQVRIie3UMS8EQRiA4aF1rUIpVGqVKNx2/BuFaP0LVH4CkehOT6VzHRGi03C1R3NCxoSdzeyeYt/uS+bLs5vsbAh9/ykczASFmaCdwt/RzuAYrdEEYxyj6gpNdYmV35z5Rk/3d1UI4RobWVvYL/DW8ILVXLz2x4UFbOE0gY+y4BjP2NlL4MPGeObOWQQfZcOfeOb5YQSPG8G5YRDBb/GZtq7TXDS/dgWvR/NNV/BuNF+15Hzl58/nHcttYQNUOE/c4ZNSyA7uE0CqByyWgp9qos9YK4JO4cca6AWWiqFTeBt3ETTBLQ6xWRTs68vtA3Ssd9g+OqVXAAAAAElFTkSuQmCC"
            alt="back"
          />
        </div>
        <span>Back to dApp</span>
      </a>
    </div>
  );
}
