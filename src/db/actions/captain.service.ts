import captain from "../captain.model";
import { CaptainType } from "../../controllers/zod.validation";

async function createCaptain(captainData: CaptainType) {
    const result = await captain.model.create(captainData);
    return result;
}
async function getCaptainWithPassword(email:string) {
    const result = await captain.model.findOne({email}).select('+password').exec();
    return result;
}
async function getCaptain(_id:string) {
    const result=await captain.model.findOne({_id});
    return result;
}
async function getCaptainbyEmail(email:string){
    const result=await captain.model.findOne({email})
    return result;
}
export default {
    createCaptain,
    getCaptainWithPassword,
    getCaptain,
    getCaptainbyEmail
};
