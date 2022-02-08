import './App.css';
import React, {useState} from 'react';

import KLIMAlogo from './assets/logo.png';
import Arrow from './assets/arrow.png';
import Fire from './assets/fire.png';
import Cloud from './assets/cloud.png';
import BCTlogo from './assets/BCT.png';
import USDClogo from './assets/USDC.png';
import PendingApproval from './assets/approving.png';
import ApprovalX from './assets/approvingX.png';
import ApprovalCheck from './assets/approvingCheck.png';

import {sKLIMAcontractAddress,
  sKLIMAabi,
  KLIMAcontractAddress,
  KLIMAabi,
  wsKLIMAcontractAddress,
  wsKLIMAabi,
  USDCcontractAddress,
  USDCabi,
  BCTcontractAddress,
  BCTabi,
  offsetConsumptionAddress,
  offsetConsumptionABI,
  approve_amount
} from './contracts';

import axios from 'axios';
import { ethers } from 'ethers';
import { Result } from 'ethers/lib/utils';

function App() {
  const [address, setAddress] = useState('Not Connected');
  const [active, setActive] = useState(false);
  const [coinModalOpened, setCoinModalOpened] = useState(false);
  const [burnModalOpened, setBurnModalOpened] = useState(false);
  const [currentCoin, setCurrentCoin] = useState('BCT');
  const [KLIMAapproved, setKLIMAapproved] = useState(false);
  const [sKLIMAapproved, setsKLIMAapproved] = useState(false);
  const [wsKLIMAapproved, setwsKLIMAapproved] = useState(false);
  const [USDCapproved, setUSDCapproved] = useState(false);
  const [BCTapproved, setBCTapproved] = useState(false);
  const [approveModalOpened, setApproveModalOpened] = useState(false);
  const [KLIMAbalance, setKLIMAbalance] = useState(0);
  const [sKLIMAbalance, setsKLIMAbalance] = useState(0);
  const [wsKLIMAbalance, setwsKLIMAbalance] = useState(0);
  const [BCTbalance, setBCTbalance] = useState(0);
  const [USDCbalance, setUSDCbalance] = useState(0);

  const Web3 = require('web3');
  const web3 = new Web3((window as any).ethereum);
  const KLIMAcontract = new web3.eth.Contract(KLIMAabi, KLIMAcontractAddress);
  const sKLIMAcontract = new web3.eth.Contract(sKLIMAabi, sKLIMAcontractAddress);
  const wsKLIMAcontract = new web3.eth.Contract(wsKLIMAabi, wsKLIMAcontractAddress);
  const BCTcontract = new web3.eth.Contract(BCTabi, BCTcontractAddress);
  const USDCcontract = new web3.eth.Contract(USDCabi, USDCcontractAddress);

  async function connect() {
    if (active) {
      setAddress('Not Connected');
      setActive(false);
    }
    else if (typeof (window as any).ethereum != 'undefined') {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
      setActive(true);
      sKLIMAcontract.methods.allowance(accounts[0], offsetConsumptionAddress).call(function (err: Error, res: any) {
        if (err) {
          return;
        }
        if (res === '0') {
          setsKLIMAapproved(false);
          return;
        }
        setsKLIMAapproved(true);
      });
    
      KLIMAcontract.methods.allowance(accounts[0], offsetConsumptionAddress).call(function (err: Error, res: any) {
        if (err) {
          return
        }
        if (res === '0') {
          setKLIMAapproved(false);
          return;
        }
        setKLIMAapproved(true);
      });
    
      wsKLIMAcontract.methods.allowance(accounts[0], offsetConsumptionAddress).call(function (err: Error, res: any) {
        if (err) {
          return;
        }
        if (res === '0') {
          setwsKLIMAapproved(false);
          return;
        }
        setwsKLIMAapproved(true);
      });
    
      USDCcontract.methods.allowance(accounts[0], offsetConsumptionAddress).call(function (err: Error, res: any) {
        if (err) {
          return;
        }
        if (res === '0') {
          setUSDCapproved(false);
          return;
        }
        setUSDCapproved(true);
      });
    
      BCTcontract.methods.allowance(accounts[0], offsetConsumptionAddress).call(function (err: Error, res: any) {
        if (err) {
          return;
        }
        console.log(res);
        if (res === '0') {
          setBCTapproved(false);
          return;
        }
        setBCTapproved(true);
      });

      sKLIMAcontract.methods.balanceOf(accounts[0]).call(function (err: Error, res: any) {
        if (err) {
          return;
        }
        setsKLIMAbalance(res/(10**9));
      });

      KLIMAcontract.methods.balanceOf(accounts[0]).call(function (err: Error, res: any) {
        if (err) {
          return;
        }
        setKLIMAbalance(res/(10**9));
      });

      wsKLIMAcontract.methods.balanceOf(accounts[0]).call(function (err: Error, res: any) {
        if (err) {
          return;
        }
        setwsKLIMAbalance(res/(10**18)); 
      });

      BCTcontract.methods.balanceOf(accounts[0]).call(function (err: Error, res: any) {
        if (err) {
          return;
        }
        setBCTbalance(res/(10**18));
      });

      USDCcontract.methods.balanceOf(accounts[0]).call(function (err: Error, res: any) {
        if (err) {
          return;
        }
        setUSDCbalance(res/(10**6));
      });
    }
  }

  async function approveCoin(coin: string) {
    setApproveModalOpened(true);
    const con: any[] = coin === 'BCT' ? [BCTcontractAddress, BCTabi] : coin === 'USDC' ? [USDCcontractAddress, USDCabi] : coin === 'KLIMA' ? [KLIMAcontractAddress, KLIMAabi] : coin === 'sKLIMA' ? [sKLIMAcontractAddress, sKLIMAabi] : [wsKLIMAcontractAddress, wsKLIMAabi];
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(con[0], con[1], signer);
    erc20.approve(offsetConsumptionAddress, approve_amount).then(() => {
      (document.getElementById("approvalpic") as HTMLImageElement).src=ApprovalCheck;
      document.getElementById("approvalpic").classList.add('ApproveOutcome');
      document.getElementById("approvalpic").classList.remove('Approving');
      document.getElementById("approvingStatus").textContent = 'Approved!'
      setTimeout(() => setApproveModalOpened(false), 2000);
    }).catch((err: Error) => {
      console.log(err);
      (document.getElementById("approvalpic") as HTMLImageElement).src=ApprovalX;
      document.getElementById("approvalpic").classList.add('ApproveOutcome');
      document.getElementById("approvalpic").classList.remove('Approving');
      document.getElementById("approvingStatus").textContent = 'Declined.'
      setTimeout(() => setApproveModalOpened(false), 2000);
    });
    return;
  }

  async function burnCoin(coin: string, amt: any, beneficiary: string) {
    setBurnModalOpened(true);
    console.log((amt*10**19).toString());
    try {
      const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/cujowolf/polygon-bridged-carbon',
        {
          query: `
          {
            carbonOffsets(first: 20, orderBy: klimaRanking, orderDirection: asc, where: {balanceBCT_gt: 0}) {
              tokenAddress
            }
          }
          `
        }
      );
      var addressList: any = [];
      result.data.data.carbonOffsets.forEach((item: any) => {
        addressList.push(item.tokenAddress);
      })
      console.log(addressList);

      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const erc20 = new ethers.Contract(offsetConsumptionAddress, offsetConsumptionABI, signer);
      
      if (coin === 'BCT') {
        erc20.retireWithPool((amt*10**18).toString(), beneficiary, addressList, BCTcontractAddress).then(() => {
          successfulBurn()
        }).catch((err: Error) => {
          console.log(err);
          errorBurn()
        });
        return;
      }

      if (coin === 'USDC') {
        console.log(amt);
        erc20.retireWithUSDC((amt*10**18).toString(), beneficiary, addressList, BCTcontractAddress).then(() => {
          successfulBurn()
        }).catch((err: Error) => {
          console.log(err);
          errorBurn()
        });
        return;
      }
      const KLIMAtype = coin === 'KLIMA' ? KLIMAcontractAddress : coin === 'sKLIMA' ? sKLIMAcontractAddress : wsKLIMAcontractAddress;
      const KLIMAamt = coin === 'KLIMA' || coin === 'sKLIMA' ? (amt*10**19).toString() : (amt*10**20).toString()
      erc20.retireWithKLIMA(KLIMAamt, beneficiary, KLIMAtype, addressList, BCTcontractAddress).then((res: Result) => {
        successfulBurn();
      }).catch((err: Error) => {
        errorBurn()
      });

    } catch (error) {
      console.log(error);
    }
  }

  function successfulBurn() {
    (document.getElementById("burnSymbol") as HTMLImageElement).src='#';
    (document.getElementById("approvalpic") as HTMLImageElement).src=ApprovalCheck;
    document.getElementById("approvalpic").classList.add('ApproveOutcome');
    document.getElementById("approvalpic").classList.remove('Approving');
    document.getElementById("approvingStatus").textContent = 'Burned!'
    setTimeout(() => setBurnModalOpened(false), 2000);
  }

  function errorBurn() {
    (document.getElementById("burnSymbol") as HTMLImageElement).src='#';
    (document.getElementById("approvalpic") as HTMLImageElement).src=ApprovalX;
    document.getElementById("approvalpic").classList.add('ApproveOutcome');
    document.getElementById("approvalpic").classList.remove('Approving');
    document.getElementById("approvingStatus").textContent = 'Error.'
    setTimeout(() => setBurnModalOpened(false), 2000);
  }

  function currentCoinBalance() {
    return currentCoin === 'BCT' ? BCTbalance : currentCoin === 'USDC' ? USDCbalance : currentCoin === 'KLIMA' ? KLIMAbalance : currentCoin === 'sKLIMA' ? sKLIMAbalance : wsKLIMAbalance;
  }

  function currentCoinApproved() {
    return currentCoin === 'BCT' ? BCTapproved : currentCoin === 'USDC' ? USDCapproved : currentCoin === 'KLIMA' ? KLIMAapproved : currentCoin === 'sKLIMA' ? sKLIMAapproved : wsKLIMAapproved;
  }

  function CoinModal() {
    return (
      <div onClick = {() => {setCoinModalOpened(false); }} className = 'modalBackground'>
        <div className = 'modalContainer'>
          <div style = {{paddingBottom: '20px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <span style = {{fontWeight: '600', fontSize: '20px'}}>Select Token</span>
            <button className = 'modalClose' onClick = {() => setCoinModalOpened(false)}>&times;</button>
          </div>
          <div>
            <button style = {{backgroundColor: currentCoin === 'BCT' ? '#4A4A4A' : '#303030'}} className = 'selectCoinButton' onClick = {() => {setCurrentCoin('BCT'); setCoinModalOpened(false); }}>
              <div className = 'BCTcoinBox'>
                <img style = {{paddingTop: '12px'}} src={BCTlogo} alt="BCT" />
              </div>
              <div className = 'coinDetails'>
                <div className = 'coinName'>BCT</div>
                <div className = 'coinBalance'>{BCTbalance.toFixed(4) + ' BCT'}</div>
              </div>
            </button>
            <button style = {{backgroundColor: currentCoin === 'USDC' ? '#4A4A4A' : '#303030'}} className = 'selectCoinButton' onClick = {() => {setCurrentCoin('USDC'); setCoinModalOpened(false); }}>
              <div className = 'USDCcoinBox'>
                <img style = {{paddingTop: '6px'}} src={USDClogo} alt="USDC" />
              </div>
              <div className = 'coinDetails'>
                <div className = 'coinName'>USDC</div>
                <div className = 'coinBalance'>{USDCbalance.toFixed(4) + ' USDC'}</div>
              </div>
            </button>
            <button style = {{backgroundColor: currentCoin === 'KLIMA' ? '#4A4A4A' : '#303030'}} className = 'selectCoinButton' onClick = {() => {setCurrentCoin('KLIMA'); setCoinModalOpened(false); }}>
              <div className = 'KLIMAcoinBox'>
                <img style = {{paddingTop: '8px', height: '32px'}} src={KLIMAlogo} alt="KLIMA" />
              </div>
              <div className = 'coinDetails'>
                <div className = 'coinName'>KLIMA</div>
                <div className = 'coinBalance'>{KLIMAbalance.toFixed(4) + ' KLIMA'}</div>
              </div>
            </button>
            <button style = {{backgroundColor: currentCoin === 'sKLIMA' ? '#4A4A4A' : '#303030'}} className = 'selectCoinButton' onClick = {() => {setCurrentCoin('sKLIMA'); setCoinModalOpened(false); }}>
              <div className = 'KLIMAcoinBox'>
                <img style = {{paddingTop: '8px', height: '32px'}} src={KLIMAlogo} alt="KLIMA" />
              </div>
              <div className = 'coinDetails'>
                <div className = 'coinName'>sKLIMA</div>
                <div className = 'coinBalance'>{sKLIMAbalance.toFixed(4) + ' sKLIMA'}</div>
              </div>
            </button>
            <button style = {{backgroundColor: currentCoin === 'wsKLIMA' ? '#4A4A4A' : '#303030'}} className = 'selectCoinButton' onClick = {() => {setCurrentCoin('wsKLIMA'); setCoinModalOpened(false); }}>
              <div className = 'KLIMAcoinBox'>
                <img style = {{paddingTop: '8px', height: '32px'}} src={KLIMAlogo} alt="KLIMA" />
              </div>
              <div className = 'coinDetails'>
                <div className = 'coinName'>wsKLIMA</div>
                <div className = 'coinBalance'>{wsKLIMAbalance.toFixed(4) + ' wsKLIMA'}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  function ApproveModal() {
    return (
      <div onClick = {() => {setCoinModalOpened(false); }} className = 'modalBackground'>
        <div style = {{textAlign: 'center'}} className = 'modalContainer'>
          <div style = {{paddingBottom: '20px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <span style = {{paddingBottom: '60px', fontWeight: '600', fontSize: '20px'}}>Approve</span>
            <button className = 'modalClose' onClick = {() => setApproveModalOpened(false)}>&times;</button>
          </div>
          <div style = {{paddingBottom: '20px', paddingLeft: '85px'}}>
            <img id = "approvalpic" className = "Approving" src = {PendingApproval} alt = "approving"/>
          </div>
          <p id = 'approvingStatus' style = {{margin: 'auto'}}>
            Approving...
          </p>
        </div>
      </div>
    )
  }

  function BurnModal() {
    return (
      <div onClick = {() => {setBurnModalOpened(false); }} className = 'modalBackground'>
        <div style = {{textAlign: 'center'}} className = 'modalContainer'>
          <div style = {{paddingBottom: '20px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <span style = {{paddingBottom: '60px', fontWeight: '600', fontSize: '20px'}}>Burn</span>
            <button className = 'modalClose' onClick = {() => setBurnModalOpened(false)}>&times;</button>
          </div>
          <div style = {{position: 'relative', paddingBottom: '20px', paddingLeft: '85px'}}>
            <img id = 'burnSymbol' style = {{paddingLeft: '75px', paddingTop: '68px', position: 'absolute', height: '60px'}} src = {Fire} alt = ""/>
            <img id = "approvalpic" className = "Approving" src = {PendingApproval} alt = "approving"/>
          </div>
          <p id = 'approvingStatus' style = {{margin: 'auto'}}>
            Burning...
          </p>
        </div>
      </div>
    )
  }

  function Sidebar() {
    return (
      <div className="Sidebar">
        <a rel="noreferrer" target="_blank" style = {{textDecoration: 'none'}} href="http://www.klimadao.finance/">
          <button style = {{backgroundColor: 'transparent', border: 'none', paddingBottom: '10px', display: 'flex'}} >
            <img src={KLIMAlogo} alt="KLIMA" className = "Logo"/>
            <header className = "LogoFont">
              KlimaDAO
            </header>
          </button>
        </a>
        <hr/>
        <header className = "YourAddress">
          Your Wallet Address:
        </header>
        <header className = "Address">
          {address === 'Not Connected' ? address : address.substring(0,4) + '...' + address.substring(address.length - 4)}
        </header>
        <hr/>
      </div>
    )
  }

  function MainPanel() {
    return (
      <div className = "Main">
        <div style = {{justifyContent: 'space-between', display: 'flex', paddingBottom: '20px'}}>
          <header className = "CardTitle">
            Carbon Offset (beta)
          </header>
          {active ? <button onClick={connect} className = "DisconnectButton">Disconnect</button> : <button onClick={connect} className = "ConnectButton">Connect Wallet</button>}
        </div>
        <div style = {{display: 'flex', height: '96%', justifyContent: 'space-between'}}>
          <div className = 'Card' style = {{height: '90%', width: '65%', marginRight: '24px'}}>
            <p className = 'CardTitle'>Burn Carbon and get an NFT!</p>
            <p className = 'CardSub'>Hold, stake, and compound. If the protocol earns a <br/> profit selling carbon bonds, these rewards are <br/>shared among all holders of sKLIMA.</p>
            <div className = 'BurnPanel'>
              <p className = "CardSub">SELECT TOKEN</p>
              <button className = 'CoinSelection' onClick = { !active ? null : () => { setCoinModalOpened(true); }}>
                <div style = {{display: 'flex'}}>
                  <div style = {{marginTop: '3.5px'}} className = { currentCoin === 'BCT' ? 'BCTcoinBox' : currentCoin === 'USDC' ? 'USDCcoinBox' : 'KLIMAcoinBox' }>
                    <img style = { currentCoin === 'BCT' ? {paddingTop: '12px'} : currentCoin === 'USDC' ? {paddingTop: '5px'} : {height: '30px', paddingTop: '9px'}} src={ currentCoin === 'BCT' ? BCTlogo : currentCoin === 'USDC' ? USDClogo : KLIMAlogo } alt="Logo" />
                  </div>
                  <span style = {{paddingLeft: '14px', paddingTop: '17px'}}>{currentCoin}</span>
                </div>
                <div>
                  <span className = "CardSub">{ !active ? 'Not Connected' : 'Balance: ' + currentCoinBalance().toFixed(5) + ' ' + currentCoin }</span>
                  <img src = {Arrow} style = {{paddingLeft: '10px', width: '12px', paddingTop: '22px'}} alt = "dropdown"/>
                </div>
              </button>
              <p className = "CardSub">{currentCoin + ' Amount'}</p>
              <input onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} id = 'amount' type="number" placeholder="10.000"/>
              <button onClick = {() => (document.getElementById('amount') as HTMLInputElement).value = currentCoinBalance().toString() }className = 'Max'>
                MAX
              </button>
              <p className = "CardSub">BENEFICARY</p>
              <input id = 'beneficiary' type="text" placeholder="Who is the beneficiary?">
              </input>
              <p/>
              <button onClick = { !active ? null : currentCoinApproved() ? () => burnCoin(currentCoin, (document.getElementById('amount') as HTMLInputElement).value, (document.getElementById('beneficiary') as HTMLInputElement).value) : () => approveCoin(currentCoin) } className = 'burn'>{ !active ? 'CONNECT WALLET' : currentCoinApproved() ? 'BURN' : 'APPROVE' }</button>
            </div>
          </div>
          <div style = {{flexDirection: 'column', display: 'flex', width: '30%'}}>
            <div className = 'MiniCard'>
              <img style = {{marginRight: '11px', height: '30px'}} src = {Fire} alt = ""></img>
              <span style = {{verticalAlign: 'top'}}>You Burned</span>
              <p className = 'bigNumber'>8.000</p>
              <span className = "BCTburned">BCT burned</span>
            </div>
            <div className = 'MiniCard'>
              <img style = {{marginRight: '11px', height: '30px'}} src = {Fire} alt = ""></img>
              <span style = {{verticalAlign: 'top'}}>BCT Burned</span>
              <p className = 'bigNumber'>478.000</p>
              <span className = "BCTburned">Total BCT burned</span>
            </div>
            <div className = 'GraphCard'>
              <img style = {{marginRight: '11px', height: '30px'}} src = {Cloud} alt = "cloud"></img>
              <span style = {{verticalAlign: 'top'}}>Carbon Tonnes</span>
              <p className = 'bigNumber2'>69,420</p>
              <span className = 'graphDetails1'>-3.8%</span>&nbsp;<span className = 'graphDetails2'>than last month</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Sidebar/>
      <MainPanel/>
      {coinModalOpened && <CoinModal/>}
      {approveModalOpened && <ApproveModal/>}
      {burnModalOpened && <BurnModal/>}
    </div>
  );
}

export default App;