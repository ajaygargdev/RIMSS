import { useState } from "react";
import { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { actionSearchText } from "../../global/actions";
import Context from "../../global/store";

const Header = () => {
  const { store: { cart }, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const count = useMemo(() => cart.reduce((prev, item) => prev + item.qty, 0), [cart]);
  const [timeOutObj, setTimeOutObj] = useState(undefined);

  const location = useLocation().pathname;
  const searchHandle = (e) => {
    if (location !== 'search') {
      navigate('/Search');
    }

    if (timeOutObj) {
      clearTimeout(timeOutObj);
    }
    const _timeOutObj = setTimeout(() => {
      dispatch(actionSearchText(e.target.value))
    }, 500);
    setTimeOutObj(_timeOutObj);

  }

  return (<>
    <div id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex justify-content-between">
        <div className="logo">
          <h1><a href="#" onClick={() => navigate('/')}><span>Y</span>Company</a></h1>
        </div>
        {!location.startsWith('/Checkout/') &&
          <>
            <input className="btn-get-started search" onChange={searchHandle} placeholder="Search products here.." />

            <nav id="navbar">
              <div className="btn-group" role="group" aria-label="Basic example">
             
                <button type="button" onClick={() => navigate('/cart')} className={`btn btn-outline-warning btn-lg ${Boolean(count) ? 'pe-0' :''} ${count > 0 ? 'active' : 'disabled'}`}>
               
                  <i className="bi bi-cart">
                  </i>
                </button>               
                {Boolean(count) && <button type="button" onClick={() => navigate('/cart')} className="btn btn-warning btn-lg ps-1 ${count > 0 ? 'active' : 'disabled'}">
                  {count + ' '}
                </button>}
              </div>
            </nav>
          </>
        }
      </div>
    </div>
  </>);
}
export default Header;