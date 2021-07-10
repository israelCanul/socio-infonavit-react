import { useState, useEffect } from "react";
import { getWallets, getBenevits } from "../api";
export function useWallet(wallet) {
  const [wallets, setwallets] = useState(null);
  useEffect(() => {
    let cancel = false;
    if (wallets == null) {
      getWallets().then((res) => {
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
