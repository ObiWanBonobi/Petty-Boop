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
    TableHead, TableBody, Paper, Divider,
} from '@mui/material';
import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

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

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Name'},
        {field: 'handle', headerName: 'Handle'},
    ];

    const rows = [
        {id: 1, name: 'Snow', handle: 'Jon'},
        {id: 2, name: 'Lannister', handle: 'Cersei'},
        {id: 3, name: 'Lannister', handle: 'Jaime'},
        {id: 4, name: 'Stark', handle: 'Arya'},
        {id: 5, name: 'Targaryen', handle: 'Daenerys'},
        {id: 6, name: 'Melisandre', handle: 'ranod'},
        {id: 7, name: 'Clifford', handle: 'Ferrara'},
        {id: 8, name: 'Frances', handle: 'Rossini'},
        {id: 9, name: 'Roxie', handle: 'Harvey'},
    ];

    const paginationModel = {page: 0, pageSize: 10};

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
                    <Typography variant='h5' pb='15px'>Unfollow these ho's</Typography>
                    <DataGrid rows={rows} columns={columns} pageSizeOptions={[20, 50]} checkboxSelection
                              initialState={{pagination: {paginationModel}}} sx={{cursor: 'pointer'}}/>
                </Grid>
            </Grid>
        </Box>
    )
        ;
};

export default JsonUploader;
