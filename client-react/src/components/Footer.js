import React, { FC, ReactElement } from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Stack from "@mui/material/Stack";

const style = {
  links: {
    paddingRight: "20px",
  },
  main: {
    display: "flex",
    justifyContent: "space-between",
  },
  child: {
    display: "inline-block",
  },
  icon: {},
};

function Footer() {

  return (
    <div className="footer">
      <Stack
        pt="1rem"
        pb="1rem"
        borderTop="1px outset #BDBDBD"
        mt="auto"
        height="40px"
        direction="row"
        width="100%"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        <Stack direction="row" alignItems="center" gap={1} pl="1rem"  >
          <CopyrightIcon color="action" />
          <Typography color="textSecondary" variant="subtitle1">
            {`${new Date().getFullYear()} | MEMQ . All rights reserved.`}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} pr="1rem" >
          <Link href="#" className="links" style={style.links}>
            <FacebookIcon />
          </Link>
          <Link href="#" className="links" style={style.links}>
            <InstagramIcon sx={{ color: "black" }} />
          </Link>
          <Link href="#" className="links" style={style.links}>
            <TwitterIcon sx={{ color: "#63D1F4" }} />
          </Link>
        </Stack>
      </Stack>
      <Stack
        pt="1rem"
        pb="1rem"
        borderTop="1px outset #BDBDBD"
        mt="auto"
        height="40px"
        direction="row"
        width="100%"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <Stack direction="row" alignItems="center" gap={1} pr="1rem" >
          <Link href="#" className="links" style={style.links}>
            <FacebookIcon />
          </Link>
          <Link href="#" className="links" style={style.links}>
            <InstagramIcon sx={{ color: "black" }} />
          </Link>
          <Link href="#" className="links" style={style.links}>
            <TwitterIcon sx={{ color: "#63D1F4" }} />
          </Link>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} pl="1rem"  >
          <CopyrightIcon color="action" />
          <Typography color="textSecondary" variant="subtitle1">
            {`${new Date().getFullYear()} | MEMQ . All rights reserved.`}
          </Typography>
        </Stack>
      </Stack>
    </div>


  );
}

export default Footer;