import "./App.css";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

//assets
import Arrow from "./assets/arrow.png";
import Leaf from "./assets/leaf.png";
import BCTcircle from "./assets/BCTcircle.png";
import BCTbox from "./assets/BCTbox.png";
import USDCbox from "./assets/USDCbox.png";
import KLIMAbox from "./assets/KLIMAbox.png";
import MCO2box from "./assets/MCO2box.png";
import MCO2circle from "./assets/MCO2circle.png";
import NCTbox from "./assets/NCTbox.png";
import NCTcircle from "./assets/NCTcircle.png";

//contracts
import {
  KLIMAcontractAddress,
  KLIMAabi,
  sKLIMAcontractAddress,
  sKLIMAabi,
  wsKLIMAcontractAddress,
  wsKLIMAabi,
  USDCcontractAddress,
  USDCabi,
  BCTcontractAddress,
  BCTabi,
  NCTcontractAddress,
  NCTabi,
  MCO2contractAddress,
  MCO2abi,
  offsetConsumptionAddress,
  offsetConsumptionABI,
  approve_amount,
  KLIMAcontract,
  sKLIMAcontract,
  wsKLIMAcontract,
  BCTcontract,
  USDCcontract,
  NCTcontract,
  MCO2contract,
  retirementStorageContract,
  offsetConsumptionContract,
  web3,
} from "./contracts";

//components
import { InputField } from "./components/InputField";
import { MiniCard } from "./components/MiniCard";
import { Sidebar } from "./components/Sidebar";
import { ConversionPanel } from "./components/ConversionPanel";
import { BreakdownCard } from "./components/BreakdownCard";
import { Toast } from "./components/Toast";
import { BurnModal } from "./components/BurnModal";
import { ApproveModal } from "./components/ApproveModal";
import { CoinModal } from "./components/CoinModal";
import { CarbonModal } from "./components/CarbonModal";
//utils
import { errorBurn } from "./utils/errorBurn";
import { successfulBurn } from "./utils/successfulBurn";
import { successfulApprove } from "./utils/successfulApprove";
import { errorApprove } from "./utils/errorApprove";
import { multiplier } from "./utils/multiplier";

