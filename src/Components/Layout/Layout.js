import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

const Layout = () => {
    return (<>
        <div className="header">
            <Header />
        </div>
        <div className="main">
            <Outlet />
        </div>
        <div className="footer">
            <Footer />
        </div>
    </>);
}
export default Layout;