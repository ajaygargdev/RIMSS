import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { actionAddItem, actionDeleteItem, actionRemoveItem } from "../../global/actions";
import Context from "../../global/store";

const CartItem = (props) => {
    const { dispatch } = useContext(Context);
    const { item: { id, name, qty, discount, price } } = props;
    const amount = useMemo(() => (qty * price) * (100 - discount) / 100, [qty, discount, price]);
    const navigate = useNavigate();
    return (<>
        <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 d-none d-sm-block d-xs-block">
                <picture className="product-thumbnail" role='button' onClick={() => navigate(`/Product/${id}`)}>
                    <img className="img-thumbnail" style={{ "height": "150px", "width": "150px" }} src={`../assets/img/hero-carousel/${id}.jpg`} alt="" />
                </picture>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div className="col-12">
                    {name}
                </div>
                <div className="col-12">
                    {`Rs.${price} (${discount}% off)`}
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button
                        onClick={() => dispatch(actionRemoveItem(props.item))}
                        type="button"
                        className="btn btn-warning btn-sm"
                    >
                        -
                    </button>
                    <button type="button" className="btn btn-warning btn-sm">
                        {qty}
                    </button>
                    <button
                        onClick={() => dispatch(actionAddItem(props.item))}
                        type="button"
                        className="btn btn-warning btn-sm"
                    >
                        +
                    </button>
                </div>
                <button
                    className="btn btn-sm"
                    onClick={() => dispatch(actionDeleteItem(props.item))}
                >
                    <i className="bi bi-trash3-fill yellow"></i>
                </button>

            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">{`Rs. ${amount}`}</div>


        </div>
    </>);
}
export default CartItem;