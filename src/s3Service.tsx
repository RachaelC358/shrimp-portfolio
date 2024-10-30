import { uploadData, list, getUrl } from 'aws-amplify/storage';

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
      //path: `picture-submissions/2Ff4089498-c0f1-707e-f6ca-5d21de150589%2F/`      
      //path: `picture-submissions/2Ff4089498-c0f1-707e-f6ca-5d21de150589%2F/`   
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
    return await Promise.all(
      items.map(async (item: any) => {
        // Use item.path directly without reappending the userId and base folder
        const linkToStorageFile = await getUrl({
          path: item.path,
        });

        return {
          path: item.path,
          lastModified: item.lastModified,
          downloadUrl: linkToStorageFile.url.toString(),
        };
      })
    );
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};
