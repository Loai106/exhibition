import { where } from "sequelize";
import { Donation } from "../models/DonationModel";

export class DonationService {
  static async addDonation(
    donation_id: string,
    name: string,
    email: string,
    amount: number,
    painting_id: number
  ) {
    return await Donation.create({
      donation_id,
      donation_amount: amount,
      donation_date: Date.now(),
      donation_status: "not completed",
      painting_id,

      donor_name: name,
      donor_email: email,
    });
  }

  static async updateStatus(donation_id: string) {
    await Donation.update(
      { donation_status: "completed" },
      {
        where: {
          donation_id,
        },
        individualHooks: true,
      }
    );
  }
}
