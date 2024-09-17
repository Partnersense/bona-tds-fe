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
    const [editingTranslationIndex, setEditingTranslationIndex] = useState(null);
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
    const [addingTranslation, setAddingTranslation] = useState(false);
    const [AllMarkets, setAllMarkets] = useState([]);




  
    // Show notification function
    const showNotification = (message, type = 'success') => {
      setNotification({ message, type });
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 3000);
    };




    

      // Function to handle translation updates
  const handleEditTranslation = (index) => {
    setEditingTranslationIndex(index);
    setNewTranslationKey(translations[index].Key);
    setNewTranslationValue(translations[index].Value);
  };

  // Function to save translation updates
  const handleSaveTranslation = (index) => {
    if (!newTranslationKey.trim()) {
      showNotification('Translation Key cannot be empty', 'error');
      return;
    }

    // Check for unique key
    const isDuplicateKey = translations.some(
      (translation, idx) => translation.Key === newTranslationKey && idx !== index
    );
    if (isDuplicateKey) {
      showNotification('Translation Key must be unique', 'error');
      return;
    }

    const updatedTranslations = [...translations];
    updatedTranslations[index] = { Key: newTranslationKey, Value: newTranslationValue };

    setTranslations(updatedTranslations);
    setEditingTranslationIndex(null);
    showNotification('Translation updated successfully', 'success');
  };

  // Function to delete a translation
  const handleDeleteTranslation = (index) => {
    const updatedTranslations = [...translations];
    updatedTranslations.splice(index, 1);
    setTranslations(updatedTranslations);
    showNotification('Translation deleted successfully', 'success');
  };

  // Function to add a new translation
  const addTranslation = () => {
    if (!newTranslationKey.trim() || !newTranslationValue.trim()) {
      showNotification('Both key and value are required', 'error');
      return;
    }

    // Check for unique key
    const isDuplicateKey = translations.some((translation) => translation.Key === newTranslationKey);
    if (isDuplicateKey) {
      showNotification('Translation Key must be unique', 'error');
      return;
    }

    setTranslations([...translations, { Key: newTranslationKey, Value: newTranslationValue }]);
    setNewTranslationKey('');
    setNewTranslationValue('');
    setAddingTranslation(false);
    showNotification('Translation added successfully', 'success');
  };

  // Function to cancel adding a translation
  const cancelAddTranslation = () => {
    setAddingTranslation(false);
    setNewTranslationKey('');
    setNewTranslationValue('');
  };

  
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
      const categoryId = categories[index].identifier;
  
      try {
        await apiClient.delete(`/configuration/categories/${categoryId}`);
        showNotification('Category deleted successfully', 'success');
        fetchCategories(); // Refresh categories after deletion
      } catch (error) {
        console.error('Error deleting category:', error);
        showNotification('Error deleting category', 'error');
      }
    };
  

  
    // Function to add a new translation
    const handleAddTranslation = () => {
      if (!newTranslationKey.trim()) {
        showNotification('Translation Key cannot be empty', 'error');
        return;
      }
  
      // Check for unique key
      const isDuplicateKey = translations.some((translation) => translation.Key === newTranslationKey);
      if (isDuplicateKey) {
        showNotification('Translation Key must be unique', 'error');
        return;
      }
  
      setTranslations([...translations, { Key: newTranslationKey, Value: newTranslationValue }]);
      setEditingTranslationIndex(translations.length);
      showNotification('Translation added successfully', 'success');
    };
  
    // Function to handle input change and auto-save
    const handleTranslationChange = (index, field, value) => {
      const updatedTranslations = [...translations];
      updatedTranslations[index][field] = value;
      setTranslations(updatedTranslations);
    };
  
    // Debounced save function to update translations state
    const debouncedHandleTranslationChange = debounce(handleTranslationChange, 10);

      // Function to handle market updates
  const handleEditMarket = (index) => {
    setEditingMarketIndex(index);
    setNewMarketName(markets[index].name);
    setNewMarketIdentifier(markets[index].identifier);
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
  
// Fetch all markets once on component mount
const fetchAllMarkets = useCallback(async () => {
  setLoading(true);
  try {
    const response = await apiClient.get('/configuration/markets/unique');
    setAllMarkets(response.data);
    
    // Log all markets to the console
    console.log('Fetched Markets:', response.data);
  } catch (error) {
    console.error('Error fetching all markets:', error);
  } finally {
    setLoading(false);
  }
}, []);



  // Update a market and sync changes to both collections
  const updateMarket = async (updatedMarket) => {
      try {
          await apiClient.put(`/configuration/markets/${updatedMarket.identifier}`, updatedMarket);
          setAllMarkets((prev) =>
              prev.map((market) => (market.Identifier === updatedMarket.identifier ? updatedMarket : market))
          );
          setMarkets((prev) =>
              prev.map((market) => (market.Identifier === updatedMarket.identifier ? updatedMarket : market))
          );
      } catch (error) {
          console.error('Error updating market:', error);
      }
  };

  // Delete a market from both collections
  const deleteMarket = async (marketId) => {
      try {
          await apiClient.delete(`/configuration/markets/${marketId}`);
          setAllMarkets((prev) => prev.filter((market) => market.identifier !== marketId));
          setMarkets((prev) => prev.filter((market) => market.identifier !== marketId));
      } catch (error) {
          console.error('Error deleting market:', error);
      }
  };


    // Fetch markets based on selected category
    const fetchMarkets = useCallback(async (categoryIdentifier) => {
      if (!categoryIdentifier) {
          setMarkets(AllMarkets); // If no category, show all markets
          return;
      }
      setLoading(true);
      try {
          const response = await apiClient.get(`/configuration/categories/${categoryIdentifier}/markets`);
          setMarkets(response.data);
      } catch (error) {
          console.error('Error fetching markets by category:', error);
      } finally {
          setLoading(false);
      }
  }, [AllMarkets]);
  
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

    const handleMarketsTabClick = () => {
      setActiveView('markets');
      setGeneralSettingsTab(5);
      setEditingMarketIndex(null); // Reset the editing state
    };

    useEffect(() => {
      // Reset editing state when changing to the Markets tab
      if (generalSettingsTab === 5) {
        setEditingMarketIndex(null);
      }
    }, [generalSettingsTab]);
  
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
        Identifier: newCategoryIdentifier,
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
    const handleSaveMarket = async (index) => {
      const updatedMarket = {
        ...markets[index],
        Name: newMarketName,
        Identifier: newMarketIdentifier,
      };
    
      try {
        await apiClient.put(`/configuration/categories/${selectedCategory?.rowKey}/markets/${updatedMarket.identifier}`, updatedMarket);
        showNotification('Market updated successfully', 'success');
        fetchAllMarkets(); // Refresh markets after update
      } catch (error) {
        console.error('Error updating market:', error);
        showNotification('Error updating market', 'error');
      }
    
      setEditingMarketIndex(null); // Reset editing state
    };
    
    useEffect(() => {
      fetchAllMarkets();
  }, [fetchAllMarkets]);

// Handle deleting a market by index with validation
const handleDeleteMarket = async (index, fromAllMarkets = false) => {
  // Determine the list to delete from
  const targetList = fromAllMarkets ? AllMarkets : markets;

  // Check if the index is within the valid range of the selected array
  if (index < 0 || index >= targetList.length) {
    console.error(`Invalid market index: ${index}`);
    console.log('Current target list length:', targetList.length);
    return; // Exit the function if the index is invalid
  }

  // Safely retrieve the market identifier using the valid index
  const marketId = targetList[index]?.identifier;

  if (!marketId) {
    console.error(`Market identifier not found at index: ${index}`);
    return;
  }

  try {
    // Perform the delete operation
    await apiClient.delete(`/configuration/markets/${marketId}`);
    showNotification('Market deleted successfully', 'success');

    if (fromAllMarkets) {
      // Update AllMarkets list
      setAllMarkets((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Update markets list specific to the current category
      setMarkets((prev) => prev.filter((_, i) => i !== index));
    }

    // Optionally re-fetch markets to ensure synchronization
    fetchAllMarkets();
  } catch (error) {
    console.error('Error deleting market:', error);
    showNotification('Error deleting market', 'error');
  }
};

const handleAddMarket = () => {
  const newMarket = {
    Name: newMarketName.trim(),
    Identifier: newMarketIdentifier.trim(),
  };

  addMarket(newMarket); // Correctly pass the market data
};
    
    // Add a new market and update both collections
    const addMarket = async (newMarket) => {
      try {
        console.log('New Market:', newMarket); // Check this output
        await apiClient.post('/configuration/markets', newMarket);
        setAllMarkets((prev) => [...prev, newMarket]);
        setMarkets((prev) => [...prev, newMarket]);
        fetchAllMarkets();
      } catch (error) {
        console.error('Error adding market:', error);
      }
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
{/* Notification Component */}
{notification.message && (
  <div
    className={`fixed top-4 right-4 p-4 rounded shadow-lg flex items-center ${
      notification.type === 'success'
        ? 'bg-green-500 text-white'
        : notification.type === 'error'
        ? 'bg-red-500 text-white'
        : 'bg-blue-500 text-white' // Default to blue for loading state
    }`}
  >
    <span>{notification.message}</span> {/* Only the message, no spinner */}
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
  <div className="center-spinner col-span-12 min-height-800">
    <div className="spinner"></div>
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
                    onClick={() => setGeneralSettingsTab(4)}
                    className={`px-4 py-2 rounded ${
                      generalSettingsTab === 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faThList} className="mr-2" />
                    Categories
                  </button>
                  <button
  onClick={() => {
    setGeneralSettingsTab(5); // Set the active tab to "Markets"
    setEditingMarketIndex(null); // Reset the editing state to null
  }}
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
                                <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.payload}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.timestamp).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
        onClick={handleAddMarket}
      >
        Add Market
      </button>
    </div>
    <ul className="space-y-2">
      {/* Use AllMarkets for listing markets under General Settings */}
      {AllMarkets.map((market, index) => (
        <li
          key={`${market.identifier}-${index}`}
          className="flex items-center justify-between p-2 border rounded"
        >
          {editingMarketIndex === index ? (
            <>
              <input
                type="text"
                value={newMarketName}
                onChange={(e) => setNewMarketName(e.target.value)}
                className="border border-gray-300 rounded p-1 flex-grow"
              />
              <input
                type="text"
                value={newMarketIdentifier}
                onChange={(e) => setNewMarketIdentifier(e.target.value)}
                className="border border-gray-300 rounded p-1 flex-grow"
              />
              <button onClick={() => handleSaveMarket(index)} className="text-green-500 ml-2">
                Save
              </button>
            </>
          ) : (
            <>
              <span>{market.name}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleEditMarket(index)} className="text-blue-500">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteMarket(index, true)} className="text-red-500">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
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
                      {selectedTab === 2 && (
                                        <div className="mt-4">
                                            <h3 className="text-md font-semibold mb-2">Translations</h3>
                                            <div className="flex space-x-2 mb-4">
                                                <input
                                                    type="text"
                                                    value={newTranslationKey}
                                                    onChange={(e) => setNewTranslationKey(e.target.value)}
                                                    placeholder="Translation Key"
                                                    className="flex-grow border border-gray-300 rounded p-2"
                                                />
                                                <input
                                                    type="text"
                                                    value={newTranslationValue}
                                                    onChange={(e) => setNewTranslationValue(e.target.value)}
                                                    placeholder="Translation Value"
                                                    className="flex-grow border border-gray-300 rounded p-2"
                                                />
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                                    onClick={addTranslation}
                                                >
                                                    Add Translationss
                                                </button>
                                            </div>
                                            <ul className="space-y-2">
                                                {translations.map((translation, index) => (
                                                    <li
                                                        key={`${translation.Key}-${index}`}
                                                        className="flex items-center justify-between p-2 border rounded"
                                                    >
                                                        {editingTranslationIndex === index ? (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={newTranslationKey}
                                                                    onChange={(e) => setNewTranslationKey(e.target.value)}
                                                                    className="border border-gray-300 rounded p-1 flex-grow"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={newTranslationValue}
                                                                    onChange={(e) => setNewTranslationValue(e.target.value)}
                                                                    className="border border-gray-300 rounded p-1 flex-grow"
                                                                />
                                                                <button
                                                                    onClick={() => handleSaveTranslation(index)}
                                                                    className="text-green-500 ml-2"
                                                                >
                                                                    Save
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>{translation.Key} - {translation.Value}</span>
                                                                <div className="flex items-center space-x-2">
                                                                    <button
                                                                        onClick={() => handleEditTranslation(index)}
                                                                        className="text-blue-500"
                                                                    >
                                                                        <FontAwesomeIcon icon={faEdit} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteTranslation(index)}
                                                                        className="text-red-500"
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrash} />
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
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