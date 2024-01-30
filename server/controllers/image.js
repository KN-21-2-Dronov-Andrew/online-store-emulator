import {BlobServiceClient} from '@azure/storage-blob';

const CONN_STR = "AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;";
const containerName = "images";

const blobClient = BlobServiceClient.fromConnectionString(CONN_STR);

export const postImage = async (req, res) => {
    const promises = [];
    for (let i = 0; i < req.files.length; i++) {
        promises.push(new Promise((resolve) => {
            resolve(createBlob(req.files[i].buffer, req.files[i].size, req.files[i].originalname))
        }));
    }
    const urls = await Promise.all(promises);
    res.status(200).json(urls);
}

const createBlob = async (buffer, bufferSize, fileName) => {
    const containerClient = blobClient.getContainerClient(containerName);
    const blobName = `${Date.now()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(buffer, bufferSize);

    return blockBlobClient.url;
}