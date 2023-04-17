import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { actionSetCheckout } from "../../global/actions";
import Context from "../../global/store";
import CartItem from "../CartItem";

const Cart = () => {
  const { store: { cart }, dispatch } = useContext(Context);
  const TotalAmount = useMemo(() => cart.reduce((amount, item) => amount + ((item.qty * item.price) * (100 - item.discount)) / 100, 0), [cart]);
  const navigate = useNavigate();
  const checkout = () => {
    const uid = Date.now().toString();
    dispatch(actionSetCheckout(uid));
    navigate(`/Checkout/${uid}`, true)
  }
  return (<>
    <div className="cart">
      {TotalAmount > 0 && (
        <div className="">
          <div className="row">
            <div className="col-4">
            </div>
            <h5 className="col-10"></h5>
            <h5 className="col-2"></h5>
          </div>
          {cart.map(item => <CartItem key={item.id} item={item} />)}
          <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12"></div>
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><b>Total: Rs.{TotalAmount}</b></div>
          </div>
          <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><button className="btn btn-warning" onClick={checkout}>
              Checkout
            </button></div>

          </div>
        </div>
      )}
      {TotalAmount === 0 && (
        <div className="cart-empty">Cart is empty add to product</div>
      )}

    </div>
  </>);
}
export default Cart;