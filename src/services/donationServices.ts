import { where } from "sequelize";
import { Donation } from "../models/DonationModel";

export class DonationService {
  static addDonation(
    name: string,
    email: string,
    amount: number,
    painting_id: number
  ) {
    return Donation.create({
      donation_name: name,
      donation_email: email,
      donation_amount: amount,
      painting_id,
      donation_status: "not completed",
    });
  }

  static async updateStatus(donation_id: number) {
    await Donation.update(
      { donation_status: "completed" },
      {
        where: {
          donation_id,
        },
      }
    );
  }
}
