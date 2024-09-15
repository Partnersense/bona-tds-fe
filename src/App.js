import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import apiClient from './apiClient'; // Import Axios instance
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHistory,
  faSyncAlt,
  faThList,
  faStore,
  faEdit,
  faPalette,
  faLanguage,
  faCogs,
  faTrash, 
  faSave, 
  faCheck, 
  faPlay
} from '@fortawesome/free-solid-svg-icons';

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
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIdentifier, setNewCategoryIdentifier] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [generalSettingsTab, setGeneralSettingsTab] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState('All');
  const [translations, setTranslations] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [newTranslationKey, setNewTranslationKey] = useState('');
  const [newTranslationValue, setNewTranslationValue] = useState('');
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
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

  // Show notification function
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  // Function to handle clicking on a category
  const handleCategoryClick = (category) => {
    setActiveView('markets');
    setSelectedCategory(category);
    setSelectedMarket(null);
    fetchMarkets(category.Identifier); // Pass the identifier of the selected category
  };

  // Function to handle clicking on the general settings
  const handleGeneralSettingsClick = () => {
    setActiveView('settings');
    setGeneralSettingsTab(0);
  };

  // Function to handle clicking on a market
  const handleMarketClick = (market, index) => {
    setSelectedTab(0);
    setActiveView('details');
    setSelectedMarket(market);
    setTemplateLayoutText(market.TemplateLayout || '');
    setTemplateStylingText(market.Styling || '');
    setTranslations(market.Translations || []);
    setAutoRegenerate(market.Settings?.allowAutoRegeneration || false);
    setEditingMarketIndex(index);
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

  // Function to save market details
  const handleSaveMarket = async (index) => {
    if (index === null || index < 0 || index >= markets.length) {
      console.error('Invalid market index:', index);
      showNotification('An issue occurred while saving Market', 'error');
      return;
    }

    const market = markets[index];
    if (!market) {
      showNotification('An issue occurred while saving Market', 'error');
      console.error('Market not found at index:', index);
      return;
    }

    const updatedMarket = {
      partitionKey: selectedCategory?.Identifier || 'Default',
      rowKey: market.rowKey,
      Name: newMarketName || market.Name,
      Identifier: newMarketIdentifier || market.Identifier,
      TemplateLayout: templateLayoutText,
      Styling: templateStylingText,
      Translations: JSON.stringify(translations),
      Settings: JSON.stringify({ allowAutoRegeneration: autoRegenerate }),
    };

    try {
      await apiClient.put(`/configuration/markets/${market.rowKey}`, updatedMarket); // Update market using Axios
      console.log('Market updated successfully.');
      showNotification('Market updated successfully', 'success');

      setMarkets((prevMarkets) => {
        const updatedMarkets = [...prevMarkets];
        updatedMarkets[index] = { ...market, ...updatedMarket };
        setSelectedMarket(updatedMarkets[index]);
        return updatedMarkets;
      });
    } catch (error) {
      console.error('Error updating market:', error.message);
      showNotification('An issue occurred while updating Market', 'error');
    }
  };

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch markets when a category is selected
  useEffect(() => {
    if (selectedCategory) fetchMarkets(selectedCategory.Identifier);
  }, [selectedCategory]);

  // Fetch history with applied filters
  useEffect(() => {
    fetchHistory(status, startDate, endDate, payloadFilter, itemsPerPage);
  }, [status, startDate, endDate, payloadFilter, currentPage, itemsPerPage]);

  // Fetch categories function
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/configuration/categories');
      console.log('Fetched categories:', response.data); // Debug log
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      showNotification('Error fetching categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch markets function
  const fetchMarkets = async (categoryIdentifier) => {
    if (!categoryIdentifier) return;
    setLoading(true);
    try {
      const response = await apiClient.get(`/configuration/categories/${categoryIdentifier}/markets`);
      console.log(`Fetched markets for category ${categoryIdentifier}:`, response.data); // Debug log
      setMarkets(response.data);
    } catch (error) {
      console.error('Error fetching markets:', error);
      showNotification('Error fetching markets', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch history function
  const fetchHistory = async (statusFilter, start, end, payloadFilter, pageSize) => {
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
      setHistory(response.data);
      setContinuationToken(response.data.continuationToken || null);
    } catch (error) {
      console.error('Error fetching history:', error);
      showNotification('Error fetching history', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination for history
  const handleNextPage = () => {
    if (continuationToken) {
      setPrevContinuationTokens([...prevContinuationTokens, continuationToken]);
      fetchHistory(status, startDate, endDate, payloadFilter, itemsPerPage);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const tokens = [...prevContinuationTokens];
      const prevToken = tokens.pop();
      setPrevContinuationTokens(tokens);
      setContinuationToken(prevToken);
      fetchHistory(status, startDate, endDate, payloadFilter, itemsPerPage);
      setCurrentPage(currentPage - 1);
    }
  };

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
                key={`${category.partitionKey}-${category.rowKey}`} // Using both partitionKey and rowKey for uniqueness
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer p-2 rounded ${
                  selectedCategory?.Identifier === category.Identifier
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.name} {/* Adjusted to render the correct property */}
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
                {/* General Settings View */}
                <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                {/* General settings content... */}
              </div>
            )}

            {/* Markets List */}
            {(activeView === 'markets' || activeView === 'details') && (
              <div className="bg-white shadow-md rounded-lg p-4 col-span-2 min-height-800">
                <h2 className="text-lg font-semibold mb-4">Markets</h2>
                <ul className="space-y-2">
                  {markets.map((market, index) => (
                    <li
                      key={`${market.partitionKey}-${market.rowKey}`} // Ensure unique key
                      onClick={() => handleMarketClick(market, index)}
                      className={`cursor-pointer p-2 rounded ${
                        selectedMarket?.Identifier === market.Identifier
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {market.Name}
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
                    Template Layout
                  </button>
                  <button
                    onClick={() => setSelectedTab(1)}
                    className={`px-4 py-2 rounded ${
                      selectedTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    Styling
                  </button>
                  <button
                    onClick={() => setSelectedTab(2)}
                    className={`px-4 py-2 rounded ${
                      selectedTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    Translations
                  </button>
                  <button
                    onClick={() => setSelectedTab(3)}
                    className={`px-4 py-2 rounded ${
                      selectedTab === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
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
                                  {editingRow === index ? (
                                    <input
                                      type="text"
                                      value={newTranslationKey}
                                      onChange={(e) => setNewTranslationKey(e.target.value)}
                                      className="border border-gray-300 rounded p-2"
                                    />
                                  ) : (
                                    translation.Key
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {editingRow === index ? (
                                    <input
                                      type="text"
                                      value={newTranslationValue}
                                      onChange={(e) => setNewTranslationValue(e.target.value)}
                                      className="border border-gray-300 rounded p-2"
                                    />
                                  ) : (
                                    translation.Value
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2 justify-center">
                                  {editingRow === index ? (
                                    <button
                                      onClick={() => handleSaveTranslation(index)}
                                      className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => handleEditTranslation(index)}
                                        className="text-yellow-500 hover:text-yellow-700 flex items-center justify-center"
                                        style={{
                                          background: 'none',
                                          border: 'none',
                                          padding: 0,
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faEdit} />
                                      </button>
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
                                    </>
                                  )}
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
                  onClick={() => handleSaveMarket(editingMarketIndex)}
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
