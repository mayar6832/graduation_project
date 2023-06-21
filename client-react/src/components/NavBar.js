import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setPageType } from "state";
import Divider from "@mui/material/Divider";
import { setLogout, setUpdatedUser } from "state";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { delNotification, getUserNotifications } from "../axios";
import { useEffect } from "react";


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(50),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const [notifications, setNotifications] = React.useState([]);

  const globalUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (globalUser) {
      const interval = setInterval(() => {
        // Fetch the user notifications every 5 seconds
        console.log(globalUser._id);
        getUserNotifications(globalUser._id)
          .then((response) => {
            console.log(response.data);
            setNotifications(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 5000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);

  const handleNotiMenuOpen = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleNotiMenuClose = async () => {
    delNotification(globalUser._id);
    setAnchorEl3(null);
  };





  const name = globalUser
    ? `${globalUser?.firstName} ${globalUser?.lastName}`
    : "";



  const open = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl2(null);
  };
  const handelSignOut = (event) => {
    handleClose();
    dispatch(setLogout());
  };
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState(searchParams.get("q"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchValue}`);
    }
  };
  React.useEffect(() => {
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams]);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMenuClose = () => {

    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const wishList = () => {
    handleMenuClose();
    navigate('/wish');

  }
  const reviewss = () => {
    handleMenuClose();
    navigate('/myReviews');

  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isAuth ? (
        <>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="register"
              color="inherit"
            ></IconButton>
            <p>Register</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="login"
              color="inherit"
            ></IconButton>
            <p>Login</p>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <Button
              variant="text"
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ color: "black", textTransform: "capitalize" }}
            >
              {name}
            </Button>
          </MenuItem>

          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl2}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              component={RouterLink}
              to="/profile"
              onClick={handleClose}
              disableRipple
            >
              My Profile
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/wish"
              onClick={handleClose}
              disableRipple
            >
              My WishList
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/myReviews"
              onClick={handleClose}
              disableRipple>
              My Reviews
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/coupon"
              onClick={handleClose}
              disableRipple
            >
              My Coupons
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={handelSignOut} disableRipple>
              Sign out
            </MenuItem>
          </StyledMenu>

          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotiMenuOpen}
            >
              <Badge badgeContent={notifications ? notifications.length : 0} color="error">
                <NotificationsIcon />
              </Badge>

            </IconButton>
            <Menu
              anchorEl={anchorEl3}
              open={Boolean(anchorEl3)}
              onClose={handleNotiMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              style={{ marginTop: 10 }}
            >
              {notifications && notifications.length ? notifications.map((notification) => <MenuItem

                key={notification}
                component={RouterLink}
                to="/coupon"
                onClick={handleNotiMenuClose}>{notification}</MenuItem>) : <MenuItem onClick={handleNotiMenuClose}>no new notifications</MenuItem>}
            </Menu>
          </MenuItem>
        </>
      )}
    </Menu>
  );
  const handleLogin = () => {
    dispatch(setPageType("login"));
    navigate("/auth");
  };

  const handleRegister = () => {
    dispatch(setPageType("register"));
    navigate("/auth");
  };

  return (
    <Box >
      <AppBar position="static" style={{ background: "#a2a7a7" }}>
        <Toolbar>
          <RouterLink to={"/"} style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              color="#090979"
              sx={{ display: { xs: "block", sm: "block" }, mr: 4, ml: 2 }}
            >
              MEMQ
            </Typography>
          </RouterLink>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              value={searchValue}
              onKeyDown={handleSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!isAuth ? (
              <>
                <Button
                  variant="contained"
                  aria-label="register"
                  sx={{
                    marginLeft: "auto",
                    backgroundColor: "#2F77C6",
                    textTransform: "capitalize",
                  }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: 1,
                    backgroundColor: "#2F77C6",
                    textTransform: "capitalize",
                  }}
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ color: "white", textTransform: "capitalize" }}
                >
                  {name}
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl2}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={handleClose}
                    disableRipple
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/wish"
                    onClick={handleClose} disableRipple>
                    My Wish Lists
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/myReviwes"
                    onClick={handleClose} disableRipple>
                    My Reviews
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />

                  <MenuItem onClick={handelSignOut} disableRipple>
                    Sign out
                  </MenuItem>
                </StyledMenu>
                <IconButton
                  size="large"

                  color="inherit"
                  onClick={handleNotiMenuOpen}
                >
                  <Badge badgeContent={notifications && notifications.length} color="error">
                    <NotificationsIcon />
                  </Badge>

                </IconButton>
                <Menu
                  anchorEl={anchorEl3}
                  open={Boolean(anchorEl3)}
                  onClose={handleNotiMenuClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {notifications.length && notifications.map((notification) => <MenuItem
                    component={RouterLink}
                    to="/coupon"
                    key={notification}
                    onClick={handleNotiMenuClose}
                  >{notification}</MenuItem>)}
                </Menu>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
