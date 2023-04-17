import { useContext, useMemo } from "react";
import productsData from "../../data/product";
import Context from "../../global/store";
import Product from "../Product";

const Search = () => {
  const { store: { searchText } } = useContext(Context);
  const products = useMemo(() => productsData.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.category.toLowerCase().includes(searchText.toLowerCase()) || item.subcategory.toLowerCase().includes(searchText.toLowerCase())), [searchText])
  return (
    <div className="row">
      <div className="row text-center">
        {products.map(product => <Product key={product.id} {...product} />)}
      </div>
    </div>
  );
}
export default Search;