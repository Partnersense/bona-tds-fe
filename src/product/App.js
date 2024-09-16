import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import apiClient from './apiClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faHistory, faThList, faPlay, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  // Constant itemId for fetching versions
  const itemId = '3213124'; // Replace '3213124' with your actual constant item ID

  // State Definitions
  const [selectedItem, setSelectedItem] = useState(null);
  const [markets, setMarkets] = useState([]);
  const [versions, setVersions] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [expandedMarkets, setExpandedMarkets] = useState({}); // Track expanded states for markets

  // Show notification function
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  // Fetch all unique markets
  const fetchAllMarkets = useCallback(async () => {
    try {
      const response = await apiClient.get('/configuration/markets/unique');
      setMarkets(response.data);
    } catch (error) {
      console.error('Error fetching all markets:', error);
    }
  }, []);

  // Fetch versions for the selected item using itemId
  const fetchVersions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/configuration/items/${itemId}/versionHistory`);
      setVersions(response.data);
    } catch (error) {
      console.error('Error fetching item versions:', error);
    }
  }, [itemId]);

  useEffect(() => {
    fetchAllMarkets();
  }, [fetchAllMarkets]);

  useEffect(() => {
    if (selectedItem === 'Versions') {
      fetchVersions();
    }
  }, [selectedItem, fetchVersions]);

  // Render POST request function
  const handleRender = async (isPreview = false) => {
    try {
      await apiClient.post('/render', { preview: isPreview });
      showNotification(isPreview ? 'Preview job created' : 'Render job created', 'success');
    } catch (error) {
      console.error('Error creating render job:', error);
      showNotification('Error creating render job', 'error');
    }
  };

  // Handle clicking on sidebar items
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Toggle the expanded state of a market
  const toggleMarket = (market) => {
    setExpandedMarkets((prev) => ({
      ...prev,
      [market]: !prev[market],
    }));
  };

  // Group versions by market
  const groupedVersions = versions.reduce((acc, version) => {
    const { market } = version;
    if (!acc[market]) acc[market] = [];
    acc[market].push(version);
    return acc;
  }, {});

  return (
    <div className="App">
      <div className="container mx-auto p-4 grid grid-cols-12 gap-4">
        {/* Notification Component */}
        {notification.message && (
          <div
            className={`fixed top-4 right-4 p-4 rounded shadow-lg flex items-center ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : notification.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <span>{notification.message}</span>
          </div>
        )}

        {/* Sidebar - First Pane */}
        <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <ul className="space-y-2">
            {['Render TDS', 'Changes', 'Versions', 'Settings'].map((item) => (
              <li
                key={item}
                onClick={() => handleItemClick(item)}
                className={`cursor-pointer p-2 rounded ${
                  selectedItem === item ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Second Pane */}
        <div className="bg-white shadow-md rounded-lg p-4 col-span-10">
          {selectedItem === 'Render TDS' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Render TDS</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleRender(false)}>
                Render
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleRender(true)}>
                Preview
              </button>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Select Market</label>
                <select className="border border-gray-300 rounded p-2 w-full">
                  {markets.map((market) => (
                    <option key={market.Identifier} value={market.Identifier}>
                      {market.Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {selectedItem === 'Changes' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Changes</h2>
              <p>Content will be added here in the future.</p>
            </div>
          )}

          {selectedItem === 'Versions' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Versions</h2>
              {Object.entries(groupedVersions).map(([market, versions]) => (
                <div key={market} className="mb-4">
                  <div
                    className="flex items-center justify-between cursor-pointer p-2 bg-gray-100 rounded"
                    onClick={() => toggleMarket(market)}
                  >
                    <h3 className="text-md font-semibold">
                      {market} ({versions.length})
                    </h3>
                    <FontAwesomeIcon icon={expandedMarkets[market] ? faChevronDown : faChevronRight} />
                  </div>
                  {expandedMarkets[market] && (
                    <table className="min-w-full divide-y divide-gray-200 mt-2">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            File Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Market
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timestamp
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Download
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {versions.map((version) => (
                          <tr key={`${version.fileName}${version.rowKey}`}>
                            <td className="px-6 py-4 whitespace-nowrap">{version.rowKey}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{version.market}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(version.timestamp).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a href={version.uri} className="text-blue-500" download>
                                Download
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          )}

          {selectedItem === 'Settings' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <p>Settings content will go here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;