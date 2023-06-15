import ProductSlider from "./../components/ProductSlider";
import CategoryButton from "./../components/CategoryButton";



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
            
            <CategoryButton />
            {catCrousels?.map((catCrousel, index) => (
                <ProductSlider catName={catCrousel} key={index} />
            ))}
            
        </>
    );
}

export default Search;
