import { uploadData, list, getUrl } from 'aws-amplify/storage';

export interface Photo {
  path: string;
  lastModified: string;
  downloadUrl: string;
}

export const handleUpload = async (file: File, userId: string): Promise<void> => {
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
    return await Promise.all(
      items.map(async (item: any) => {
        const linkToStorageFile = await getUrl({
          path: `picture-submissions/${userId}/${item.path}`,
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
