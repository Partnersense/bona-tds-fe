export const fetchCategories = async () => {
    // Simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            PartitionKey: "Category1",
            RowKey: "1",
            Timestamp: "2023-07-08T00:00:00Z",
            ETag: "etag1",
            Name: "Fastening",
            Markets: [
              {
                Name: "Sweden",
                LanguageCode: "sv-SE",
                TemplateLayout: { Code: "Layout1" },
                TemplateStyling: { Code: "Styling1" },
                Settings: [
                  { Code: "Setting1", Value: "Value1" },
                  { Code: "Setting2", Value: "Value2" },
                ],
              },
              {
                Name: "UK",
                LanguageCode: "en-GB",
                TemplateLayout: { Code: "Layout2" },
                TemplateStyling: { Code: "Styling2" },
                Settings: [
                  { Code: "Setting1", Value: "Value1" },
                  { Code: "Setting2", Value: "Value2" },
                ],
              },
            ],
          },
          {
            PartitionKey: "Category2",
            RowKey: "2",
            Timestamp: "2023-07-08T00:00:00Z",
            ETag: "etag2",
            Name: "Floor Care",
            Markets: [
              {
                Name: "Singapore",
                LanguageCode: "en",
                TemplateLayout: { Code: "Layout3" },
                TemplateStyling: { Code: "Styling3" },
                Settings: [
                  { Code: "Setting1", Value: "Value1" },
                  { Code: "Setting2", Value: "Value2" },
                ],
              },
            ],
          },
        ]);
      }, 1000);
    });
  };
  