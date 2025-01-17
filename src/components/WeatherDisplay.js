import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import OpacityIcon from "@mui/icons-material/Opacity";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import AirIcon from "@mui/icons-material/Air";
import "./styles.css";

const API_BASE_URL = "https://weather-monitoring-xqgs.onrender.com";

const WeatherDisplay = () => {
  const [data, setData] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}`);
        setData(response.data);

        // Update graph data
        setGraphData((prevData) => [
          ...prevData.slice(-19), // Keep only the last 20 entries
          {
            timestamp: new Date().toLocaleTimeString(),
            temperature: response.data.temperature,
            humidity: response.data.humidity,
            rain: response.data.rain,
            windSpeed: response.data.windSpeed,
          },
        ]);

        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Weather Monitoring Dashboard</h1>
      <div className="dashboard-cards">
        {/* Temperature */}
        <div className="weather-card">
          <WbSunnyIcon style={{ fontSize: "50px", color: "#FFA500" }} />
          <h3>Temperature</h3>
          <p>{data?.temperature || "N/A"} °C</p>
        </div>
        {/* Humidity */}
        <div className="weather-card">
          <OpacityIcon style={{ fontSize: "50px", color: "#007BFF" }} />
          <h3>Humidity</h3>
          <p>{data?.humidity || "N/A"} %</p>
        </div>
        {/* Rain */}
        <div className="weather-card">
          <InvertColorsIcon style={{ fontSize: "50px", color: "#00C853" }} />
          <h3>Rain</h3>
          <p>{data?.rain || "N/A"}</p>
        </div>
        {/* Wind Speed */}
        <div className="weather-card">
          <AirIcon style={{ fontSize: "50px", color: "#673AB7" }} />
          <h3>Wind Speed</h3>
          <p>{data?.windSpeed || "N/A"} m/s</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="chart-container">
        <h2>Temperature Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graphData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#FFA500" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2>Humidity Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graphData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="humidity" stroke="#007BFF" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2>Wind Speed Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graphData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="windSpeed" stroke="#673AB7" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherDisplay;
