import { Menu } from "./helpers/Menu"
import { Database } from "./infra/Database"

export const database = new Database()

Menu.init()
