import MongoDB from "../../Config/MongoDB"

const dbConnection = new MongoDB

export const PointRepository = {
    getAllPoint: async () => {
        await dbConnection.connect();
        const documents = await dbConnection.findDocuments('points')
        await dbConnection.close();
        return documents;
    }
}