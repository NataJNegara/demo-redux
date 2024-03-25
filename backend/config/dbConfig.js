import { connect } from "mongoose";

export const dbConnect = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      dbName: "mern-auth-redux",
    });
    console.log(`db connect successfuly: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
