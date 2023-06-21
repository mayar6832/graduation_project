import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import UserWidget from "scences/widgets/UserWidget";


const ProfilePage = () => {
  const dispatch = useDispatch();
  // const { userId } = useParams();
  const theme = useTheme();
  // const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
     
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <UserWidget />
      </Box>
    
    </Box>
  );
};

export default ProfilePage;
