import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productsData from "../../data/product";
import { grouping } from "../../util";
import Product from "../Product";

const ProductsList = () => {
  const [data, setData] = useState([]);
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search])
  const navigate = useNavigate();

  useEffect(() => {
    const products = productsData || [];
    const _searchCatag = query.get('category') || '';
    const _searchSubCatag = query.get('subcategory') || '';
    const catagorisedProduct = grouping(products, 'category').filter((item => item[0].includes(_searchCatag)));
    const subcategorisedProduct = catagorisedProduct.map((catObj) => [catObj[0], grouping(catObj[1], 'subcategory').filter((item => item[0].includes(_searchSubCatag)))]);
    console.log('search',search);
    console.log(subcategorisedProduct);
    setData(subcategorisedProduct);
  }, [search])

  return (
    <>
      {data.map(catObj => <>
        <div role="button" onClick={() => navigate(`/Group?category=${catObj[0]}`)} key={catObj[0]} className="p-3 mt-2 bg-primary text-center">
          <h4 className="text-white">{catObj[0]}
          </h4>
        </div>
        {catObj[1].map(subCatObj => (<div key={subCatObj[0]} className="row">
          <div role="button" onClick={() => navigate(`/Group?category=${catObj[0]}&subcategory=${subCatObj[0]}`)} className="p-3 mb-2 bg-secondary"><h5 className="text-white">{subCatObj[0]}</h5></div>

          <div className="row text-center">
            {subCatObj[1].map(product => <Product key={product.id} {...product} />)}
          </div>
        </div>
        ))}</>)}
    </>

  );
}
export default ProductsList;