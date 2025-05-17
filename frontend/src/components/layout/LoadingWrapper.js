import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

const LoadingWrapper = ({loading, children}) => {
    return loading ? <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress/>
    </Box> : children;
}

export default LoadingWrapper;