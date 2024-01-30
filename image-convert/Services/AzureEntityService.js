import AzureTables from '@azure/data-tables';

const connectionString = process.env.CONNECTION;

export const update = async (tableName, partitionKey, rowKey, newData, mergeMode=true) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(process.env.CONNECTION, tableName, {allowInsecureConnection: true});
    const entity = {
        partitionKey,
        rowKey,
        ...newData
    };
    await tableClient.updateEntity(entity, mergeMode ? "Merge" : "Replace");
}