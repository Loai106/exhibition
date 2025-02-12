import { Admin } from "../models/AdminModel";

export default class AdminService {
  static async checkAdminsNumber() {
    const count = await Admin.count();
    if (count >= 3) {
      return false;
    } else {
      return true;
    }
  }
  static async addAdmin(admin: any) {
    const newadmin = await Admin.create(admin);
    console.log(newadmin);
    return newadmin;
  }
  static async findAdminEmail(email: string) {
    return await Admin.findOne({
      where: {
        email,
      },
    });
  }
}
