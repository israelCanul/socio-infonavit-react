import Skeleton from "../components/skeleton";
import { useWallet, useBenevits } from "../hooks";
const Home = function ({ userInfo, headerInfo }) {
  const wallets = useWallet(null);
  const benevits = useBenevits(null, headerInfo);

  return (
    <div className="Home main_container">
      {wallets == null || benevits == null ? <Skeleton /> : "ya cargo"}
    </div>
  );
};

export default Home;
