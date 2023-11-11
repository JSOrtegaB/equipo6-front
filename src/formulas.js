const calculatePayments = (products, amount, period) => {
    // Filter products where type is 'credit'
    const filteredProducts = products.filter(product => product.type === 'credito');

    return filteredProducts.map(product => {

        const monthlyRate = product.apr / 1200; // Convert APR to a monthly rate
        const totalPayments = period; // Total number of monthly payments
        const presentValue = amount; // Loan amount

        const monthlyPayment = monthlyPaymentFormula(monthlyRate, totalPayments, presentValue);

        // Calculate monthly payment using the compound interest formula
        //const monthlyPayment = monthlyRate * presentValue / (1 - Math.pow(1 + monthlyRate, -totalPayments));

        return { ...product, monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment };
    });
};

const calculateEarnings = (products, amount, period) => {
    // Filter products where type is 'invest'
    const filteredProducts = products.filter(product => product.type === 'inversion');

    return filteredProducts.map(product => {
        const monthlyRate = product.apr / 1200; // Convert APR to a monthly rate
        const totalMonths = period; // Total number of months

        // Calculate the future value using the compound interest formula
        //const futureValue = amount * Math.pow(1 + monthlyRate, totalMonths);

        // Calculate interest earned by subtracting principal from future value
        const interestEarned = interestEarnedFormula(amount, monthlyRate, totalMonths);
        // = futureValue - amount;

        return { ...product, monthlyPayment: isNaN(interestEarned) ? 0 : interestEarned };
    });
};

const monthlyPaymentFormula = (monthlyRate, totalPayments, presentValue) => monthlyRate * presentValue / (1 - Math.pow(1 + monthlyRate, -totalPayments));
const interestEarnedFormula = (amount, monthlyRate, totalMonths) => amount * Math.pow(1 + monthlyRate, totalMonths) - amount;


export { calculatePayments, calculateEarnings, monthlyPaymentFormula, interestEarnedFormula };