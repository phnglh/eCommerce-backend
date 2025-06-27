import { Request, Response, Router } from "express";
import config from "../config";


export default () => {
const app = Router()

 app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true, environment: config.env });
  });

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Hello, API!" });
});
return app
}
