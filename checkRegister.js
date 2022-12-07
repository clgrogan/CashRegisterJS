const returnDenomValue = (denomination, cashInDrawer) => {
  for (e of cashInDrawer) {
    if (denomination == e[0]) return e[1];
  }
  return 0;
}
const checkCashRegister = (price, cash, cid) => {
  let drawerTotalC = 0;
  let cidC = cid.map(e => {
    drawerTotalC += Math.round(100 * e[1]);
    return [e[0], Math.round(100 * e[1])]
  });
  const denomDrawer = [
    ['ONE HUNDRED', 10000, returnDenomValue('ONE HUNDRED', cidC)],
    ['TWENTY', 2000, returnDenomValue('TWENTY', cidC)],
    ['TEN', 1000, returnDenomValue('TEN', cidC)],
    ['FIVE', 500, returnDenomValue('FIVE', cidC)],
    ['ONE', 100, returnDenomValue('ONE', cidC)],
    ['QUARTER', 25, returnDenomValue('QUARTER', cidC)],
    ['DIME', 10, returnDenomValue('DIME', cidC)],
    ['NICKEL', 5, returnDenomValue('NIKEL', cidC)],
    ['PENNY', 1, returnDenomValue('PENNY', cidC)]
  ];
  const change = denomDrawer.map(e => [e[0], 0]);
  const priceC = price * 100;
  const cashC = cash * 100;
  let changeDueC = cashC - priceC;
  let cdc = 0;
  let dtc = 0;
  let reObj = { status: 'INSUFFICIENT_FUNDS', change: [] };
  if (changeDueC <= drawerTotalC) {
    for (let i = 0; i < denomDrawer.length; i++) {
      while (changeDueC >= denomDrawer[i][1] 
              && denomDrawer[i][2] >= denomDrawer[i][1]
              && changeDueC > 0) {
        change[change[i][1] += denomDrawer[i][1]];
        changeDueC -= denomDrawer[i][1];
        denomDrawer[i][2] -= denomDrawer[i][1];
        drawerTotalC -= denomDrawer[i][1];
      }
      cdc = changeDueC;
      dtc = drawerTotalC;
      if (changeDueC == 0) break;
    }
    if (cdc == 0 && dtc == 0) {
      reObj.status = "CLOSED";
      reObj.change = cid;
    } else if (cdc == 0 && dtc > 0) {
      reObj.status = "OPEN";
      reObj.change = change.map(e => [e[0], e[1] / 100]).filter(e => e[1] > 0);
    }
  }
  return reObj;
}