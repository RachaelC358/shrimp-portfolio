export const uploadData = jest.fn(() =>
    Promise.resolve({
      message: "Mocked file upload successful!",
    })
  );
  
  export const list = jest.fn(() =>
    Promise.resolve({
      items: [
        { path: "mocked-file-1.jpg", lastModified: "2024-01-01T00:00:00Z" },
        { path: "mocked-file-2.jpg", lastModified: "2024-01-02T00:00:00Z" },
      ],
    })
  );
  