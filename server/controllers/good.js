import {TableServiceClient, TableClient, odata} from '@azure/data-tables';
import { QueueServiceClient } from '@azure/storage-queue';
import { v4 as uuidv4 } from 'uuid';

const CONN_STR = "AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;";
const tableName = "goods";


const serviceClient = TableServiceClient.fromConnectionString(CONN_STR, {allowInsecureConnection: true});
const tableClient = TableClient.fromConnectionString(CONN_STR, tableName, {allowInsecureConnection: true});
const queueServiceClient = QueueServiceClient.fromConnectionString(CONN_STR);

export const getAll = async (req, res) => {
    const result = [];
    const entitiesIter = tableClient.listEntities();
    for await (const entity of entitiesIter) {
        result.push(entity);
    }
    console.log(result);
    res.status(200).json(result);
}
export const getAllInOneCategory = async (req, res) => {
    const result = [];
    const entitiesIter = tableClient.listEntities({
        queryOptions: { filter: odata`PartitionKey eq ${req.params.partitionKey}` }
    });
    for await (const entity of entitiesIter) {
        result.push(entity);
    }
    res.status(200).json(result);
}
export const postGood = async (req, res) => {
    const partitionKey = req.body.category;
    const rowKey = uuidv4();
    sendMessage({partitionKey, rowKey, imgUrl: req.body.imgUrl})
    await tableClient.createEntity({
        partitionKey,
        rowKey,
        ...req.body
    });
    res.status(200).json({msg: "created good"});
}
export const putGood = async (req, res) => {
    const partitionKey = req.params.partitionKey;
    const rowKey = req.params.rowKey;
    const oldEntity = await tableClient.getEntity(partitionKey, rowKey);
    if (req.body.category != oldEntity.category) {
        await deleteGood({partitionKey, rowKey});
        await createGood(req.body);
    }
    else {
        const entity = {
            partitionKey,
            rowKey,
            ...req.body
        };
        await tableClient.updateEntity(entity, "Replace");
        console.log(req.body.imgUrl);
        sendMessage({partitionKey, rowKey, imgUrl: req.body.imgUrl})
    }
    res.status(200).json({msg: "edited good"});

}
export const deleteGood = async (req, res) => {
    await tableClient.deleteEntity(req.params.partitionKey, req.params.rowKey);
    res.status(200).json({msg: "deleted good"});

}
const sendMessage = async (goodData={}) => {
    const queueName = 'convert';
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const sendMessageResponse = await queueClient.sendMessage(JSON.stringify(goodData));
    console.log(
        `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
      );
}