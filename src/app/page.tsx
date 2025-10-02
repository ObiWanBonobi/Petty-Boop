import {Box, Typography} from "@mui/material";
import {Grid} from "@mui/system";

export default function Home() {
    return (
        <Box>
            <Grid container direction="row" spacing={3} sx={{justifyContent: "center", alignItems: "stretch"}}>
                <Grid size={6}>
                    <Typography>1</Typography>
                </Grid>
                <Grid size={6}>
                    <Typography>2</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
