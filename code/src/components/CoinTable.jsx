import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinList, coinListSave } from "../Config/api";
import { CryptoState } from "../Context";
import { Container, Table, Pagination } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export const numberWithCommas = (coin) => {
  return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CoinTable = ({ money, setMoney }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = CryptoState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 3,
    }).format(value);
  };

  const getCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    //const { data } = await axios.get("http://127.0.0.1:8000");
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    getCoins();
  }, [currency]);

  const handleChange = () => {
    return (
      coins.filter((coin) => coin.name.toLowerCase().includes(search)) || []
    );
  };

  const buyCoin = (name, price) => {
    try {
      const count = localStorage.getItem(name);
      if (money - price > 0) {
        setMoney(money - price);
        if (count == null) {
          localStorage.setItem(name, 1);
          document.querySelector("#" + name).innerHTML = 1;
        } else {
          localStorage.setItem(name, parseInt(count) + 1);
          document.querySelector("#" + name).innerHTML = parseInt(count) + 1;
        }
        localStorage.setItem("money", money - price);
      } else {
      }
    } catch {}
  };

  const sellCoin = (name, price) => {
    const count = localStorage.getItem(name);
    if (parseInt(count) > 0) {
      setMoney(money + price);
      document.querySelector("#" + name).innerHTML = parseInt(count) - 1;
      localStorage.setItem(name, parseInt(count) - 1);
      localStorage.setItem("money", money + price);
    } else {
    }
  };

  const getCoinCount = (name) => {
    const count = localStorage.getItem(name);
    if (count > 0) document.querySelector("#" + name).innerHTML = count;
    else document.querySelector("#" + name).innerHTML = 0;
  };

  return (
    <>
      <h3 className="text-center">Cryptocurrency Prices</h3>
      <Container>
        <Table responsive striped bordered hover className="tab">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24H Change</th>
              <th className="hide-mobile">Market Cap</th>
              <th>Buy/Sell</th>
            </tr>
          </thead>
          <tbody>
            {handleChange()
              .slice((page - 1) * 10, page * 15) // see the top 15 coin on the front page
              .map((coin) => (
                <tr key={coin.id}>
                  <td onClick={() => navigate(`/Coin/${coin.id}`)}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      style={{ width: 35, height: 35, margin: 5, padding: 1 }}
                    ></img>
                    {coin.symbol.toUpperCase()}
                  </td>
                  <td>{formatCurrency(coin.current_price)}</td>
                  <td>
                    <span
                      className={
                        coin.price_change_percentage_24h > 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {formatCurrency(coin.price_change_percentage_24h)}%
                    </span>
                  </td>
                  <td className="hide-mobile">
                    {formatCurrency(coin.market_cap)}
                  </td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        variant="success"
                        onClick={() => buyCoin(coin.name, coin.current_price)}
                      >
                        Buy
                      </Button>
                      <Button
                        variant="secondary"
                        disabled={true}
                        id={coin.name}
                        // onClick={getCoinCount(coin.name)}
                      >
                        {localStorage.getItem(coin.name) || 0}
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => sellCoin(coin.name, coin.current_price)}
                      >
                        Sell
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-center">
          <Pagination.First onClick={() => setPage(1)} />
          <Pagination.Prev onClick={() => setPage(page - 1)} />
          <Pagination.Item onClick={() => setPage(1)}>{1}</Pagination.Item>
          <Pagination.Item onClick={() => setPage(2)}>{2}</Pagination.Item>
          <Pagination.Item onClick={() => setPage(3)}>{3}</Pagination.Item>
          <Pagination.Item onClick={() => setPage(4)}>{4}</Pagination.Item>
          <Pagination.Item onClick={() => setPage(5)}>{5}</Pagination.Item>
          <Pagination.Next onClick={() => setPage(page + 1)} />
          <Pagination.Last onClick={() => setPage(5)} />
        </Pagination>
      </Container>
    </>
  );
};
export default CoinTable;
