import { useState, useEffect } from "react";
import { getWallets, getBenevits } from "../api";
export function useWallet(wallet, headers) {
  const [wallets, setwallets] = useState(null);
  useEffect(() => {
    let cancel = false;
    if (wallets == null) {
      getWallets(headers).then((res) => {
        if (cancel) return;
        setwallets(res.data);
      });
      return () => {
        cancel = true;
      };
    }
  });
  return wallets;
}

export function useBenevits(wallet, headers) {
  const [benevits, setbenevits] = useState(null);
  useEffect(() => {
    let cancel = false;
    if (benevits == null) {
      getBenevits(headers).then((res) => {
        if (cancel) return;
        console.log(res);
        setbenevits(res.data);
      });
      return () => {
        cancel = true;
      };
    }
  });
  return benevits;
}

export function useWalletsBenevit(headers) {
  //intentando evitar que se llame dos veces alguno de los dos endpoints
  const [values, setvalues] = useState(null);
  useEffect(() => {
    let cancel = false;
    if (values == null) {
      getWallets(headers).then((res) => {
        if (cancel) return;
        getBenevits(headers).then((res2) => {
          if (cancel) return;
          setvalues({ wallets: res.data, benevits: res2.data });
        });
      });
      return () => {
        cancel = true;
      };
    }
  });
  return values;
}
