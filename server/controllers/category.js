import {TableServiceClient, TableClient} from '@azure/data-tables';
import { v4 as uuidv4 } from 'uuid';

const CONN_STR = "AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;";
const tableName = "categories";

const tableClient = TableClient.fromConnectionString(CONN_STR, tableName, {allowInsecureConnection: true});
const serviceClient = TableServiceClient.fromConnectionString(CONN_STR, {allowInsecureConnection: true});

export const getAll = async (req, res) => {
    const result = [];
    const entitiesIter = tableClient.listEntities();
    for await (const entity of entitiesIter) {
        result.push(entity);
    }
    console.log(result);
    res.status(200).json(result);
}
export const postCategory = async (req, res) => {
    const partitionKey = 'category';
    const rowKey = uuidv4();
    await tableClient.createEntity({
        partitionKey,
        rowKey,
        ...req.body
    });
    res.status(200).json({"message": "Created category"});
}
export const putCategory = async (req, res) => {
    const entity = {
        partitionKey: req.params.partitionKey,
        rowKey: req.params.rowKey,
        ...req.body
    };
    await tableClient.updateEntity(entity, "Replace");
    res.status(200).json({"message": "Updated category"});
}
export const deleteCategory = async (req, res) => {
    await tableClient.deleteEntity(req.params.partitionKey, req.params.rowKey);
    res.status(200).json({"message": "Deleted category"});
}