function App() {
  const [address, setAddress] = useState<string>("NOT CONNECTED");
  const [active, setActive] = useState<boolean>(false);

  const [coinModalOpened, setCoinModalOpened] = useState<boolean>(false);
  const [burnModalOpened, setBurnModalOpened] = useState<boolean>(false);
  const [carbonModalOpened, setCarbonModalOpened] = useState<boolean>(false);
  const [toastOpened, setToastOpened] = useState<boolean>(false);
  const [approveModalOpened, setApproveModalOpened] = useState<boolean>(false);

  const [currentCoin, setCurrentCoin] = useState<string>("USDC");
  const [currentCarbonType, setCurrentCarbonType] = useState<string>("BCT");
  const [poolToken, setPoolToken] = useState<string>(BCTcontractAddress);
  const [sourceToken, setSourceToken] = useState<string>(USDCcontractAddress);

  const [KLIMAapproved, setKLIMAapproved] = useState<boolean>(false);
  const [sKLIMAapproved, setsKLIMAapproved] = useState<boolean>(false);
  const [wsKLIMAapproved, setwsKLIMAapproved] = useState<boolean>(false);
  const [USDCapproved, setUSDCapproved] = useState<boolean>(false);
  const [BCTapproved, setBCTapproved] = useState<boolean>(false);
  const [MCO2approved, setMCO2approved] = useState<boolean>(false);
  const [NCTapproved, setNCTapproved] = useState<boolean>(false);

  const [MCO2balance, setMCO2balance] = useState<number>(0);
  const [KLIMAbalance, setKLIMAbalance] = useState<number>(0);
  const [sKLIMAbalance, setsKLIMAbalance] = useState<number>(0);
  const [wsKLIMAbalance, setwsKLIMAbalance] = useState<number>(0);
  const [BCTbalance, setBCTbalance] = useState<number>(0);
  const [USDCbalance, setUSDCbalance] = useState<number>(0);
  const [NCTbalance, setNCTbalance] = useState<number>(0);

  const [totalCarbonRetired, setTotalCarbonRetired] = useState<number>(0);
  const [BCTretired, setBCTretired] = useState<number>(0);
  const [MCO2retired, setMCO2retired] = useState<number>(0);
  const [NCTretired, setNCTretired] = useState<number>(0);

  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  function CoinSelectButton(props: {
    title: string;
    openModal: (a: boolean) => void;
    coin: string;
  }) {
    const logo =
      props.coin === "BCT"
        ? BCTbox
        : props.coin === "NCT"
        ? NCTbox
        : props.coin === "MCO2"
        ? MCO2box
        : props.coin === "USDC"
        ? USDCbox
        : KLIMAbox;
    return (
      <div>
        <p className="input-title">{props.title}</p>
        <button
          className="coin-selection"
          onClick={
            !active
              ? null
              : () => {
                  props.openModal(true);
                }
          }
        >
          <div className="info-pair">
            <img className="coin-box" src={logo} alt="coin-logo" />
            <span>{props.coin}</span>
          </div>
          <div className="info-pair">
            <span className="input-title">
              {!active
                ? "Not Connected"
                : "Balance: " +
                  currentCoinBalance().toFixed(5) +
                  " " +
                  props.coin}
            </span>
            <img
              src={Arrow}
              style={{ width: "12px", paddingLeft: "7px" }}
              alt="dropdown"
            />
          </div>
        </button>
        <p />
      </div>
    );
  }

  function CarbonSelectButton(props: {
    title: string;
    openModal: (a: boolean) => void;
    carbonType: string;
  }) {
    const logo =
      props.carbonType === "BCT"
        ? BCTbox
        : props.carbonType === "NCT"
        ? NCTbox
        : MCO2box;
    return (
      <div>
        <p className="input-title">{props.title}</p>
        <button
          className="coin-selection"
          disabled={props.carbonType === currentCoin}
          onClick={
            !active
              ? null
              : () => {
                  props.openModal(true);
                }
          }
        >
          <div className="info-pair">
            <img src={logo} className="coin-box" alt="coin-logo" />
            <span>{props.carbonType}</span>
          </div>
          <img
            src={Arrow}
            style={{ width: "12px", paddingLeft: "7px" }}
            alt="dropdown"
          />
        </button>
        <p />
      </div>
    );
  }

  function RetireAmountInput() {
    return (
      <div>
        <p className="input-title">AMOUNT IN CARBON TONS</p>
        <input
          onKeyDown={(evt) =>
            ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
          }
          onChange={(e: any) => {
            if (parseFloat(e.target.value) === 0 || e.target.value === "") {
              (
                document.getElementById("BCTamount") as HTMLSpanElement
              ).textContent = "0.00";
              (
                document.getElementById("convertedAmount") as HTMLSpanElement
              ).textContent = "0.00";
              return;
            }
            offsetConsumptionContract.methods
              .getSourceAmount(
                sourceToken,
                poolToken,
                BigInt(e.target.value * 10 ** 18).toString(),
                true
              )
              .call(function (err: Error, res: number) {
                if (err) {
                  return;
                }
                (
                  document.getElementById("BCTamount") as HTMLSpanElement
                ).textContent = (+e.target.value).toFixed(2);
                (
                  document.getElementById("convertedAmount") as HTMLSpanElement
                ).textContent = (res[0] / 10 ** multiplier(currentCoin))
                  .toFixed(2)
                  .toString();
              });
          }}
          id="amount"
          type="number"
          placeholder="How many carbon tons would you like to retire?"
        />
        <button
          onClick={() => {
            if (sourceToken === poolToken) {
              offsetConsumptionContract.methods
                .getSourceAmount(
                  sourceToken,
                  poolToken,
                  BigInt(currentCoinBalance() * 10 ** 18).toString(),
                  true
                )
                .call(function (err: Error, res: number) {
                  if (err) {
                    return;
                  }
                  (
                    document.getElementById("amount") as HTMLInputElement
                  ).value = ((res[1] / 10 ** 18) * 0.99).toFixed(5);
                  (
                    document.getElementById("BCTamount") as HTMLSpanElement
                  ).textContent = ((res[1] / 10 ** 18) * 0.99).toFixed(2);
                  (
                    document.getElementById(
                      "convertedAmount"
                    ) as HTMLSpanElement
                  ).textContent = currentCoinBalance().toFixed(2);
                });
              return;
            }

            offsetConsumptionContract.methods
              .getSourceAmount(
                sourceToken,
                poolToken,
                BigInt(
                  currentCoinBalance() * 10 ** multiplier(currentCoin)
                ).toString(),
                false
              )
              .call(function (err: Error, res: number) {
                if (err) {
                  return;
                }
                (document.getElementById("amount") as HTMLInputElement).value =
                  ((res[1] / 10 ** 18) * 0.99).toFixed(5);
                (
                  document.getElementById("BCTamount") as HTMLSpanElement
                ).textContent = ((res[1] / 10 ** 18) * 0.99).toFixed(2);
                (
                  document.getElementById("convertedAmount") as HTMLSpanElement
                ).textContent = currentCoinBalance().toFixed(2);
              });
          }}
          className="max"
        >
          MAX
        </button>
        <p />
      </div>
    );
  }

  function MainPanelButton() {
    function action() {
      if (!active) {
        connect();
        return;
      }
      if (currentCoinApproved()) {
        const amount = (document.getElementById("amount") as HTMLInputElement)
          .value;
        const beneficiaryAddress = (
          document.getElementById("beneficiaryAddress") as HTMLInputElement
        ).value;
        const beneficiary = (
          document.getElementById("beneficiary") as HTMLInputElement
        ).value;
        const retirementMessage =
          (document.getElementById("retirementMessage") as HTMLInputElement)
            .value + " Retired via KlimaDAO";
        burnCoin(amount, beneficiaryAddress, beneficiary, retirementMessage);
      } else {
        approveCoin(currentCoin);
      }
    }

    return (
      <button onClick={() => action()} className="burn">
        {active
          ? currentCoinApproved()
            ? "BURN"
            : "APPROVE"
          : "CONNECT WALLET"}
      </button>
    );
  }

  async function connect(): Promise<any> {
    if (active) {
      setAddress("NOT CONNECTED");
      setActive(false);
    } else if (typeof (window as any).ethereum != "undefined") {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      setActive(true);
      sKLIMAcontract.methods
        .allowance(accounts[0], offsetConsumptionAddress)
        .call(function (err: Error, res: any) {
          if (err) {
            return;
          }
          if (res === "0") {
            setsKLIMAapproved(false);
            return;
          }
          setsKLIMAapproved(true);
        });

      KLIMAcontract.methods
        .allowance(accounts[0], offsetConsumptionAddress)
        .call(function (err: Error, res: any) {
          if (err) {
            return;
          }
          if (res === "0") {
            setKLIMAapproved(false);
            return;
          }
          setKLIMAapproved(true);
        });

      wsKLIMAcontract.methods
        .allowance(accounts[0], offsetConsumptionAddress)
        .call(function (err: Error, res: any) {
          if (err) {
            return;
          }
          if (res === "0") {
            setwsKLIMAapproved(false);
            return;
          }
          setwsKLIMAapproved(true);
        });

      USDCcontract.methods
        .allowance(accounts[0], offsetConsumptionAddress)
        .call(function (err: Error, res: any) {
          if (err) {
            return;
          }
          if (res === "0") {
            setUSDCapproved(false);
            return;
          }
          setUSDCapproved(true);
        });

      BCTcontract.methods
        .allowance(accounts[0], offsetConsumptionAddress)
        .call(function (err: Error, res: any) {
          if (err) {
            return;
          }
          if (res === "0") {
            setBCTapproved(false);
            return;
          }
          setBCTapproved(true);
        });

      NCTcontract.methods
        .allowance(accounts[0], offsetConsumptionAddress)
        .call(function (err: Error, res: any) {
          if (err) {
            return;
          }
          if (res === "0") {
            setNCTapproved(false);
            return;
          }
          setNCTapproved(true);
        });

      MCO2contract.methods
        .allowance(accounts[0], offsetConsumptionAddress)
        .call(function (err: Error, res: any) {
          if (err) {
            return;
          }
          if (res === "0") {
            setMCO2approved(false);
            return;
          }
          setMCO2approved(true);
        });

      sKLIMAcontract.methods
        .balanceOf(accounts[0])
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setsKLIMAbalance(res / 10 ** 9);
        });

      KLIMAcontract.methods
        .balanceOf(accounts[0])
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setKLIMAbalance(res / 10 ** 9);
        });

      wsKLIMAcontract.methods
        .balanceOf(accounts[0])
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setwsKLIMAbalance(res / 10 ** 18);
        });

      BCTcontract.methods
        .balanceOf(accounts[0])
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setBCTbalance(res / 10 ** 18);
        });

      USDCcontract.methods
        .balanceOf(accounts[0])
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setUSDCbalance(res / 10 ** 6);
        });

      MCO2contract.methods
        .balanceOf(accounts[0])
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setMCO2balance(res / 10 ** 18);
        });

      NCTcontract.methods
        .balanceOf(accounts[0])
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setNCTbalance(res / 10 ** 18);
        });

      retirementStorageContract.methods
        .getRetirementTotals(accounts[0])
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setTotalCarbonRetired(res[1] / 10 ** 18);
        });

      retirementStorageContract.methods
        .getRetirementPoolInfo(accounts[0], BCTcontractAddress)
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setBCTretired(res / 10 ** 18);
        });

      retirementStorageContract.methods
        .getRetirementPoolInfo(accounts[0], MCO2contractAddress)
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setMCO2retired(res / 10 ** 18);
        });

      retirementStorageContract.methods
        .getRetirementPoolInfo(accounts[0], NCTcontractAddress)
        .call(function (err: Error, res: number) {
          if (err) {
            return;
          }
          setNCTretired(res / 10 ** 18);
        });
    }
  }

  async function approveCoin(coin: string): Promise<any> {
    setApproveModalOpened(true);
    const con: [string, any] =
      coin === "BCT"
        ? [BCTcontractAddress, BCTabi]
        : coin === "NCT"
        ? [NCTcontractAddress, NCTabi]
        : coin === "MCO2"
        ? [MCO2contractAddress, MCO2abi]
        : coin === "USDC"
        ? [USDCcontractAddress, USDCabi]
        : coin === "KLIMA"
        ? [KLIMAcontractAddress, KLIMAabi]
        : coin === "sKLIMA"
        ? [sKLIMAcontractAddress, sKLIMAabi]
        : [wsKLIMAcontractAddress, wsKLIMAabi];
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(con[0], con[1], signer);

    erc20
      .approve(offsetConsumptionAddress, approve_amount)
      .then(() => {
        successfulApprove();
        setTimeout(() => setApproveModalOpened(false), 2000);
      })
      .catch((err: Error) => {
        errorApprove();
        setTimeout(() => setApproveModalOpened(false), 2000);
      });
    return;
  }

  async function burnCoin(
    amt: any,
    beneficiaryAddress: string,
    beneficiary: string,
    retirementMessage: string
  ): Promise<any> {
    if (beneficiaryAddress === "") {
      beneficiaryAddress = address;
    } else if (!web3.utils.isAddress(beneficiaryAddress)) {
      setToastOpened(true);
      setTimeout(() => setToastOpened(false), 3000);
      return;
    }

    setBurnModalOpened(true);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(
      offsetConsumptionAddress,
      offsetConsumptionABI,
      signer
    );

    erc20
      .retireCarbon(
        sourceToken,
        poolToken,
        BigInt(amt * 10 ** 18).toString(),
        true,
        beneficiaryAddress,
        beneficiary,
        retirementMessage
      )
      .then(() => {
        successfulBurn();
        setTimeout(() => setBurnModalOpened(false), 2000);
      })
      .catch((err: Error) => {
        errorBurn();
        setTimeout(() => setBurnModalOpened(false), 2000);
      });
  }

  function currentCoinBalance(): number {
    return currentCoin === "BCT"
      ? BCTbalance
      : currentCoin === "NCT"
      ? NCTbalance
      : currentCoin === "MCO2"
      ? MCO2balance
      : currentCoin === "USDC"
      ? USDCbalance
      : currentCoin === "KLIMA"
      ? KLIMAbalance
      : currentCoin === "sKLIMA"
      ? sKLIMAbalance
      : wsKLIMAbalance;
  }

  function currentCoinApproved(): boolean {
    return currentCoin === "BCT"
      ? BCTapproved
      : currentCoin === "NCT"
      ? NCTapproved
      : currentCoin === "MCO2"
      ? MCO2approved
      : currentCoin === "USDC"
      ? USDCapproved
      : currentCoin === "KLIMA"
      ? KLIMAapproved
      : currentCoin === "sKLIMA"
      ? sKLIMAapproved
      : wsKLIMAapproved;
  }

  function MainPanel() {
    return (
      <div className="main">
        <div className="header-panel">
          <header className="card-title">Carbon Offset</header>
          {active ? (
            <button onClick={connect} className="disconnect-button">
              DISCONNECT
            </button>
          ) : (
            <button onClick={connect} className="connect-button">
              CONNECT
            </button>
          )}
        </div>
        <div className="main-body">
          <div className="card">
            <p className="card-title">Retire Carbon</p>
            <p className="card-sub">
              Retire carbon and claim the underlying enviromental benefit of the
              carbon offset.
              <br />
            </p>
            <div className="burn-panel">
              <CarbonSelectButton
                title="SELECT CARBON OFFSET TOKEN TO RETIRE"
                openModal={setCarbonModalOpened}
                carbonType={currentCarbonType}
              />
              <CoinSelectButton
                title="SELECT INPUT TOKEN"
                openModal={setCoinModalOpened}
                coin={currentCoin}
              />
              <RetireAmountInput />
              <ConversionPanel
                currentCarbonType={currentCarbonType}
                currentCoin={currentCoin}
              />
              <InputField
                title="BENEFICIARY"
                type="text"
                placeholder="Who is the beneficiary?"
                id="beneficiary"
              />
              <InputField
                title="BENEFICIARY ADDRESS (optional; defaults to connected address)"
                type="text"
                placeholder="Which address are you retiring on behalf of?"
                id="beneficiaryAddress"
              />
              <InputField
                title="RETIREMENT MESSAGE (optional)"
                type="text"
                placeholder="Any additional info for your retirement?"
                id="retirementMessage"
              />
              <MainPanelButton />
            </div>
          </div>
          <div className="card-stacks">
            <MiniCard
              title="You've Retired"
              symbol={Leaf}
              amount={totalCarbonRetired.toFixed(3)}
              subtitle="Tons of Carbon Retired"
            />
            <BreakdownCard
              carbonTypes={[
                { logo: BCTcircle, amount: BCTretired, subtitle: "BCT" },
                { logo: NCTcircle, amount: NCTretired, subtitle: "NCT" },
                { logo: MCO2circle, amount: MCO2retired, subtitle: "MCO2" },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {width > 1200 && <Sidebar address={address} />}
      <MainPanel />
      {carbonModalOpened && (
        <CarbonModal
          currentCarbonType={currentCarbonType}
          setModal={setCarbonModalOpened}
          setPoolToken={setPoolToken}
          setCurrentCarbonType={setCurrentCarbonType}
        />
      )}
      {coinModalOpened && (
        <CoinModal
          currentCoin={currentCoin}
          setModalOpen={setCoinModalOpened}
          setSourceToken={setSourceToken}
          setCurrentCoin={setCurrentCoin}
          MCO2balance={MCO2balance}
          NCTbalance={NCTbalance}
          BCTbalance={BCTbalance}
          USDCbalance={USDCbalance}
          KLIMAbalance={KLIMAbalance}
          sKLIMAbalance={sKLIMAbalance}
          wsKLIMAbalance={wsKLIMAbalance}
          setPoolToken={setPoolToken}
          setCarbonType={setCurrentCarbonType}
        />
      )}
      {approveModalOpened && (
        <ApproveModal setApproveModal={setApproveModalOpened} />
      )}
      {burnModalOpened && <BurnModal setBurnModal={setBurnModalOpened} />}
      {toastOpened && <Toast />}
    </div>
  );
}

export default App;
