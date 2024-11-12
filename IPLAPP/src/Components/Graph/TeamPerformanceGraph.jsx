import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { PieChart } from '@mui/x-charts/PieChart';
import '../Dropdown/DropdownMenu.css';

const TeamPerformanceGraph = () => {
  const [data, setData] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(teamOptions[0]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.mockachino.com/5db99bd2-28c5-46/ipl/table');
      setData(response.data.points);
      extractTeamOptions(response.data.points);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const extractTeamOptions = (data) => {
    const uniqueTeams = [...new Set(data.map(item => item.TeamName))];
    setTeamOptions(uniqueTeams);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate total wins and losses for the selected team
  const totalWins = data
    .filter(item => item.TeamName === selectedTeam)
    .reduce((sum, item) => sum + item.Wins, 0);

  const totalLosses = data
    .filter(item => item.TeamName === selectedTeam)
    .reduce((sum, item) => sum + item.Loss, 0);

  // Prepare data for the pie chart
  const performanceData = selectedTeam ? [
    { label: 'Wins', value: totalWins },
    { label: 'Losses', value: totalLosses },
  ] : [];

  const pieParams = {
    height: 200,
    margin: { right: 5 },
    slotProps: { legend: { hidden: true } },
  };

  return (
    <div>
      <h2>Team Performance</h2>
      <Dropdown 
        options={teamOptions}
        onChange={(option) => setSelectedTeam(option.value)}
        value={selectedTeam || "Select a team"}
        placeholder="Select a team"
        className="dropdown"
      />
      {performanceData.length > 0 ? (
        <PieChart
          series={[{ data: performanceData }]}
          {...pieParams}
        />
      ) : (
        <p>Please select a team to see the performance.</p>
      )}
    </div>
  );
};

export default TeamPerformanceGraph;
