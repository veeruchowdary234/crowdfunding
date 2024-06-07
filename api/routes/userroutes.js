import express from "express"
import {verifyuser} from "../utils/verifyuser.js"
import { update,deletuser,getusers,admindeletuser} from "../controllers/usercontroller.js"
import { signout } from "../controllers/usercontroller.js"
const Router=express.Router()

Router.put("/update/:id",verifyuser,update)
Router.delete("/delete/:id",verifyuser,deletuser)
Router.post("/signout",signout);
Router.get("/getusers",verifyuser,getusers)
Router.delete("/admindeluser/:id",verifyuser,admindeletuser);
export default Router;