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

  // Memoize Table Clients to prevent unnecessary re-creations
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

  // Fetch data from Azure Tables on component mount
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
    }
  };

  const fetchMarkets = async () => {
    if (!selectedCategory) return;
    try {
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
    }
  };

  const fetchHistory = async (statusFilter, start, end) => {
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
      console.log('Category replaced successfully.');
    } catch (error) {
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
      await createMarketsForNewCategory(newCategory); // Automatically create markets for the new category
    } catch (error) {
      console.error('Error adding category:', error);
      setIdentifierError('Failed to add category. Please try again.');
    }
  };

  const createMarketsForNewCategory = async (newCategory) => {
    try {
      // Fetch all unique markets by RowKey from existing markets
      const existingMarkets = await marketsClient.listEntities();
      const uniqueMarketRowKeys = new Set();

      for await (const market of existingMarkets) {
        uniqueMarketRowKeys.add(market.rowKey);
      }

      // Create markets for the new category based on unique market row keys
      const newMarkets = Array.from(uniqueMarketRowKeys).map((rowKey) => ({
        partitionKey: newCategory.Identifier,
        rowKey,
        Name: rowKey.replace(`${newCategory.Identifier}-`, ''), // Use rowKey or modify as per your naming convention
        Identifier: rowKey,
        TemplateLayout: '',
        Styling: '',
        Translations: JSON.stringify([]),
        Settings: JSON.stringify({ allowAutoRegeneration: false }),
      }));

      // Insert all new markets into the Markets table
      for (const market of newMarkets) {
        await marketsClient.createEntity(market);
      }
      console.log(`Created ${newMarkets.length} markets for the new category ${newCategory.Name}`);
    } catch (error) {
      console.error('Error creating markets for new category:', error);
    }
  };

  const handleSaveMarket = async (index) => {
    if (index === null || index < 0 || index >= markets.length) {
      console.error('Invalid market index:', index);
      return;
    }

    const market = markets[index];
    if (!market) {
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

      setMarkets((prevMarkets) => {
        const updatedMarkets = [...prevMarkets];
        updatedMarkets[index] = { ...market, ...updatedMarket };
        setSelectedMarket(updatedMarkets[index]);
        return updatedMarkets;
      });
    } catch (error) {
      console.error('Error updating market:', error.message);
      alert(`Failed to update market: ${error.message}`);
    }
  };

  const handleEditMarket = (index) => {
    if (index === null || index < 0 || index >= markets.length) {
      console.error('Invalid market index:', index);
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
      return;
    }

    const marketToDelete = markets[index];
    const updatedMarkets = markets.filter((_, i) => i !== index);
    setMarkets(updatedMarkets);

    try {
      await marketsClient.deleteEntity(marketToDelete.partitionKey, marketToDelete.rowKey);
      console.log('Market deleted successfully.');
    } catch (error) {
      console.error('Error deleting market:', error);
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

    const newMarket = {
      partitionKey: selectedCategory?.Identifier || 'Default',
      rowKey: newMarketIdentifier,
      Name: newMarketName,
      Identifier: newMarketIdentifier,
      TemplateLayout: '',
      Styling: '',
      Translations: JSON.stringify([]),
      Settings: JSON.stringify({ allowAutoRegeneration: false }),
    };

    try {
      await marketsClient.createEntity(newMarket);

      for (const category of categories) {
        if (category.Identifier !== selectedCategory?.Identifier) {
          await createMarketsForNewCategory(category);
        }
      }

      if (selectedCategory) await fetchMarkets();
      setNewMarketName('');
      setNewMarketIdentifier('');
      setIdentifierError('');
      setEditingMarketIndex(null);
      console.log('Market added successfully.');
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
    setTranslations(market.Translations || []); // Show translations specific to the selected market
    setAutoRegenerate(market.Settings?.allowAutoRegeneration || false);
    setEditingMarketIndex(index);
  };

  const handleGeneralSettingsClick = () => {
    setActiveView('settings');
    setGeneralSettingsTab(0);
  };

  return (
      <div className="App">
        <div className="container">
          <div className="pane" style={{ flex: '0 0 15%' }}>
            <h2>Categories</h2>
            <ul>
              {categories.map((category) => (
                  <li
                      key={generateUniqueKey(category.partitionKey, category.rowKey)}
                      onClick={() => handleCategoryClick(category)}
                      className={selectedCategory?.rowKey === category.rowKey ? 'selected' : ''}
                  >
                    {category.Name}
                  </li>
              ))}
            </ul>
            <hr />
            <ul className="options-list">
              <li
                  className={`option ${activeView === 'settings' ? 'selected' : ''}`}
                  onClick={handleGeneralSettingsClick}
              >
                <span className="icon">&#9881;</span> General Settings
              </li>
            </ul>
          </div>

          {activeView === 'settings' && (
              <div className="pane" style={{ flex: '1 1 85%' }}>
                <h2>General Settings</h2>
                <div className="tabs">
                  <button onClick={() => setGeneralSettingsTab(0)} className={generalSettingsTab === 0 ? 'active' : ''}>
                    History
                  </button>
                  <button onClick={() => setGeneralSettingsTab(1)} className={generalSettingsTab === 1 ? 'active' : ''}>
                    Regenerate
                  </button>
                  <button onClick={() => setGeneralSettingsTab(4)} className={generalSettingsTab === 4 ? 'active' : ''}>
                    Categories
                  </button>
                  <button onClick={() => setGeneralSettingsTab(5)} className={generalSettingsTab === 5 ? 'active' : ''}>
                    Markets
                  </button>
                </div>
                <div className="tab-content">
                  {generalSettingsTab === 0 && (
                      <div className="history-tab" style={{ marginTop: '20px' }}>
                        <div className="history-controls" style={{ display: 'flex', alignItems: 'center' }}>
                          <div className="form-group-inline" style={{ marginRight: '20px' }}>
                            <label>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginLeft: '10px' }}>
                              <option value="All">All</option>
                              <option value="Error">Error</option>
                              <option value="Warning">Warning</option>
                              <option value="Information">Information</option>
                            </select>
                          </div>
                          <div
                              className="form-group-inline"
                              style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}
                          >
                            <label>Range</label>
                            <div className="date-range" style={{ marginLeft: '10px' }}>
                              <DatePicker
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  selectsStart
                                  startDate={startDate}
                                  endDate={endDate}
                                  dateFormat="yyyy-MM-dd"
                              />
                              <span style={{ margin: '0 8px' }}>to</span>
                              <DatePicker
                                  selected={endDate}
                                  onChange={(date) => setEndDate(date)}
                                  selectsEnd
                                  startDate={startDate}
                                  endDate={endDate}
                                  minDate={startDate}
                                  dateFormat="yyyy-MM-dd"
                              />
                            </div>
                          </div>
                          <button
                              className="clear-button"
                              onClick={() => {
                                setStatus('All');
                                setStartDate(new Date());
                                setEndDate(new Date());
                              }}
                              style={{ marginTop: '10px' }}
                          >
                            Clear
                          </button>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                          <table className="settings-table">
                            <thead>
                            <tr>
                              <th>Status</th>
                              <th>Payload</th>
                            </tr>
                            </thead>
                            <tbody>
                            {history.map((item) => (
                                <tr key={generateUniqueKey(item.partitionKey, item.rowKey)}>
                                  <td>{item.Status}</td>
                                  <td>{item.Payload}</td>
                                </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                  )}
                  {generalSettingsTab === 1 && (
                      <div style={{ marginTop: '20px' }}>
                        <button className="save-button small">Start Regeneration</button>
                      </div>
                  )}
                  {generalSettingsTab === 4 && (
                      <div style={{ marginTop: '20px' }}>
                        <h3>Categories</h3>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                          <input
                              type="text"
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              placeholder="Category Name"
                              className="form-input"
                              style={{ marginRight: '10px' }}
                          />
                          <input
                              type="text"
                              value={newCategoryIdentifier}
                              onChange={(e) => setNewCategoryIdentifier(e.target.value)}
                              placeholder="Identifier"
                              className="form-input"
                          />
                          <button
                              className="add-translation-button"
                              onClick={handleAddCategory}
                              style={{ backgroundColor: '#555', color: '#fff', marginLeft: '10px' }}
                          >
                            Add Category
                          </button>
                        </div>
                        <table className="translations-table">
                          <thead>
                          <tr>
                            <th>Name</th>
                            <th>Identifier</th>
                            <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          {categories.map((category, index) => (
                              <tr key={generateUniqueKey(category.partitionKey, category.rowKey)}>
                                <td>
                                  {editingCategoryIndex === index ? (
                                      <input
                                          type="text"
                                          value={newCategoryName}
                                          onChange={(e) => setNewCategoryName(e.target.value)}
                                          className="form-input"
                                      />
                                  ) : (
                                      category.Name
                                  )}
                                </td>
                                <td>
                                  {editingCategoryIndex === index ? (
                                      <input
                                          type="text"
                                          value={newCategoryIdentifier}
                                          onChange={(e) => setNewCategoryIdentifier(e.target.value)}
                                          className="form-input"
                                      />
                                  ) : (
                                      category.Identifier
                                  )}
                                </td>
                                <td>
                                  {editingCategoryIndex === index ? (
                                      <button
                                          onClick={() => handleSaveCategory(index)}
                                          className="save-button small"
                                          style={{ marginRight: '10px' }}
                                      >
                                        Save
                                      </button>
                                  ) : (
                                      <>
                                        <button onClick={() => handleEditCategory(index)} className="edit-button">
                                          Edit
                                        </button>
                                        <button onClick={() => handleDeleteCategory(index)} className="delete-button">
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
                  {generalSettingsTab === 5 && (
                      <div style={{ marginTop: '20px' }}>
                        <h3>Markets</h3>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                          <input
                              type="text"
                              value={newMarketName}
                              onChange={(e) => setNewMarketName(e.target.value)}
                              placeholder="Market Name"
                              className="form-input"
                              style={{ marginRight: '10px' }}
                          />
                          <input
                              type="text"
                              value={newMarketIdentifier}
                              onChange={(e) => setNewMarketIdentifier(e.target.value)}
                              placeholder="Identifier"
                              className="form-input"
                          />
                          <button
                              className="add-translation-button"
                              onClick={handleAddMarket}
                              style={{ backgroundColor: '#555', color: '#fff', marginLeft: '10px' }}
                          >
                            Add Market
                          </button>
                        </div>
                        <table className="translations-table">
                          <thead>
                          <tr>
                            <th>Name</th>
                            <th>Identifier</th>
                            <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          {markets.map((market, index) => (
                              <tr key={generateUniqueKey(market.partitionKey, market.rowKey)}>
                                <td>
                                  {editingMarketIndex === index ? (
                                      <input
                                          type="text"
                                          value={newMarketName}
                                          onChange={(e) => setNewMarketName(e.target.value)}
                                          className="form-input"
                                      />
                                  ) : (
                                      market.Name
                                  )}
                                </td>
                                <td>
                                  {editingMarketIndex === index ? (
                                      <input
                                          type="text"
                                          value={newMarketIdentifier}
                                          onChange={(e) => setNewMarketIdentifier(e.target.value)}
                                          className="form-input"
                                      />
                                  ) : (
                                      market.Identifier
                                  )}
                                </td>
                                <td>
                                  {editingMarketIndex === index ? (
                                      <button
                                          onClick={() => handleSaveMarket(index)}
                                          className="save-button small"
                                          style={{ marginRight: '10px' }}
                                      >
                                        Save
                                      </button>
                                  ) : (
                                      <>
                                        <button onClick={() => handleEditMarket(index)} className="edit-button">
                                          Edit
                                        </button>
                                        <button onClick={() => handleDeleteMarket(index)} className="delete-button">
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

          {(activeView === 'markets' || activeView === 'details') && (
              <div className="pane" style={{ flex: '0 0 15%' }}>
                <h2>Markets</h2>
                <ul>
                  {markets.map((market, index) => (
                      <li
                          key={generateUniqueKey(market.partitionKey, market.rowKey)}
                          onClick={() => handleMarketClick(market, index)}
                          className={selectedMarket?.rowKey === market.rowKey ? 'selected' : ''}
                      >
                        {market.Name}
                      </li>
                  ))}
                </ul>
              </div>
          )}

          {activeView === 'details' && selectedMarket && (
              <div className="pane" style={{ flex: '1 1 70%' }}>
                <h2>Details</h2>
                <div className="tabs">
                  <button onClick={() => setSelectedTab(0)} className={selectedTab === 0 ? 'active' : ''}>
                    Template Layout
                  </button>
                  <button onClick={() => setSelectedTab(1)} className={selectedTab === 1 ? 'active' : ''}>
                    Styling
                  </button>
                  <button onClick={() => setSelectedTab(2)} className={selectedTab === 2 ? 'active' : ''}>
                    Translations
                  </button>
                  <button onClick={() => setSelectedTab(3)} className={selectedTab === 3 ? 'active' : ''}>
                    Settings
                  </button>
                  <div className="tab-content">
                    {selectedTab === 0 && (
                        <div style={{ marginTop: '20px' }}>
                    <textarea
                        value={templateLayoutText}
                        onChange={(e) => setTemplateLayoutText(e.target.value)}
                        className="large-textarea"
                        placeholder="Edit Template Layout here..."
                    />
                        </div>
                    )}
                    {selectedTab === 1 && (
                        <div style={{ marginTop: '20px' }}>
                    <textarea
                        value={templateStylingText}
                        onChange={(e) => setTemplateStylingText(e.target.value)}
                        className="large-textarea"
                        placeholder="Edit Styling here..."
                    />
                        </div>
                    )}
                    {selectedTab === 2 && (
                        <div style={{ marginTop: '20px' }}>
                          <button
                              className="add-translation-button"
                              onClick={handleAddTranslation}
                              style={{ backgroundColor: '#555', color: '#fff', marginBottom: '10px' }}
                          >
                            + Add Translation
                          </button>
                          <table className="translations-table">
                            <thead>
                            <tr>
                              <th>Key</th>
                              <th>Translation</th>
                              <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {translations.map((translation, index) => (
                                <tr key={`${translation.Key}-${index}`}>
                                  <td>
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={newTranslationKey}
                                            onChange={(e) => setNewTranslationKey(e.target.value)}
                                            className="form-input"
                                        />
                                    ) : (
                                        translation.Key
                                    )}
                                  </td>
                                  <td>
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={newTranslationValue}
                                            onChange={(e) => setNewTranslationValue(e.target.value)}
                                            className="form-input"
                                        />
                                    ) : (
                                        translation.Value
                                    )}
                                  </td>
                                  <td>
                                    {editingRow === index ? (
                                        <button
                                            onClick={() => handleSaveTranslation(index)}
                                            className="save-button small"
                                            style={{ marginRight: '10px' }}
                                        >
                                          Save
                                        </button>
                                    ) : (
                                        <>
                                          <button onClick={() => handleEditTranslation(index)} className="edit-button">
                                            Edit
                                          </button>
                                          <button onClick={() => handleDeleteTranslation(index)} className="delete-button">
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
                    {selectedTab === 3 && (
                        <div style={{ marginTop: '20px' }}>
                          <label className="switch" style={{ marginRight: '10px' }}>
                            <input type="checkbox" checked={autoRegenerate} onChange={handleToggleSwitch} />
                            <span className="slider"></span>
                          </label>
                          <span>Allow automatic regeneration</span>
                        </div>
                    )}
                  </div>
                </div>
                <button className="save-button" onClick={() => handleSaveMarket(editingMarketIndex)} style={{ marginTop: '20px' }}>
                  Save
                </button>
              </div>
          )}
        </div>
      </div>
  );
};

export default App;
