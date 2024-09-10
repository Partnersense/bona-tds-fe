import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TableClient, AzureSASCredential, odata } from '@azure/data-tables';

const accountUrl = 'https://tdsassets.table.core.windows.net';
const sasToken = 'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-03-27T21:27:47Z&st=2024-09-06T12:27:47Z&spr=https,http&sig=W0cnadfFt2Whoed84YE%2F28NLvkolJlMl%2BRFFPKKwxG4%3D';

const App = () => {
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


  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000); // Hide notification after 3 seconds
  };

  const categoriesClient = useMemo(
      () => new TableClient(accountUrl, 'Categories', new AzureSASCredential(sasToken)),
      []
  );
  const marketsClient = useMemo(
      () => new TableClient(accountUrl, 'Markets', new AzureSASCredential(sasToken)),
      []
  );
  const historyClient = useMemo(
      () => new TableClient(accountUrl, 'History', new AzureSASCredential(sasToken)),
      []
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) fetchMarkets();
  }, [selectedCategory]);

  useEffect(() => {
    fetchHistory(status, startDate, endDate);
  }, [status, startDate, endDate]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const entities = categoriesClient.listEntities();
      const categoryList = [];
      for await (const entity of entities) {
        categoryList.push({
          partitionKey: entity.partitionKey || 'missing',
          rowKey: entity.rowKey || 'missing',
          Name: entity.Name,
          Identifier: entity.Identifier,
        });
      }
      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarkets = async () => {
    if (!selectedCategory) return;

    try {
      setLoading(true);
      const entities = marketsClient.listEntities({
        queryOptions: { filter: odata`PartitionKey eq '${selectedCategory.Identifier}'` },
      });

      const marketList = [];
      for await (const entity of entities) {
        marketList.push({
          partitionKey: entity.partitionKey || 'missing',
          rowKey: entity.rowKey || 'missing',
          Name: entity.Name,
          Identifier: entity.Identifier,
          TemplateLayout: entity.TemplateLayout || '',
          Styling: entity.Styling || '',
          Translations: JSON.parse(entity.Translations || '[]'),
          Settings: JSON.parse(entity.Settings || '{}'),
        });
      }
      setMarkets(marketList);
    } catch (error) {
      console.error('Error fetching markets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (statusFilter, start, end) => {
    setLoading(true);
    try {
      let filterQuery = odata`Timestamp ge datetime'${start.toISOString()}' and Timestamp le datetime'${end.toISOString()}'`;
      if (statusFilter !== 'All') {
        filterQuery += odata` and Status eq '${statusFilter}'`;
      }

      const entities = historyClient.listEntities({ queryOptions: { filter: filterQuery } });
      const historyList = [];
      for await (const entity of entities) {
        historyList.push({
          partitionKey: entity.partitionKey || 'missing',
          rowKey: entity.rowKey || 'missing',
          Status: entity.Status || 'N/A',
          Payload: entity.Payload || 'N/A',
        });
      }
      setHistory(historyList);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateUniqueKey = (partitionKey, rowKey) => {
    return `${partitionKey || 'missing'}-${rowKey || 'missing'}`;
  };

  const handleSaveCategory = async (index) => {
    const updatedCategories = [...categories];
    const category = {
      partitionKey: 'Categories',
      rowKey: categories[index].rowKey,
      Name: newCategoryName,
      Identifier: newCategoryIdentifier,
    };
    updatedCategories[index] = category;
    setCategories(updatedCategories);
    setEditingCategoryIndex(null);

    try {
      await categoriesClient.upsertEntity(category, 'Replace');
      showNotification('Category saved successfully!', 'success'); // Show success message
      console.log('Category replaced successfully.');
    } catch (error) {
      showNotification('Failed to save category. Please try again.', 'error'); // Show error message
      console.error('Error replacing category:', error);
    }
  };

  const handleEditCategory = (index) => {
    setEditingCategoryIndex(index);
    setNewCategoryName(categories[index].Name);
    setNewCategoryIdentifier(categories[index].Identifier);
  };

  const handleDeleteCategory = async (index) => {
    const updatedCategories = [...categories];
    const category = updatedCategories.splice(index, 1)[0];
    setCategories(updatedCategories);

    try {
      await categoriesClient.deleteEntity('Categories', category.rowKey);
      console.log('Category deleted successfully.');
      await deleteMarketsByCategory(category.Identifier);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const deleteMarketsByCategory = async (categoryIdentifier) => {
    try {
      const entities = marketsClient.listEntities({
        queryOptions: { filter: odata`PartitionKey eq '${categoryIdentifier}'` },
      });

      for await (const entity of entities) {
        await marketsClient.deleteEntity(entity.partitionKey, entity.rowKey);
      }
      console.log(`All markets deleted for category ${categoryIdentifier}`);
    } catch (error) {
      console.error(`Error deleting markets for category ${categoryIdentifier}:`, error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName || !newCategoryIdentifier) {
      setIdentifierError('Both name and identifier are required.');
      return;
    }

    const isIdentifierUnique = !categories.some(
        (category) => category.Identifier && category.Identifier.toLowerCase() === newCategoryIdentifier.toLowerCase()
    );

    if (!isIdentifierUnique) {
      setIdentifierError('Category identifier must be unique.');
      return;
    }

    const newCategory = {
      partitionKey: 'Categories',
      rowKey: newCategoryIdentifier,
      Name: newCategoryName,
      Identifier: newCategoryIdentifier,
    };

    try {
      await categoriesClient.createEntity(newCategory);
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setNewCategoryIdentifier('');
      setIdentifierError('');
      setEditingCategoryIndex(null);
      await createMarketsForNewCategory(newCategory);
    } catch (error) {
      console.error('Error adding category:', error);
      setIdentifierError('Failed to add category. Please try again.');
    }
  };

  const createMarketsForNewCategory = async (newCategory) => {
    try {
      const existingMarkets = await marketsClient.listEntities();
      const existingMarketIdentifiers = new Set();

      for await (const market of existingMarkets) {
        existingMarketIdentifiers.add(market.rowKey);
      }

      const categoriesEntities = categoriesClient.listEntities();
      for await (const category of categoriesEntities) {
        for (const rowKey of existingMarketIdentifiers) {
          const newMarket = {
            partitionKey: category.Identifier,
            rowKey,
            Name: rowKey,
            Identifier: rowKey,
            TemplateLayout: '',
            Styling: '',
            Translations: JSON.stringify([]),
            Settings: JSON.stringify({ allowAutoRegeneration: false }),
          };

          const existingMarketForCategory = await marketsClient.getEntity(
              category.Identifier,
              rowKey
          ).catch(() => null);

          if (!existingMarketForCategory) {
            await marketsClient.createEntity(newMarket);
          }
        }
      }
      console.log(`Created markets for all categories including ${newCategory.Name}`);
    } catch (error) {
      console.error('Error creating markets for new category:', error);
    }
  };

  const handleSaveMarket = async (index) => {
    if (index === null || index < 0 || index >= markets.length) {
      console.error('Invalid market index:', index);
      showNotification('An issue occured while saving Market', 'error');
      return;
    }

    const market = markets[index];
    if (!market) {
      showNotification('An issue occured while saving Market', 'error');
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
      await marketsClient.updateEntity(updatedMarket, 'Replace');
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
      showNotification('An issue occured while updating Market', 'error');
    }
  };

  const handleEditMarket = (index) => {
    if (index === null || index < 0 || index >= markets.length) {
      console.error('Invalid market index:', index);
      showNotification('An issue occured while saving Market', 'error');
      return;
    }

    setEditingMarketIndex(index);
    const market = markets[index];
    setNewMarketName(market.Name);
    setNewMarketIdentifier(market.Identifier);
    setTemplateLayoutText(market.TemplateLayout || '');
    setTemplateStylingText(market.Styling || '');
    setTranslations(market.Translations || []);
    setAutoRegenerate(market.Settings?.allowAutoRegeneration || false);
  };

  const handleDeleteMarket = async (index) => {
    if (index < 0 || index >= markets.length) {
      console.error('Invalid market index');
      showNotification('An issue occured while deleting Market', 'error');
      return;
    }

    const marketToDelete = markets[index];
    const updatedMarkets = markets.filter((_, i) => i !== index);
    setMarkets(updatedMarkets);

    try {
      await marketsClient.deleteEntity(marketToDelete.partitionKey, marketToDelete.rowKey);
      console.log('Market deleted successfully.');
      showNotification('Market deleted', 'success');
    } catch (error) {
      console.error('Error deleting market:', error);
      showNotification('An issue occured while deleting Market', 'error');
    }
  };

  const handleAddMarket = async () => {
    if (!newMarketName || !newMarketIdentifier) {
      setIdentifierError('Both market name and identifier are required.');
      return;
    }

    const isIdentifierUnique = !markets.some(
        (market) => market.Identifier && market.Identifier.toLowerCase() === newMarketIdentifier.toLowerCase()
    );

    if (!isIdentifierUnique) {
      setIdentifierError('Market identifier must be unique.');
      return;
    }

    try {
      for (const category of categories) {
        const newMarket = {
          partitionKey: category.Identifier,
          rowKey: newMarketIdentifier,
          Name: newMarketName,
          Identifier: newMarketIdentifier,
          TemplateLayout: '',
          Styling: '',
          Translations: JSON.stringify([]),
          Settings: JSON.stringify({ allowAutoRegeneration: false }),
        };

        const existingMarketForCategory = await marketsClient.getEntity(
            category.Identifier,
            newMarketIdentifier
        ).catch(() => null);

        if (!existingMarketForCategory) {
          await marketsClient.createEntity(newMarket);
        }
      }

      fetchMarkets();
      setNewMarketName('');
      setNewMarketIdentifier('');
      setIdentifierError('');
      setEditingMarketIndex(null);
      console.log('Market added successfully for all categories.');
    } catch (error) {
      console.error('Error adding market:', error);
      setIdentifierError('Failed to add market. Please try again.');
    }
  };

  const handleAddTranslation = () => {
    setTranslations([...translations, { Key: '', Value: '' }]);
    setEditingRow(translations.length);
  };

  const handleSaveTranslation = (index) => {
    const updatedTranslations = [...translations];
    updatedTranslations[index] = { Key: newTranslationKey, Value: newTranslationValue };
    setTranslations(updatedTranslations);
    setEditingRow(null);
  };

  const handleEditTranslation = (index) => {
    setEditingRow(index);
    setNewTranslationKey(translations[index].Key);
    setNewTranslationValue(translations[index].Value);
  };

  const handleDeleteTranslation = (index) => {
    const updatedTranslations = [...translations];
    updatedTranslations.splice(index, 1);
    setTranslations(updatedTranslations);
  };

  const handleToggleSwitch = () => {
    setAutoRegenerate(!autoRegenerate);
  };

  const handleCategoryClick = (category) => {
    setActiveView('markets');
    setSelectedCategory(category);
    setSelectedMarket(null);
    fetchMarkets();
  };

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

  const handleGeneralSettingsClick = () => {
    setActiveView('settings');
    setGeneralSettingsTab(0);
  };

  return (
      <div className="App">
        <div className="container mx-auto p-4 grid grid-cols-12 gap-4">
          {/* Notification Component */}
          {notification.message && (
              <div
                  className={`fixed top-4 right-4 p-4 rounded shadow-lg ${
                      notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
              >
                {notification.message}
              </div>
          )}
          {/* Sidebar - Categories */}
          <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                  <li
                      key={generateUniqueKey(category.partitionKey, category.rowKey)}
                      onClick={() => handleCategoryClick(category)}
                      className={`cursor-pointer p-2 rounded ${
                          selectedCategory?.rowKey === category.rowKey ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                      }`}
                  >
                    {category.Name}
                  </li>
              ))}
            </ul>
            <hr className="my-4"/>
            <ul className="space-y-2">
              <li
                  className={`cursor-pointer p-2 rounded flex items-center ${
                      activeView === 'settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={handleGeneralSettingsClick}
              >
                <span className="mr-2">⚙️</span> General Settings
              </li>
            </ul>
          </div>

          {/* Main Content */}
          {loading ? (
              <div className="col-span-3 flex justify-center items-center">
                <div className="text-blue-500">Loading...</div>
              </div>
          ) : (
              <>
                {activeView === 'settings' && (
                    <div className="bg-white shadow-md rounded-lg p-4 col-span-8">
                      {/* General Settings View */}
                      <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                      <div className="flex space-x-4 mb-4">
                        <button
                            onClick={() => setGeneralSettingsTab(0)}
                            className={`px-4 py-2 rounded ${
                                generalSettingsTab === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        >
                          History
                        </button>
                        <button
                            onClick={() => setGeneralSettingsTab(1)}
                            className={`px-4 py-2 rounded ${
                                generalSettingsTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        >
                          Regenerate
                        </button>
                        <button
                            onClick={() => setGeneralSettingsTab(4)}
                            className={`px-4 py-2 rounded ${
                                generalSettingsTab === 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        >
                          Categories
                        </button>
                        <button
                            onClick={() => setGeneralSettingsTab(5)}
                            className={`px-4 py-2 rounded ${
                                generalSettingsTab === 5 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        >
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
                                        className="border border-gray-300 rounded px-2 py-1"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    <span className="mx-2">to</span>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        className="border border-gray-300 rounded px-2 py-1"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                  </div>
                                </div>
                                <button
                                    className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => {
                                      setStatus('All');
                                      setStartDate(new Date());
                                      setEndDate(new Date());
                                    }}
                                >
                                  Clear
                                </button>
                              </div>
                              <div className="overflow-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Payload
                                    </th>
                                  </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                  {history.map((item) => (
                                      <tr key={generateUniqueKey(item.partitionKey, item.rowKey)}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.Status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.Payload}</td>
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
                              <button className="bg-blue-500 text-white px-4 py-2 rounded">Start Regeneration</button>
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
                                    onClick={handleAddCategory}
                                >
                                  Add Category
                                </button>
                              </div>
                              {identifierError && <div className="text-red-500 mb-2">{identifierError}</div>}
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Identifier
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                  </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {categories.map((category, index) => (
                                    <tr key={generateUniqueKey(category.partitionKey, category.rowKey)}>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {editingCategoryIndex === index ? (
                                            <input
                                                type="text"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                className="border border-gray-300 rounded p-2"
                                            />
                                        ) : (
                                            category.Name
                                        )}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {editingCategoryIndex === index ? (
                                            <input
                                                type="text"
                                                value={newCategoryIdentifier}
                                                onChange={(e) => setNewCategoryIdentifier(e.target.value)}
                                                className="border border-gray-300 rounded p-2"
                                            />
                                        ) : (
                                            category.Identifier
                                        )}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {editingCategoryIndex === index ? (
                                            <button
                                                onClick={() => handleSaveCategory(index)}
                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                              Save
                                            </button>
                                        ) : (
                                            <>
                                              <button
                                                  onClick={() => handleEditCategory(index)}
                                                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                              >
                                                Edit
                                              </button>
                                              <button
                                                  onClick={() => handleDeleteCategory(index)}
                                                  className="bg-red-500 text-white px-3 py-1 rounded"
                                              >
                                                Delete
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
                                    onClick={handleAddMarket}
                                >
                                  Add Market
                                </button>
                              </div>
                              {identifierError && <div className="text-red-500 mb-2">{identifierError}</div>}
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Identifier
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                  </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {markets.map((market, index) => (
                                    <tr key={generateUniqueKey(market.partitionKey, market.rowKey)}>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {editingMarketIndex === index ? (
                                            <input
                                                type="text"
                                                value={newMarketName}
                                                onChange={(e) => setNewMarketName(e.target.value)}
                                                className="border border-gray-300 rounded p-2"
                                            />
                                        ) : (
                                            market.Name
                                        )}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {editingMarketIndex === index ? (
                                            <input
                                                type="text"
                                                value={newMarketIdentifier}
                                                onChange={(e) => setNewMarketIdentifier(e.target.value)}
                                                className="border border-gray-300 rounded p-2"
                                            />
                                        ) : (
                                            market.Identifier
                                        )}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {editingMarketIndex === index ? (
                                            <button
                                                onClick={() => handleSaveMarket(index)}
                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                              Save
                                            </button>
                                        ) : (
                                            <>
                                              <button
                                                  onClick={() => handleEditMarket(index)}
                                                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                              >
                                                Edit
                                              </button>
                                              <button
                                                  onClick={() => handleDeleteMarket(index)}
                                                  className="bg-red-500 text-white px-3 py-1 rounded"
                                              >
                                                Delete
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
                      </div>
                    </div>
                )}

                {/* Markets List */}
                {(activeView === 'markets' || activeView === 'details') && (
                    <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
                      <h2 className="text-lg font-semibold mb-4">Markets</h2>
                      <ul className="space-y-2">
                        {markets.map((market, index) => (
                            <li
                                key={generateUniqueKey(market.partitionKey, market.rowKey)}
                                onClick={() => handleMarketClick(market, index)}
                                className={`cursor-pointer p-2 rounded ${
                                    selectedMarket?.rowKey === market.rowKey ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
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
                    <div className="bg-white shadow-md rounded-lg p-4 col-span-8">
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
                        {/* Template Layout Tab */}
                        {selectedTab === 0 && (
                            <div className="mt-4">
                      <textarea
                          value={templateLayoutText}
                          onChange={(e) => setTemplateLayoutText(e.target.value)}
                          className="w-full h-32 border border-gray-300 rounded p-2"
                          placeholder="Edit Template Layout here..."
                      />
                            </div>
                        )}
                        {/* Styling Tab */}
                        {selectedTab === 1 && (
                            <div className="mt-4">
                      <textarea
                          value={templateStylingText}
                          onChange={(e) => setTemplateStylingText(e.target.value)}
                          className="w-full h-32 border border-gray-300 rounded p-2"
                          placeholder="Edit Styling here..."
                      />
                            </div>
                        )}
                        {/* Translations Tab */}
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
                                {translations.map((translation, index) => (
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
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {editingRow === index ? (
                                            <button
                                                onClick={() => handleSaveTranslation(index)}
                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                              Save
                                            </button>
                                        ) : (
                                            <>
                                              <button
                                                  onClick={() => handleEditTranslation(index)}
                                                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                              >
                                                Edit
                                              </button>
                                              <button
                                                  onClick={() => handleDeleteTranslation(index)}
                                                  className="bg-red-500 text-white px-3 py-1 rounded"
                                              >
                                                Delete
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
                        {/* Settings Tab */}
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
