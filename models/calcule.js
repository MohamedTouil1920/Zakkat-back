class Zakat {
    constructor(assets, debts, nisabMethod, zakatDate) {
      this.assets = assets;
      this.debts = debts;
      this.nisabMethod = nisabMethod;
      this.zakatDate = zakatDate;
    }
  
    calculateNisab() {
        switch (this.nisabMethod) {
            case 'gold':
              
              const goldRate = 60; // Replace this with the actual rate
              return (87.48 * goldRate) / 31.1035; // Convert grams to ounces and calculate the nisab value
            case 'silver':
            
              const silverRate = 0.5; // Replace this with the actual rate
              return (612.36 * silverRate) / 31.1035; // Convert grams to ounces and calculate the nisab value
            case 'money':
             
              return 162500; // Assuming the silver rate is 0.5
        
            default:
              throw new Error(`Invalid nisab method: ${this.nisabMethod}`);
          }
        }
        
  
    isZakatDue() {
      const nisab = this.calculateNisab();
      const zakatNetWorth = this.assets - this.debts;
  
      if (zakatNetWorth >= nisab) {
        // Calculate the zakat amount
        const zakatAmount = zakatNetWorth * 0.025;
        return { zakatAmount, isDue: true };
      } else {
        return { zakatAmount: 0, isDue: false };
      }
    }
  }
  
  module.exports = Zakat;