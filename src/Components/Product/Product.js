import { useNavigate } from "react-router-dom";

const Product = (props) => {
    const { id,
        name,
        discount,
        price } = props;
    const navigate = useNavigate();
    return (

        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
            <div >
                <div className="services-details">
                    <div className="single-services">
                        <picture className="product-thumbnail" onClick={() => navigate(`/Product/${id}`)}>
                            <img className="img-thumbnail img-thumb" src={`../assets/img/hero-carousel/${id}.jpg`} alt="" />
                        </picture>                       
                        <h4 role="button" onClick={() => navigate(`/Product/${id}`)}>{name}</h4>
                        <h6 role='button' onClick={() => navigate(`/Product/${id}`)}>{`Rs.${price} ${discount>0 ? `(${discount}% off)` :''}`}</h6>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Product;