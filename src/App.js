import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import apiClient from './apiClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faEdit, faTrash, faCheck, faHistory, faSyncAlt, faThList, faStore, faPlay } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce'; // Install lodash.debounce or use a custom debounce function

const App = () => {
  // State Definitions
  const [categories, setCategories] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeView, setActiveView] = useState('none');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [templateLayoutText, setTemplateLayoutText] = useState('');
  const [templateStylingText, setTemplateStylingText] = useState('');
  const [autoRegenerate, setAutoRegenerate] = useState(false);
  const [translations, setTranslations] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [newTranslationKey, setNewTranslationKey] = useState('');
  const [newTranslationValue, setNewTranslationValue] = useState('');
  const [editingMarketIndex, setEditingMarketIndex] = useState(null);
  const [newMarketName, setNewMarketName] = useState('');
  const [newMarketIdentifier, setNewMarketIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [payloadFilter, setPayloadFilter] = useState('');
  const [continuationToken, setContinuationToken] = useState(null);
  const [prevContinuationTokens, setPrevContinuationTokens] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState('All');
  const [generalSettingsTab, setGeneralSettingsTab] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIdentifier, setNewCategoryIdentifier] = useState('');
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);





// Function to handle category updates
const handleEditCategory = (index) => {
  setEditingCategoryIndex(index);
  setNewCategoryName(categories[index].name);
  setNewCategoryIdentifier(categories[index].identifier);
};

// Function to save category updates
const handleSaveCategory = async (index) => {
  const updatedCategory = {
    ...categories[index],
    Name: newCategoryName,
    Identifier: newCategoryIdentifier,
  };
  
  try {
    await apiClient.put('/configuration/categories', updatedCategory);
    showNotification('Category updated successfully', 'success');
    fetchCategories(); // Refresh categories after update
  } catch (error) {
    console.error('Error updating category:', error);
    showNotification('Error updating category', 'error');
  }

  setEditingCategoryIndex(null); // Reset editing state
};

