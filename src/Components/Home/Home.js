import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../../data/product";
import ProductsList from "../ProductsList";

const Home = () => {
    const navigate = useNavigate();
    const offerProduct = useMemo(() => {
        const _list = (productsData || []).sort((a, b) => b.discount - a.discount).slice(0, 6) || []
        _list.length = _list.length > 5 ? 5 : _list.length;
        return _list;
    }, [productsData]);
    const [activeId, setActiveId] = useState("1");
    const [timeOutObj, setTimeOutObj] = useState(undefined);

    const setnext = () => {
        let idx = offerProduct.findIndex(item => item.id.toString() === activeId);
        idx = idx + 1;
        if (idx >= offerProduct.length) {
            idx = 0;
        }
        setActiveId(offerProduct[idx].id.toString());
    };

    const setback = () => {
        let idx = offerProduct.findIndex(item => item.id.toString() === activeId);
        idx = idx - 1;
        if (idx < 0) {
            idx = offerProduct.length - 1;
        }
        setActiveId(offerProduct[idx].id.toString());
    };

    const getActiveCalss = (id) => id === activeId ? "active" : "";

    useEffect(() => {
        if (timeOutObj) {
            clearTimeout(timeOutObj);
        }
        const _timeOutObj = setTimeout(() => {
            setnext();
        }, 5000);
        setTimeOutObj(_timeOutObj);
    }, [activeId])

    return (
        <>
            <section id="hero">
                <div className="hero-container">


                    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                        <ol id="hero-carousel-indicators" className="carousel-indicators">
                            {offerProduct.map(item => (
                                <li data-bs-target="#heroCarousel" key={item.id} onClick={() => setActiveId(item.id.toString())} className={`${getActiveCalss(item.id.toString())}`}></li>
                            ))}
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            {offerProduct.map(item => (
                                <div key={item.id} onClick={() => navigate(`/Product/${item.id}`)} className={`carousel-item ${getActiveCalss(item.id.toString())} `} style={{ "backgroundImage": `url(assets/img/banner/${item.id}.jpg)`,"backgroundSize": "100% 100%"}}>
                                    <div className="carousel-container">
                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#" role="button" data-bs-slide="prev" onClick={setback}>
                            <span className="carousel-control-prev-icon bi bi-chevron-left text-secondary" aria-hidden="true"></span>
                        </a>

                        <a className="carousel-control-next" href="#" role="button" data-bs-slide="next" onClick={setnext}>
                            <span className="carousel-control-next-icon bi bi-chevron-right text-secondary" aria-hidden="true"></span>
                        </a>

                    </div>
                </div>
            </section>
            <ProductsList />
        </>
    )
}

export default Home;