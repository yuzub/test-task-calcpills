const assert = require('assert');
const calculateIntakeEndDate = require('./test-task');

describe('calculateIntakeEndDate ALL TESTS FOR Start Date: Wed 22.04.2020 16:06 !!! not for NOW -> need to change this in function manually', function () {
  describe('daily Test case 0', function () {
    it('should return Wed 22.04.2020 23:57', function () {
      const Intakes = [
        { time: '01:54', pills: 6 },
        { time: '04:57', pills: 5 },
        { time: '23:57', pills: 5 },
      ];
      const Stock = 4;
      const Frequency = 'daily';
      const WeekDays = null;
      const shouldBe = new Date('2020.04.22 23:57');
      const result = calculateIntakeEndDate(
        Intakes,
        Stock,
        Frequency,
        WeekDays
      );
      assert.strictEqual(result.getTime(), shouldBe.getTime());
    });
  });

  describe('daily Test case 1', function () {
    it('should return Mon 27.04.2020 15:48', function () {
      const Intakes = [{ time: '15:48', pills: 2 }];
      const Stock = 10;
      const Frequency = 'daily';
      const WeekDays = null;
      const shouldBe = new Date('2020.04.27 15:48');
      const result = calculateIntakeEndDate(
        Intakes,
        Stock,
        Frequency,
        WeekDays
      );
      assert.strictEqual(result.getTime(), shouldBe.getTime());
    });
  });



  describe('eachOtherDay Test case 0', function () {
    it('should return Fri 24.04.2020 08:00', function () {
      const Intakes = [
        { time: '08:00', pills: 5 },
        { time: '23:15', pills: 1 },
      ];
      const Stock = 4;
      const Frequency = 'eachOtherDay';
      const WeekDays = null;
      const shouldBe = new Date('2020.04.24 08:00');
      const result = calculateIntakeEndDate(
        Intakes,
        Stock,
        Frequency,
        WeekDays
      );
      assert.strictEqual(result.getTime(), shouldBe.getTime());
    });
  });

  describe('eachOtherDay Test case 1', function () {
    it('should return Sun 26.04.2020 17:20', function () {
      const Intakes = [
        { time: '13:25', pills: 6 },
        { time: '17:20', pills: 6 },
      ];
      const Stock = 26;
      const Frequency = 'eachOtherDay';
      const WeekDays = null;
      const shouldBe = new Date('2020.04.26 17:20');
      const result = calculateIntakeEndDate(
        Intakes,
        Stock,
        Frequency,
        WeekDays
      );
      assert.strictEqual(result.getTime(), shouldBe.getTime());
    });
  });



  describe('weekly Test case 0', function () {
    it('should return Mon 15.06.2020 23:55', function () {
      const Intakes = [
        { time: '13:16', pills: 1 },
        { time: '23:55', pills: 3 },
      ];
      const Stock = 64;
      const Frequency = 'weekly';
      const WeekDays = {
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: true,
      };
      const shouldBe = new Date('2020.06.15 23:55');
      const result = calculateIntakeEndDate(
        Intakes,
        Stock,
        Frequency,
        WeekDays
      );
      assert.strictEqual(result.getTime(), shouldBe.getTime());
    });
  });

  describe('weekly Test case 1', function () {
    it('should return Wed 10.06.2020 12:54', function () {
      const Intakes = [
        { time: '02:57', pills: 1 },
        { time: '12:54', pills: 3 },
      ];
      const Stock = 84;
      const Frequency = 'weekly';
      const WeekDays = {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      };
      const shouldBe = new Date('2020.06.10 12:54');
      const result = calculateIntakeEndDate(
        Intakes,
        Stock,
        Frequency,
        WeekDays
      );
      assert.strictEqual(result.getTime(), shouldBe.getTime());
    });
  });
});



