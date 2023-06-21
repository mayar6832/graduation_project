import { Grid } from '@mui/material'
import ProductCard from '../ProductCard'
import React,{useState} from 'react'
import Carousel from "react-simply-carousel";

const RecomendationSystem = ({recomendations}) => {


  const [activeSlide, setActiveSlide] = useState(0);
  
  return (
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
        containerProps={{
          style: {
            flexWrap: "nowrap",
          },
        }}
      >

        {recomendations && recomendations.map((recomendation, index) => (

          <ProductCard item={recomendation[0]} key={index} />
        ))}
      </Carousel>
  )
}

export default RecomendationSystem