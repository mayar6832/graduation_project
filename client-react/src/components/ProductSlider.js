import React from "react";
import Carousel from "react-simply-carousel";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { Stack } from "@mui/system";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProductSlider({ catName }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getProduct = () => {
      axios
        .post(
          `http://localhost:3001/product/${
            catName === "BestSelling" || catName === "NewReleases"
              ? "search_product"
              : "search_category"
          }?limit=${12}`,
          {
            ...(catName !== "BestSelling" &&
              catName !== "NewReleases" && { search: catName }),
            ...(catName !== "BestSelling" && { isBestSeller: true }),
            ...(catName !== "NewReleases" && { newrelease: true }),
          }
        )
        .then((res) => {
          setItems(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProduct();
  }, [catName]);
  const styles = {
    header: {
      display: "flex",
      justifyContent: "center",
    },
    main: {
      border: "1px outset #BDBDBD",
      backgroundColor: "#EDEDED",
      padding: "5px",
      display: "flex",
      justifyContent: "space-between",
      width: "1250px",
      marginTop: "10px",
    },
    child: {
      display: "inline-block",
      border: "none",
      backgroundColor: "#EDEDED",
      fontSize: "20px",
    },
  };
  return (
    <Stack direction={"column"} pb={5}>
      <div className="header" style={styles.header}>
        <div className="main" style={styles.main}>
          <h2 className="child" style={styles.child}>
            {catName}
          </h2>
          <Link
            className="more"
            to={
              catName !== "BestSelling" && catName !== "NewReleases"
                ? `category/${encodeURIComponent(catName)}`
                : `/${encodeURIComponent(catName)}`
            }
          >
            More
          </Link>
        </div>
      </div>

      <Carousel
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        itemsToShow={4}
        itemsToScroll={2}
        forwardBtnProps={{
          style: {
            alignSelf: "center",
            border: "none",
            color: "#BDBDBD",
            cursor: "pointer",
            fontSize: "20px",
            height: 50,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          style: {
            alignSelf: "center",
            border: "none",
            color: "#BDBDBD",
            cursor: "pointer",
            fontSize: "20px",
            height: 50,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 4,
            itemsToScroll: 2,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
        infinite={false}
      >
        {items.map((item, index) => (
          <ProductCard item={item} key={index} />
        ))}
      </Carousel>
      <div className="header" style={styles.header}>
        <hr className="line" style={styles.line}></hr>
      </div>
    </Stack>
  );
}

export default ProductSlider;
