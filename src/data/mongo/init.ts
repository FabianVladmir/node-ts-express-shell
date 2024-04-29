import mongoose from "mongoose";

interface IConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: IConnectionOptions): Promise<boolean>{
        const {mongoUrl, dbName} = options;

        try {
            await mongoose.connect(mongoUrl,{
                dbName: dbName
            });
            console.log(`Database work in ${mongoUrl}` )
            return true;
        } catch (error) {
            console.log('Mongo connection to database failed' , error)
            throw error;
        }
    }
}