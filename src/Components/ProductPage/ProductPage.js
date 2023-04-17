import { useContext, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import productsData from "../../data/product";
import { actionAddItem, actionDeleteItem, actionRemoveItem } from "../../global/actions";
import Context from "../../global/store";

const ProductPage = () => {
  const products = productsData || []
  const { proId } = useParams();
  const { store: { cart }, dispatch } = useContext(Context);
  const item = useMemo(() => products.find((_item) => (_item.id).toString() === proId) || {}, []);
  const isCart = useMemo(() => cart.some(_item => _item.id === item.id), [cart, item]);
  const cartItem = useMemo(() => cart.find(_item => _item.id === item.id), [cart, item]);

  if (!(item.id)) {
    return <Navigate to="/NoItemFound" replace={true} />
  }
  const { id,
    name,
    description,
    discount,
    price,
    feature } = item;
  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12">
          <picture className="product-thumbnail">
            <img className="img-thumbnail img-thumb-detail" src={`../assets/img/hero-carousel/${id}.jpg`} alt="" />
          </picture>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="well-middle">
            <div className="single-well">
              <h4 className="sec-head">{name}</h4>
              <p>
                {description}
              </p>
              <ul>
                {feature.map((_feature) => <li key={_feature}>
                  <i className="bi bi-check"></i> {_feature}
                </li>
                )}
              </ul>

            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <b >{`Rs. ${price}`}</b>
            {discount > 0 &&
              <i>{` (enjoy ${discount}% off extra)`}</i>}
          </div>
        </div>

      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12">
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          {!isCart && <button className="btn btn-sm btn-outline-warning button" onClick={() => dispatch(actionAddItem(item))}>Add to Cart {isCart && cartItem.qty}</button>}
          {isCart && (<>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                onClick={() => dispatch(actionRemoveItem(item))}
                type="button"
                className="btn btn-warning btn-sm"
              >
                -
              </button>
              <button type="button" className="btn btn-warning btn-sm">
                {cartItem.qty}
              </button>
              <button
                onClick={() => dispatch(actionAddItem(item))}
                type="button"
                className="btn btn-warning btn-sm"
              >
                +
              </button>
            </div>
            <button
              className="btn btn-sm"
              onClick={() => dispatch(actionDeleteItem(item))}
            >
              <i className="bi bi-trash3-fill yellow"></i>
            </button>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductPage;