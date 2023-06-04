import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Input = styled(MuiInput)`
  maxwidth: 100px;
`;

function PriceFilter() {
  const [priceParams, setPriceParams] = useSearchParams();
  const handleChange = () => {
    priceParams.set("pricefrom", value[0])
    priceParams.set("priceto", value[1])
    setPriceParams(priceParams)
  }
  const minPrice = priceParams.get("pricefrom") ? +priceParams.get("pricefrom") : 0
  const maxPrice = priceParams.get("priceto") ? +priceParams.get("priceto") : 100000
  const [value, setValue] = React.useState([minPrice,maxPrice]);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value)
  const handleMinInputChange = (event) => {
    const minValue = Number(event.target.value);
    if (minValue > value[1]) {
      setValue([minValue, minValue]);
      return;
    }
    setValue([event.target.value === "" ? "" : minValue, value[1]]);
  };
  const handleMaxInputChange = (event) => {
    const maxValue = Number(event.target.value);
    if (maxValue < value[0]) {
      setValue([maxValue, maxValue]);
      return;
    }
    setValue([value[0], event.target.value === "" ? "" : maxValue]);
  };

  function valuetext(value) {
    return { value };
  }

  const handleResetPriceRange = () => {
    setValue([0, 100000]);
  };


  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "15%",
        padding: "20px",
        marginTop: "20px",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontWeight: "bold",
        }}
      >
        Filter by
      </Typography>
      <Typography
        sx={{
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        Price Range(EGP)
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
          }}
          onClick={handleResetPriceRange}
        >
          Reset
        </Button>
      </Typography>

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Slider
          min={0}
          max={100000}
          step={100}
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
      <Stack direction="row" width="100%" gap={5}>
        <Input
          value={value[0]}
          size="small"
          onChange={handleMinInputChange}
          inputProps={{
            step: 100,
            min: 0,
            max: 100000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
          sx={{ width: "50%" }}
        />
        <Input
          value={value[1]}
          size="small"
          onChange={handleMaxInputChange}
          inputProps={{
            //   step: 100,
            min: 0,
            max: 100000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
          sx={{ width: "50%" }}
        />
      </Stack>

      <Button
        variant="contained"
        sx={{
          textTransform: "capitalize",
          marginTop: "20px",
        }}
        onClick={handleChange}
      >
        Filter
      </Button>
    </Box>
  );
}
export default PriceFilter;
