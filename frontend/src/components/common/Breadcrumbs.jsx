import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router";
import Typography from "@mui/material/Typography";


const Breadcrumbs = ({pathSegments = []}) => {

    return <MUIBreadcrumbs aria-label="breadcrumb">
        {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;

            return isLast ? (
                <Typography key={segment} color="text.primary">
                    {segment.label}
                </Typography>
            ) : (
                <Link
                    key={segment}
                    component={RouterLink}
                    to={segment.url}
                    underline="hover"
                    color="inherit"
                >
                    {segment.label}
                </Link>
            );
        })}
    </MUIBreadcrumbs>
}

export default Breadcrumbs;