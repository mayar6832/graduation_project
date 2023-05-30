import ProductSlider from "./../components/ProductSlider";
import CategoryButton from "./../components/CategoryButton";
import NavBar from "./../components/NavBar";
import Footer from "./../components/Footer";

const catCrousels = [
    "BestSelling",
    "NewReleases",
    "Mobile",
    "Tablet",
    "Beauty",
    "Sports",
    "Book"
];
function Search() {
    return (
        <>
            <NavBar />
            <CategoryButton />
            {catCrousels?.map((catCrousel, index) => (
                <ProductSlider catName={catCrousel} key={index} />
            ))}
            <Footer />
        </>
    );
}

export default Search;
