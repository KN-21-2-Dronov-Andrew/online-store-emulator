import AzureStorageBlob from '@azure/storage-blob';

const connectionString = process.env.CONNECTION;


export const upload = async (buffer, bufferSize, fileName) => {
    const blobClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(process.env.CONNECTION);
    
    const containerName = "images";

    const containerClient = blobClient.getContainerClient(containerName);

    const blobName = `${Date.now()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(buffer, bufferSize);

    return blockBlobClient.url;
}

export const download = async (blobName) => {

    const blobServiceClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(process.env.CONNECTION);

    const containerName = "images";

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlobClient(blobName);

    const timestamp = Date.now();    
    const fileName = `${timestamp}-${blobName}`;
    await blockBlobClient.downloadToFile(fileName);
    return fileName;
    
}