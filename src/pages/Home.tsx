import HeroCarousel from "../features/home/HeroCarousel";
import NewArrival from "../features/home/NewArrival";
import ProductList from "../features/product/components/ProductList";
import ProductRecommendation from "../features/product/components/ProductRecommendation";

function Home() {
  return (
    <div>
      <HeroCarousel />
      <NewArrival />
      <ProductList />
      <ProductRecommendation />
    </div>
  );
}

export default Home;
