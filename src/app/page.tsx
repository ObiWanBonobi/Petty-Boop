"use client";
import {useRef, useState} from 'react';
import {
    Button,
    TextField,
    Box,
    Typography,
    Grid,
    TableContainer,
    Table,
    TableCell,
    TableRow,
    TableHead, TableBody, Paper, Divider
} from '@mui/material';
import * as React from 'react';

const JsonUploader: React.FC = () => {
    const [jsonContent, setJsonContent] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/json') {
            setJsonContent('❌ Please select a valid JSON file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = e.target?.result as string;
                const parsed = JSON.parse(result);
                setJsonContent(JSON.stringify(parsed, null, 2)); // Pretty-print JSON
            } catch (error) {
                setJsonContent('❌ Error parsing JSON file.');
            }
        };
        reader.readAsText(file);
    };

    function createData(
        name: string,
        calories: number
    ) {
        return {name, calories};
    }

    const rows = [
        createData('Frozen yoghurt', 159),
        createData('Ice cream sandwich', 237),
        createData('Eclair', 262),];

    return (
        <Box sx={{width: '100vw', height: '100vw', backgroundColor: 'darkslateblue', p: 30}}>
            <Grid container direction="column" spacing={4} sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Grid container direction="row" spacing={5} sx={{backgroundColor: 'darksalmon', width: '50%', p: 5}}>
                    <Grid size={"grow"}>
                        <Button variant="contained" onClick={handleButtonClick}>
                            Upload Following
                        </Button>
                        <input
                            type="file"
                            accept=".json,application/json"
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                    </Grid>
                    <Grid size={"grow"}>
                        <Button variant="contained" onClick={handleButtonClick}>
                            Upload Followers
                        </Button>
                        <input
                            type="file"
                            accept=".json,application/json"
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                    </Grid>
                </Grid>
                <Grid sx={{backgroundColor: 'olive', p: 5}}>
                    <TableContainer component={Paper}>
                        <Table title='Unfollow these Bitches' stickyHeader>
                            <TableHead title='Unfollow these Bitches'>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Handle</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default JsonUploader;

// <Box>
//     <Grid container direction="row" spacing={3} sx={{justifyContent: "center", alignItems: "stretch"}}>
//         <Grid size={6}>
//             <Button
//                 variant="contained"
//                 onChange={handleButtonClick}
//             >
//                 Upload follower Json file
//             </Button>
//         </Grid>
//         <Grid size={6}>
//             <Typography>2</Typography>
//         </Grid>
//     </Grid>
//     <TextField
//         multiline
//         fullWidth
//         minRows={10}
//         margin="normal"
//         value={jsonContent}
//         InputProps={{readOnly: true}}
//     />
// </Box>