// describe('calculateIntakeEndDate ALL TESTS FOR Start Date: 01.11.2020 ~23:20 !!! not for NOW -> need to change this in function manually', function () {
//   describe('daily Test case 0', function () {
//     it('should return 01.11.2020 23:57', function () {
//       const Intakes = [
//         { time: '01:54', pills: 6 },
//         { time: '04:57', pills: 5 },
//         { time: '23:57', pills: 5 },
//       ];
//       const Stock = 4;
//       const Frequency = 'daily';
//       const WeekDays = null;
//       const shouldBe = new Date('2020.11.01 23:57');
//       const result = calculateIntakeEndDate(
//         Intakes,
//         Stock,
//         Frequency,
//         WeekDays
//       );
//       assert.strictEqual(result.getTime(), shouldBe.getTime());
//     });
//   });

//   describe('daily Test case 1', function () {
//     it('should return 06.11.2020 15:48', function () {
//       const Intakes = [{ time: '15:48', pills: 2 }];
//       const Stock = 10;
//       const Frequency = 'daily';
//       const WeekDays = null;
//       const shouldBe = new Date('2020.11.06 15:48');
//       const result = calculateIntakeEndDate(
//         Intakes,
//         Stock,
//         Frequency,
//         WeekDays
//       );
//       assert.strictEqual(result.getTime(), shouldBe.getTime());
//     });
//   });



//   describe('eachOtherDay Test case 0', function () {
//     it('should return 03.11.2020 08:00', function () {
//       const Intakes = [
//         { time: '08:00', pills: 5 },
//         { time: '23:55', pills: 1 },
//       ];
//       const Stock = 4;
//       const Frequency = 'eachOtherDay';
//       const WeekDays = null;
//       const shouldBe = new Date('2020.11.03 08:00');
//       const result = calculateIntakeEndDate(
//         Intakes,
//         Stock,
//         Frequency,
//         WeekDays
//       );
//       assert.strictEqual(result.getTime(), shouldBe.getTime());
//     });
//   });

//   describe('eachOtherDay Test case 1', function () {
//     it('should return 07.11.2020 13:25', function () {
//       const Intakes = [
//         { time: '13:25', pills: 6 },
//         { time: '17:20', pills: 6 },
//       ];
//       const Stock = 26;
//       const Frequency = 'eachOtherDay';
//       const WeekDays = null;
//       const shouldBe = new Date('2020.11.07 13:25');
//       const result = calculateIntakeEndDate(
//         Intakes,
//         Stock,
//         Frequency,
//         WeekDays
//       );
//       assert.strictEqual(result.getTime(), shouldBe.getTime());
//     });
//   });



//   describe('weekly Test case 0', function () {
//     it('should return 27.12.2020 13:16', function () {
//       const Intakes = [
//         { time: '13:16', pills: 1 },
//         { time: '23:55', pills: 3 },
//       ];
//       const Stock = 64;
//       const Frequency = 'weekly';
//       const WeekDays = {
//         monday: true,
//         tuesday: false,
//         wednesday: false,
//         thursday: false,
//         friday: false,
//         saturday: false,
//         sunday: true,
//       };
//       const shouldBe = new Date('2020.12.27 13:16');
//       const result = calculateIntakeEndDate(
//         Intakes,
//         Stock,
//         Frequency,
//         WeekDays
//       );
//       assert.strictEqual(result.getTime(), shouldBe.getTime());
//     });
//   });

//   describe('weekly Test case 1', function () {
//     it('should return 16.12.2020 12:54', function () {
//       const Intakes = [
//         { time: '02:57', pills: 1 },
//         { time: '12:54', pills: 3 },
//       ];
//       const Stock = 84;
//       const Frequency = 'weekly';
//       const WeekDays = {
//         monday: true,
//         tuesday: true,
//         wednesday: true,
//         thursday: false,
//         friday: false,
//         saturday: false,
//         sunday: false,
//       };
//       const shouldBe = new Date('2020.12.16 12:54');
//       const result = calculateIntakeEndDate(
//         Intakes,
//         Stock,
//         Frequency,
//         WeekDays
//       );
//       assert.strictEqual(result.getTime(), shouldBe.getTime());
//     });
//   });
// });