// Function to delete a category
const handleDeleteCategory = async (index) => {
  const categoryId = categories[index].Identifier;
  
  try {
    await apiClient.delete(`/configuration/categories/${categoryId}`);
    showNotification('Category deleted successfully', 'success');
    fetchCategories(); // Refresh categories after deletion
  } catch (error) {
    console.error('Error deleting category:', error);
    showNotification('Error deleting category', 'error');
  }
};



  // Function to handle input change and auto-save
  const handleTranslationChange = (index, field, value) => {
    const updatedTranslations = [...translations];
    updatedTranslations[index][field] = value;
    setTranslations(updatedTranslations);
  };

  // Debounced save function to update translations state
  const debouncedHandleTranslationChange = debounce(handleTranslationChange, 10);

  // Show notification function
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  // Function to fetch categories from API
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/configuration/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      showNotification('Error fetching categories', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch markets based on selected category
  const fetchMarkets = useCallback(async (categoryIdentifier) => {
    if (!categoryIdentifier) return;
    setLoading(true);
    try {
      const response = await apiClient.get(`/configuration/categories/${categoryIdentifier}/markets`);
      setMarkets(response.data);
    } catch (error) {
      console.error('Error fetching markets:', error);
      showNotification('Error fetching markets', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch history with applied filters
  const fetchHistory = useCallback(async (statusFilter, start, end, payloadFilter, pageSize) => {
    setLoading(true);
    try {
      const params = {
        from: start.toISOString(),
        to: end.toISOString(),
        pageSize,
        status: statusFilter !== 'All' ? statusFilter : undefined,
        payload: payloadFilter || undefined,
      };
      const response = await apiClient.get('/configuration/history', { params });
      setHistory(response.data.histories);
      setContinuationToken(response.data.continuationToken || null);
    } catch (error) {
      console.error('Error fetching history:', error);
      showNotification('Error fetching history', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to handle clicking on a category
  const handleCategoryClick = useCallback(
    (category) => {
      setActiveView('markets');
      setSelectedCategory(category);
      setSelectedMarket(null);
      fetchMarkets(category.rowKey);
    },
    [fetchMarkets]
  );

  // Function to handle clicking on the general settings
  const handleGeneralSettingsClick = () => {
    setActiveView('settings');
    setGeneralSettingsTab(0);
  };

  // Function to handle clicking on a market
  const handleMarketClick = (market, index) => {
    setSelectedTab(0); // Default to the first tab
    setActiveView('details'); // Switch to details view
    setSelectedMarket(market); // Set the selected market

    // Safely parse settings and translations
    let parsedSettings = {};
    let parsedTranslations = [];

    try {
      if (market.settings && market.settings.trim().startsWith('{')) {
        parsedSettings = JSON.parse(market.settings);
      } else {
        console.warn('Settings is not a valid JSON string:', market.settings);
      }
    } catch (error) {
      console.error('Error parsing settings:', error);
    }

    try {
      if (market.translations && market.translations.trim().startsWith('[')) {
        parsedTranslations = JSON.parse(market.translations);
      } else {
        console.warn('Translations is not a valid JSON string:', market.translations);
      }
    } catch (error) {
      console.error('Error parsing translations:', error);
    }

    setTemplateLayoutText(market.templateLayout || '');
    setTemplateStylingText(market.styling || '');
    setTranslations(parsedTranslations);
    setAutoRegenerate(parsedSettings.allowAutoRegeneration || false);
    setNewMarketName(market.name || ''); // Set market name
    setNewMarketIdentifier(market.identifier || market.rowKey); // Set market identifier from either input or existing data
    setEditingMarketIndex(index);
  };

  // Function to save market details for a category
  const saveMarketForCategory = async (index) => {
    if (index === null || index < 0 || index >= markets.length) {
      console.error('Invalid market index:', index);
      showNotification('An issue occurred while saving the market', 'error');
      return;
    }

    const market = markets[index];
    if (!market) {
      showNotification('An issue occurred while saving the market', 'error');
      console.error('Market not found at index:', index);
      return;
    }

    // Ensure Name and Identifier are provided and not empty
    const marketName = newMarketName.trim() || market.name;
    const marketIdentifier = market.rowKey;

    if (!marketName) {
      console.error('Market Name is missing.');
      showNotification('Market Name is required', 'error');
      return;
    }

    if (!marketIdentifier) {
      console.error('Market Identifier is missing.');
      showNotification('Market Identifier is required', 'error');
      return;
    }

    // Prepare updated market object
    const updatedMarket = {
      partitionKey: selectedCategory?.rowKey || market.partitionKey, // Ensure correct category ID is used
      rowKey: marketIdentifier, // Use the Identifier as rowKey
      Name: marketName,
      Identifier: marketIdentifier,
      TemplateLayout: templateLayoutText,
      Styling: templateStylingText,
      Translations: JSON.stringify(translations),
      Settings: JSON.stringify({ allowAutoRegeneration: autoRegenerate }),
    };

    console.log(`Updating market for category ${selectedCategory?.rowKey}:`, updatedMarket);

    try {
      // Perform PUT request to update market
      const response = await apiClient.put(
        `/configuration/categories/${selectedCategory?.rowKey}/markets/${marketIdentifier}`,
        updatedMarket
      );
      console.log('Market updated successfully:', response.data);
      showNotification('Market updated successfully', 'success');

      // Re-fetch markets after successfully saving the market
      await fetchMarkets(selectedCategory?.rowKey);

      // Alternatively, directly update the markets state without re-fetching
      setMarkets((prevMarkets) => {
        const updatedMarkets = [...prevMarkets];
        updatedMarkets[index] = { ...market, ...updatedMarket };
        setSelectedMarket(updatedMarkets[index]);
        return updatedMarkets;
      });
    } catch (error) {
      console.error('Error updating market:', error.message);

      // Check for server validation errors
      if (error.response && error.response.data.errors) {
        console.error('Error details:', error.response.data.errors);

        const identifierError = error.response.data.errors.Identifier?.[0];
        if (identifierError) {
          showNotification(identifierError, 'error');
        }
      } else {
        showNotification('An issue occurred while updating the market', 'error');
      }
    }
  };

  // Function to add a new category with unique identifier check
  const addCategory = async () => {
    if (!newCategoryName || !newCategoryIdentifier) {
      showNotification('Both name and identifier are required', 'error');
      return;
    }

    // Check for unique identifier
    if (categories.some((cat) => cat.rowKey === newCategoryIdentifier)) {
      showNotification('Identifier must be unique', 'error');
      return;
    }

    const newCategory = {
      partitionKey: 'CategoryPartition', // or whatever your partition key is
      Identifier:newCategoryIdentifier,
      rowKey: newCategoryIdentifier,
      Name: newCategoryName,
    };

    try {
      await apiClient.post('/configuration/categories', newCategory);
      showNotification('Category added successfully', 'success');
      fetchCategories(); // Refresh the categories list
    } catch (error) {
      console.error('Error adding category:', error);
      showNotification('An issue occurred while adding the category', 'error');
    }
  };

  // Function to add a new market with unique identifier check
  const addMarket = async () => {
    if (!newMarketName || !newMarketIdentifier) {
      showNotification('Both name and identifier are required', 'error');
      return;
    }

    // Check for unique identifier
    if (markets.some((mkt) => mkt.rowKey === newMarketIdentifier)) {
      showNotification('Identifier must be unique', 'error');
      return;
    }

    const newMarket = {
      partitionKey: selectedCategory?.rowKey || 'MarketPartition', // or the relevant partition key
      rowKey: newMarketIdentifier,
      Name: newMarketName,
      Identifier: newMarketIdentifier,
    };

    try {
      await apiClient.post(`/configuration/categories/${selectedCategory?.rowKey}/markets`, newMarket);
      showNotification('Market added successfully', 'success');
      fetchMarkets(selectedCategory?.rowKey); // Refresh the markets list
    } catch (error) {
      console.error('Error adding market:', error);
      showNotification('An issue occurred while adding the market', 'error');
    }
  };

  // Function to add a new translation
  const handleAddTranslation = () => {
    setTranslations([...translations, { Key: '', Value: '' }]);
    setEditingRow(translations.length);
  };

  // Function to save a translation after editing
  const handleSaveTranslation = (index) => {
    const updatedTranslations = [...translations];
    updatedTranslations[index] = { Key: newTranslationKey, Value: newTranslationValue };
    setTranslations(updatedTranslations);
    setEditingRow(null);
  };

  // Function to start editing a translation
  const handleEditTranslation = (index) => {
    setEditingRow(index);
    setNewTranslationKey(translations[index].Key);
    setNewTranslationValue(translations[index].Value);
  };

  // Function to delete a translation
  const handleDeleteTranslation = (index) => {
    const updatedTranslations = [...translations];
    updatedTranslations.splice(index, 1);
    setTranslations(updatedTranslations);
  };

  // Function to toggle the auto-regeneration switch
  const handleToggleSwitch = () => {
    setAutoRegenerate(!autoRegenerate);
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch history with applied filters
  useEffect(() => {
    fetchHistory(status, startDate, endDate, payloadFilter, itemsPerPage);
  }, [fetchHistory, status, startDate, endDate, payloadFilter, currentPage, itemsPerPage]);

  return (
    <div className="App">
      <div className="container mx-auto p-4 grid grid-cols-12 gap-4">
        {/* Notification Component */}
        {notification.message && (
          <div
            className={`fixed top-4 right-4 p-4 rounded shadow-lg ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {notification.message}
          </div>
        )}
        {/* Sidebar - Categories */}
        <div className="bg-white shadow-md rounded-lg p-4 col-span-2 min-height-800">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={`${category.partitionKey}-${category.rowKey}`}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer p-2 rounded ${
                  selectedCategory?.rowKey === category.rowKey
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <ul className="space-y-2">
            <li
              className={`cursor-pointer p-2 rounded flex items-center ${
                activeView === 'settings'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={handleGeneralSettingsClick}
            >
              <FontAwesomeIcon icon={faCogs} className="mr-2" /> General Settings
            </li>
          </ul>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="col-span-3 flex justify-center items-center min-height-800">
            <div className="text-blue-500">Loading...</div>
          </div>
        ) : (
          <>
            {activeView === 'settings' && (
              <div className="bg-white shadow-md rounded-lg p-4 col-span-8 min-height-800">
                <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setGeneralSettingsTab(0)}
                    className={`px-4 py-2 rounded ${
                      generalSettingsTab === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faHistory} className="mr-2" />
                    History
                  </button>
                  <button
                    onClick={() => setGeneralSettingsTab(1)}
                    className={`px-4 py-2 rounded ${
                      generalSettingsTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                    Regenerate
                  </button>
                  <button
                    onClick={() => setGeneralSettingsTab(4)}
                    className={`px-4 py-2 rounded ${
                      generalSettingsTab === 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faThList} className="mr-2" />
                    Categories
                  </button>
                  <button
                    onClick={() => setGeneralSettingsTab(5)}
                    className={`px-4 py-2 rounded ${
                      generalSettingsTab === 5 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faStore} className="mr-2" />
                    Markets
                  </button>
                </div>
                <div className="tab-content">
                  {/* History Tab */}
                  {generalSettingsTab === 0 && (
                    <div className="history-tab mt-4">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <label className="block text-sm font-medium">Status</label>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                          >
                            <option value="All">All</option>
                            <option value="Error">Error</option>
                            <option value="Warning">Warning</option>
                            <option value="Information">Information</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="block text-sm font-medium mr-4">Range</label>
                          <div className="flex items-center">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              selectsStart
                              startDate={startDate}
                              endDate={endDate}
                              showTimeSelect
                              dateFormat="yyyy-MM-dd h:mm aa"
                              className="border border-gray-300 rounded px-2 py-1"
                            />
                            <span className="mx-2">to</span>
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              selectsEnd
                              startDate={startDate}
                              endDate={endDate}
                              minDate={startDate}
                              showTimeSelect
                              dateFormat="yyyy-MM-dd h:mm aa"
                              className="border border-gray-300 rounded px-2 py-1"
                            />
                          </div>
                        </div>
                        <button
                          className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => {
                            setStatus('All');
                            setStartDate(new Date());
                            setEndDate(new Date());
                            setPayloadFilter('');
                          }}
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <label className="block text-sm font-medium">Filter by Payload</label>
                          <input
                            type="text"
                            value={payloadFilter}
                            onChange={(e) => setPayloadFilter(e.target.value)}
                            placeholder="Filter Payload"
                            className="border border-gray-300 rounded p-2"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className={`px-3 py-1 rounded ${
                              currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'
                            }`}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                          <span>Page {currentPage}</span>
                          <button
                            className={`px-3 py-1 ${
                              continuationToken ? 'bg-blue-500 text-white' : 'bg-gray-300'
                            }`}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={!continuationToken}
                          >
                            Next
                          </button>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Items per page</label>
                          <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                          </select>
                        </div>
                      </div>
                      <div className="overflow-auto mt-4">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Payload
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                DateTime
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {history.map((item) => (
                              <tr key={`${item.partitionKey}-${item.rowKey}`}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.Status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.Payload}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.Timestamp).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* Regenerate Tab */}
                  {generalSettingsTab === 1 && (
                    <div className="mt-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => console.log('Start Regeneration')}>
                        <FontAwesomeIcon icon={faPlay} className="mr-2" />
                        Start Regeneration
                      </button>
                    </div>
                  )}
                  {/* Categories Tab */}
                  {generalSettingsTab === 4 && (
                    <div className="mt-4">
                      <h3 className="text-md font-semibold mb-2">Categories</h3>
                      <div className="flex space-x-2 mb-4">
                        <input
                          type="text"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="Category Name"
                          className="flex-grow border border-gray-300 rounded p-2"
                        />
                        <input
                          type="text"
                          value={newCategoryIdentifier}
                          onChange={(e) => setNewCategoryIdentifier(e.target.value)}
                          placeholder="Identifier"
                          className="flex-grow border border-gray-300 rounded p-2"
                        />
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={addCategory}
                        >
                          Add Category
                        </button>


                      </div>
                      <div>

                      <ul className="space-y-2">
        
                      {categories.map((category, index) => (
        <li key={`${category.partitionKey}-${category.rowKey}`} className="flex items-center justify-between p-2 border rounded">
          {editingCategoryIndex === index ? (
            <>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="border border-gray-300 rounded p-1 flex-grow"
              />
              <input
                type="text"
                value={newCategoryIdentifier}
                onChange={(e) => setNewCategoryIdentifier(e.target.value)}
                className="border border-gray-300 rounded p-1 flex-grow"
              />
              <button onClick={() => handleSaveCategory(index)} className="text-green-500 ml-2">
                Save
              </button>
            </>
          ) : (
            <>
              <span>{category.name}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleEditCategory(index)} className="text-blue-500">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteCategory(index)} className="text-red-500">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </>
          )}
        </li>
      ))}


          </ul>

                      </div>


                    </div>
                  )}
                  {/* Markets Tab */}
                  {generalSettingsTab === 5 && (
                    <div className="mt-4">
                      <h3 className="text-md font-semibold mb-2">Markets</h3>
                      <div className="flex space-x-2 mb-4">
                        <input
                          type="text"
                          value={newMarketName}
                          onChange={(e) => setNewMarketName(e.target.value)}
                          placeholder="Market Name"
                          className="flex-grow border border-gray-300 rounded p-2"
                        />
                        <input
                          type="text"
                          value={newMarketIdentifier}
                          onChange={(e) => setNewMarketIdentifier(e.target.value)}
                          placeholder="Identifier"
                          className="flex-grow border border-gray-300 rounded p-2"
                        />
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={addMarket}
                        >
                          Add Market
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Markets List */}
            {(activeView === 'markets' || activeView === 'details') && (
              <div className="bg-white shadow-md rounded-lg p-4 col-span-2 min-height-800">
                <h2 className="text-lg font-semibold mb-4">Markets</h2>
                <ul className="space-y-2">
                  {markets.map((market, index) => (
                    <li
                      key={`${market.partitionKey}-${market.rowKey}`}
                      onClick={() => handleMarketClick(market, index)}
                      className={`cursor-pointer p-2 rounded ${
                        selectedMarket?.rowKey === market.rowKey
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {market.name || 'Unnamed Market'}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Market Details */}
            {activeView === 'details' && selectedMarket && (
              <div className="bg-white shadow-md rounded-lg p-4 col-span-8 min-height-800">
                <h2 className="text-lg font-semibold mb-4">Details</h2>
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setSelectedTab(0)}
                    className={`px-4 py-2 rounded ${
                      selectedTab === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Template Layout
                  </button>
                  <button
                    onClick={() => setSelectedTab(1)}
                    className={`px-4 py-2 rounded ${
                      selectedTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faCogs} className="mr-2" />
                    Styling
                  </button>
                  <button
                    onClick={() => setSelectedTab(2)}
                    className={`px-4 py-2 rounded ${
                      selectedTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Translations
                  </button>
                  <button
                    onClick={() => setSelectedTab(3)}
                    className={`px-4 py-2 rounded ${
                      selectedTab === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    Settings
                  </button>
                </div>
                <div className="tab-content">
                  {selectedTab === 0 && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Template Layout</label>
                      <textarea
                        value={templateLayoutText}
                        onChange={(e) => setTemplateLayoutText(e.target.value)}
                        className="w-full h-40 border border-gray-300 rounded p-2"
                        placeholder="Edit Template Layout here..."
                      />
                    </div>
                  )}

                  {selectedTab === 1 && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Styling</label>
                      <textarea
                        value={templateStylingText}
                        onChange={(e) => setTemplateStylingText(e.target.value)}
                        className="w-full h-40 border border-gray-300 rounded p-2"
                        placeholder="Edit Styling here..."
                      />
                    </div>
                  )}

                  {selectedTab === 2 && (
                    <div className="mt-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                        onClick={handleAddTranslation}
                      >
                        + Add Translation
                      </button>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Key
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Translation
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {Array.isArray(translations) &&
                            translations.map((translation, index) => (
                              <tr key={`${translation.Key}-${index}`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <input
                                    type="text"
                                    value={translation.Key}
                                    onChange={(e) =>
                                      debouncedHandleTranslationChange(index, 'Key', e.target.value)
                                    }
                                    className="border border-gray-300 rounded p-2"
                                  />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <input
                                    type="text"
                                    value={translation.Value}
                                    onChange={(e) =>
                                      debouncedHandleTranslationChange(index, 'Value', e.target.value)
                                    }
                                    className="border border-gray-300 rounded p-2"
                                  />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2 justify-center">
                                  <button
                                    onClick={() => handleDeleteTranslation(index)}
                                    className="text-red-500 hover:text-red-700 flex items-center justify-center"
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      padding: 0,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {selectedTab === 3 && (
                    <div className="mt-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={autoRegenerate}
                          onChange={handleToggleSwitch}
                        />
                        <span className="ml-2">Allow automatic regeneration</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  onClick={() => saveMarketForCategory(editingMarketIndex)}
                >
                  Save
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;