import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card as MUICard, CardContent, Stack} from "@mui/material";
import Button from "./Button";

const Card = ({children, onDelete, onSave, title}) => {
    return <MUICard sx={{mx: 'auto'}}>
        <Box
            sx={{
                px: 2,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography variant="h6">{title}</Typography>

            <Stack direction="row" spacing={1}>
                {onDelete && <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={onDelete}
                >
                    Delete
                </Button>}
                {onSave && <Button
                    variant="contained"
                    size="small"
                    onClick={onSave}
                >
                    Save
                </Button>}
            </Stack>
        </Box>

        <CardContent>
            {children}
        </CardContent>
    </MUICard>
}

export default Card;