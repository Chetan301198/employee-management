import connectMongo from "../../../database/conn";
import { getUsers, postUsers, putUser } from "../../../database/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in Connection" })
  );

  const { method } = req;

  switch (method) {
    case "GET":
      getUsers(req, res);
      break;
    case "POST":
      postUsers(req, res);
      break;
    // case "PUT":
    //   putUser(req, res);
    //   break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
