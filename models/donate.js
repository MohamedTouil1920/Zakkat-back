class Donate {
    constructor(amount, donorName, donorEmail, donorAddress, donationDate) {
      this.amount = amount;
      this.donorName = donorName;
      this.donorEmail = donorEmail;
      this.donorAddress = donorAddress;
      this.donationDate = donationDate;
    }
  
    static create(amount, donorName, donorEmail, donorAddress, donationDate) {
      return new Donate(amount, donorName, donorEmail, donorAddress, donationDate);
    }
  }
  
  module.exports = Donate;
  