import { useContext } from "react";
import { Layout } from "../../Components/Layout";
import { Card } from "../../Components/Card";
import { ProductDetail } from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {
  const { items, setsearchByTitle, searchByTitle, filteredItems } =
    useContext(ShoppingCartContext);

  const renderView = () => {
    const itemsToRender = searchByTitle?.length > 0 ? filteredItems : items;

    if (itemsToRender?.length > 0) {
      return itemsToRender.map((item) => <Card key={item.id} {...item} />);
    } else {
      return <p>No Results Found</p>;
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <input
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => setsearchByTitle(event.target.value)}
        type="text"
        placeholder="Search a product"
      />
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export { Home };
