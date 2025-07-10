import { Users } from "../../models/Users";

declare global {
  namespace Express {
    interface User extends Users {}
  }
}
