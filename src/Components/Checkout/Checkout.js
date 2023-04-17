import { useContext, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { actionResetCart } from "../../global/actions";
import Context from "../../global/store";

const Checkout = () => {
    const { store: { checkoutId }, dispatch } = useContext(Context);
    const { uid } = useParams();
    useEffect(() => dispatch(actionResetCart()))
    if (!(checkoutId) || checkoutId !== uid) {
        return <Navigate to="/NoItemFound" replace={true} />
    }
    return (<>
        <div className="cart-empty">Payment successful</div>

    </>);
}
export default Checkout;