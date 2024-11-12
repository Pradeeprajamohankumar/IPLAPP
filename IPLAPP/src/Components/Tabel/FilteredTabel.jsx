import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./FilteredTable.css"; // Ensure this matches your CSS file name
import PointDistributionGraph from "../Graph/PointDistributionGraph"; // Update import
import TeamPerformanceGraph from "../Graph/TeamPerformanceGraph"; // Import the new graph

function FilteredTable({ filteredData }) {
    return (
        <div className="Table">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Logo</TableCell>
                            <TableCell>Team Name</TableCell>
                            <TableCell align="right">Matches</TableCell>
                            <TableCell align="right">Wins</TableCell>
                            <TableCell align="right">Losses</TableCell>
                            <TableCell align="right">Tied</TableCell>
                            <TableCell align="right">No Result</TableCell>
                            <TableCell align="right">Points</TableCell>
                            <TableCell align="right">Net Run Rate</TableCell>
                            <TableCell align="right">For Teams</TableCell>
                            <TableCell align="right">Against Teams</TableCell>
                            <TableCell align="right">Performance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <TableRow 
                                    key={index} 
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                                    className="MuiTableRow-root" // Add this class for the hover effect
                                >
                                    <TableCell component="th" scope="row">
                                        <img src={item.TeamLogo} alt={item.TeamName} className="team-logo" />
                                    </TableCell>
                                    <TableCell>{item.TeamName}</TableCell>
                                    <TableCell align="right">{item.Matches}</TableCell>
                                    <TableCell align="right">{item.Wins}</TableCell>
                                    <TableCell align="right">{item.Loss}</TableCell>
                                    <TableCell align="right">{item.Tied}</TableCell>
                                    <TableCell align="right">{item.NoResult}</TableCell>
                                    <TableCell align="right">{item.Points}</TableCell>
                                    <TableCell align="right">{item.NetRunRate}</TableCell>
                                    <TableCell align="right">{item.ForTeams}</TableCell>
                                    <TableCell align="right">{item.AgainstTeam}</TableCell>
                                    <TableCell align="right">{item.Performance}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={12}>No data available for selected filters.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="Graph">
                <PointDistributionGraph filteredData={filteredData} /> {/* Existing graph */}
                <TeamPerformanceGraph filteredData={filteredData} /> {/* New graph */}
            </div>
        </div>
    );
}

export default FilteredTable;
