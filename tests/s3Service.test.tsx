import { uploadData, list } from "aws-amplify/storage";
import { handleUpload, fetchPhotos } from "../src/s3Service.tsx"
import { describe, expect, test } from '@jest/globals';

jest.mock("aws-amplify/storage");

describe("handleUpload", () => {
  it("should upload a file successfully", async () => {
    uploadData.mockResolvedValueOnce();

    const file = new File(["test content"], "example.txt", { type: "text/plain" });
    const userId = "user123";

    await expect(handleUpload(file, userId)).resolves.toBeUndefined();

    expect(uploadData).toHaveBeenCalledWith({
      path: `picture-submissions/${userId}/${file.name}`,
      data: file,
    });
  });

  it("should throw an error if upload fails", async () => {
    const error = new Error("Upload failed");
    uploadData.mockRejectedValueOnce(error);

    const file = new File(["test content"], "example.txt", { type: "text/plain" });
    const userId = "user123";

    await expect(handleUpload(file, userId)).rejects.toThrow("Upload failed");
    expect(uploadData).toHaveBeenCalledWith({
      path: `picture-submissions/${userId}/${file.name}`,
      data: file,
    });
  });
});

describe("fetchPhotos", () => {
  it("should fetch photos successfully", async () => {
    const mockItems = [
      {
        path: "picture-submissions/user123/photo1.jpg",
        lastModified: "2024-01-01T12:00:00Z",
      },
      {
        path: "picture-submissions/user123/photo2.jpg",
        lastModified: "2024-01-02T12:00:00Z",
      },
    ];

    list.mockResolvedValueOnce({ items: mockItems });

    const userId = "user123";
    const photos = await fetchPhotos(userId);

    expect(photos).toEqual([
      {
        path: "picture-submissions/user123/photo1.jpg",
        lastModified: "2024-01-01T12:00:00Z",
        downloadUrl: "",
      },
      {
        path: "picture-submissions/user123/photo2.jpg",
        lastModified: "2024-01-02T12:00:00Z",
        downloadUrl: "",
      },
    ]);

    expect(list).toHaveBeenCalledWith({
      path: "picture-submissions/user123/",
      options: { listAll: true },
    });
  });

  it("should throw an error if fetching fails", async () => {
    const error = new Error("List failed");
    list.mockRejectedValueOnce(error);

    const userId = "user123";

    await expect(fetchPhotos(userId)).rejects.toThrow("List failed");
    expect(list).toHaveBeenCalledWith({
      path: "picture-submissions/user123/",
      options: { listAll: true },
    });
  });
});