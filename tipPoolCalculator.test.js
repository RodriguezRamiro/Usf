it('should calculate the monthly rate corectly', function(){
    // ...
    const values = {
        amount: 10000,
        years: 8,
        rate: 5.8,
    };
    expect(calculateMonthlyPayment(values)).toEqaul('130.44');
});

it("should return a result with 2 decimal places", function(){
    const values = {
        amount: 10043,
        years: 8,
        rate: 5.8
    };
    expect(calculateMonthlyPayments(values)).toEqual('131.00');
    });

    it ("should handle terribly hight intrest rates", function(){
        const values = {
        amount: 1000,
        years: 40,
        rate: 99
        };
        expect(calculateMonthlyPayment(values)).toEqual('82.50');
});

