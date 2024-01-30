import AzureStorageQueue from '@azure/storage-queue';

const connectionString = process.env.CONNECTION;

export const createQueueIfNotExists = async (queueName) => {
    const queueServiceClient = AzureStorageQueue.QueueServiceClient.fromConnectionString(process.env.CONNECTION);
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const createQueueResponse = await queueClient.createIfNotExists();
}

export const getMessage = async (queueName) => {
    const queueServiceClient = AzureStorageQueue.QueueServiceClient.fromConnectionString(process.env.CONNECTION);
    const queueClient = queueServiceClient.getQueueClient(queueName);
    return await queueClient.receiveMessages();
} 

export const deleteMessage = async (queueName, messageId, popReceipt) => {
    const queueServiceClient = AzureStorageQueue.QueueServiceClient.fromConnectionString(process.env.CONNECTION);
    const queueClient = queueServiceClient.getQueueClient(queueName);
    return await queueClient.deleteMessage(messageId, popReceipt);
}