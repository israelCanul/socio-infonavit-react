import Skeleton from "../components/skeleton";
import "../css/home.scss";
import { useWallet, useBenevits } from "../hooks";
import Button from "@material-ui/core/Button";

const Home = function ({ userInfo, headerInfo }) {
  const wallets = useWallet(null, headerInfo);
  const benevits = useBenevits(null, headerInfo);
  var walletsArray = {};
  if (benevits !== null && wallets !== null) {
    benevits.unlocked.map((benevit) => {
      const existsInWallet = wallets.find(
        (wallet) => wallet.id === benevit.wallet.id
      );
      if (walletsArray[existsInWallet.id])
        walletsArray[existsInWallet.id].push({ ...benevit, unlocked: true });
      else walletsArray[existsInWallet.id] = [{ ...benevit, unlocked: true }];
    });
    benevits.locked.map((benevit) => {
      const existsInWallet = wallets.find(
        (wallet) => wallet.id === benevit.wallet.id
      );
      if (walletsArray[existsInWallet.id])
        walletsArray[existsInWallet.id].push({ ...benevit, unlocked: false });
      else walletsArray[existsInWallet.id] = [{ ...benevit, unlocked: false }];
    });

    var renderBenevits = Object.keys(walletsArray).map((walletId) => {
      var wallet = wallets.find(
        (wallet) => parseInt(wallet.id) === parseInt(walletId)
      );
      var walletItems = walletsArray[walletId];
      return (
        <Sections
          key={walletId + "asd"}
          items={walletItems}
          walletDesc={wallet}
        />
      );
    });
  }

  return (
    <div className="Home main_container">
      {wallets == null || benevits == null ? (
        <Skeleton />
      ) : renderBenevits ? (
        renderBenevits
      ) : (
        "loading"
      )}
    </div>
  );
};

const Sections = ({ items, walletDesc }) => {
  var renderItems = items.map((item, id) => {
    if (item.unlocked) {
      return (
        <div key={id} className="item unlocked">
          <div className="logo" style={{ background: item.primary_color }}>
            <img
              loading="lazy"
              src={item.ally.mini_logo_full_path}
              alt=""
              srcset=""
            />
          </div>
          <p className="desc">{item.title}</p>
          {item.is_available_in_all_territories ? (
            <p className="mexico">
              <strong>
                <small> Todo Mexico</small>
              </strong>
            </p>
          ) : (
            ""
          )}
          <p className="valido">
            Válido hasta:{" "}
            <small style={{ fontWeight: "bold" }}>{item.expiration_date}</small>
          </p>
        </div>
      );
    } else {
      return (
        <div key={id} className="item locked">
          <div className="logo" style={{ background: item.primary_color }}>
            <img loading="lazy" src={item.vector_full_path} alt="" srcset="" />
            {/* <p>
              
              <small>{item.title}</small>
            </p> */}
          </div>
          <div className="action" style={{ background: item.primary_color }}>
            <Button variant="contained">Lo Quiero</Button>
          </div>
        </div>
      );
    }
  });
  return (
    <div className="Items wallet">
      <div className="title">
        <p>{walletDesc.name}</p>
      </div>
      <div className="container">
        <div className="wrapper">{renderItems}</div>
      </div>
    </div>
  );
};

export default Home;
