"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const GetUserById = async (req, res, next) => {
    const id = req.params["id"];
    try {
        const response = await prisma.users.findUniqueOrThrow({
            where: {
                id: id,
            },
        });
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.GetUserById = GetUserById;
// export const CreateUser=async(req:Request,res:Response,next:NextFunction)=>{
//     const newUser:User=req.body
//     try {
//         const response=await prisma.user.create({
//             data:{
//                 email:newUser.email,
//                 password:newUser.password
//             }
//         })
//     } catch (error) {
//     }
// }
