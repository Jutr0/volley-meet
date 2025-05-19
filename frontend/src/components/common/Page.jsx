import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "./Breadcrumbs";

const Page = ({children, path, title}) => {

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{padding: 2, borderBottom: 1, borderColor: 'divider'}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {title}
                </Typography>
                <Breadcrumbs pathSegments={path}/>
            </Box>
            <Box>buttons</Box>

            <Box sx={{padding: 2}}>
                {children}
            </Box>
        </Box>
    );
};

export default Page;