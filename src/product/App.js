import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import apiClient from './apiClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faHistory, faThList, faPlay, faChevronDown, faChevronRight, faSpinner, faCircle } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const itemId = '3213124'; // Replace '3213124' with your actual constant item ID
  const currentCategory = 'flooring'; // Replace with your logic to determine the current category

  // State Definitions
  const [selectedItem, setSelectedItem] = useState(null);
  const [markets, setMarkets] = useState([]);
  const [versions, setVersions] = useState([]);
  const [jobs, setJobs] = useState([]); // Track all jobs for the queue
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [expandedMarkets, setExpandedMarkets] = useState({}); // Track expanded states for markets
  const [isCategoryValid, setIsCategoryValid] = useState(null); // Track if the category is valid
  const [selectedMarket, setSelectedMarket] = useState(''); // Track selected market
  const [todaysVersions, setTodaysVersions] = useState([]); // Track today's versions
  const [todaysPreviews, setTodaysPreviews] = useState([]); // Track today's previews

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
      // Update today's versions and previews after fetching
      fetchTodaysVersions(response.data);
    } catch (error) {
      console.error('Error fetching item versions:', error);
    }
  }, [itemId]);

  // Fetch today's versions
  const fetchTodaysVersions = useCallback((versionsData = versions) => {
    const today = new Date().toISOString().slice(0, 10);
    const filteredVersions = versionsData.filter((version) => version.timestamp.startsWith(today));
    setTodaysVersions(filteredVersions);

    // Filter previews from today's versions
    const filteredPreviews = filteredVersions.filter((version) => version.type === 'Preview');
    setTodaysPreviews(filteredPreviews);
  }, [versions]);

  // Check if the current category is valid
  const checkCategoryValidity = useCallback(async () => {
    try {
      const response = await apiClient.get('/configuration/categories');
      const validCategories = response.data.map((category) => category.identifier);
      setIsCategoryValid(validCategories.includes(currentCategory));
    } catch (error) {
      console.error('Error checking category validity:', error);
      setIsCategoryValid(false); // Default to false if there's an error
    }
  }, [currentCategory]);

  // Fetch jobs for all markets using a single endpoint
  const fetchJobsForAllMarkets = useCallback(async () => {
    try {
      const response = await apiClient.get(`/jobs/${itemId}`);
      const jobsData = response.data;

      // Filter jobs from today
      const today = new Date().toISOString().slice(0, 10);
      const todaysJobs = jobsData.filter((job) => job.timestamp.startsWith(today));

      setJobs(todaysJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }, [itemId]);

  useEffect(() => {
    fetchAllMarkets();
    checkCategoryValidity();
  }, [fetchAllMarkets, checkCategoryValidity]);

  useEffect(() => {
    if (selectedItem === 'Render TDS') {
      fetchVersions(); // Initial fetch of versions

      // Set up polling for versions
      const versionsInterval = setInterval(() => {
        fetchVersions();
      }, 5000); // Fetch versions every 5 seconds

      // Set up polling for jobs
      const jobsInterval = setInterval(() => {
        fetchJobsForAllMarkets();
      }, 5000); // Fetch jobs every 5 seconds

      // Clean up intervals on component unmount or change
      return () => {
        clearInterval(versionsInterval);
        clearInterval(jobsInterval);
      };
    }
  }, [selectedItem, fetchVersions, fetchJobsForAllMarkets]);

  // Render POST request function
  const handleRender = async (isPreview = false) => {
    try {
      await apiClient.post('/render', { preview: isPreview, market: selectedMarket });
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

  // Check if category validity is still loading
  if (isCategoryValid === null) {
    return <p>Loading...</p>;
  }

  // Display message if category is not valid
  if (!isCategoryValid) {
    return <p>The current category for this product is not supported.</p>;
  }

  // Render job status icon based on job status
  const renderJobStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FontAwesomeIcon icon={faSpinner} spin className="text-yellow-500" />;
      case 'Completed':
        return <FontAwesomeIcon icon={faCircle} className="text-green-500" />;
      case 'Registered':
        return <FontAwesomeIcon icon={faCircle} className="text-blue-500" />;
      case 'Failed':
        return <FontAwesomeIcon icon={faCircle} className="text-red-500" />;
      default:
        return null;
    }
  };

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
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleRender(false)}
                disabled={!selectedMarket}
              >
                Render
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleRender(true)}
                disabled={!selectedMarket}
              >
                Preview
              </button>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Select Market</label>
                <select
                  className="border border-gray-300 rounded p-2 w-full"
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  value={selectedMarket}
                >
                  <option value="">Select a Market</option>
                  {markets.map((market) => (
                    <option key={market.identifier} value={market.identifier}>
                      {market.name} ({market.identifier})
                    </option>
                  ))}
                </select>
              </div>

              <hr className="my-4" />

              {/* Queue Table */}
              <h3 className="text-md font-semibold mb-2">Queue</h3>
              <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Market
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{`${job.market} (${job.marketId})`}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{job.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{renderJobStatusIcon(job.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(job.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr className="my-4" />

              {/* Table for Today's Versions */}
              <h3 className="text-md font-semibold mb-2">Today's Versions</h3>
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
                  {todaysVersions.map((version) => (
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

              <hr className="my-4" />

              {/* Table for Today's Previews */}
              <h3 className="text-md font-semibold mb-2">Today's Previews</h3>
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
                  {todaysPreviews.map((preview) => (
                    <tr key={`${preview.fileName}${preview.rowKey}`}>
                      <td className="px-6 py-4 whitespace-nowrap">{preview.rowKey}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{preview.market}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(preview.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={preview.uri} className="text-blue-500" download>
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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