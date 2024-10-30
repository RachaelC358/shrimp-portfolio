import { uploadData, list } from 'aws-amplify/storage';

export interface Photo {
  path: string;
  lastModified: string;
  downloadUrl: string;
}

export const handleUpload = async (file: File, userId: string): Promise<void> => {
    console.log("userId: ", userId)
  try {
    await uploadData({
    path: `picture-submissions/${userId}/${file.name}`,
      data: file,
    });
    console.log("File uploaded successfully.");
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const fetchPhotos = async (userId: string): Promise<Photo[]> => {
    try {
      const result = await list({
        path: `picture-submissions/${userId}/`,
        options: { listAll: true },
      });
  
      const items = result.items || [];
      return items.map((item: any) => ({
        path: item.path,
        lastModified: item.lastModified,
        downloadUrl: "", // Set as an empty string initially
      }));
    } catch (error) {
      console.error("Error fetching photos:", error);
      throw error;
    }
  };
  
