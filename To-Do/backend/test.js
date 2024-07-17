const today = new Date();

console.log(today.toLocaleDateString())
// Mon Jun 10 2024 00:08:30 GMT+0530 (India Standard Time)

const now = new Date();
  const sevenDaysAgoStart = new Date(now);
  sevenDaysAgoStart.setDate(now.getDate() - 7);
  sevenDaysAgoStart.setHours(23, 59, 59, 999);
  console.log(sevenDaysAgoStart.toLocaleDateString());

//   const sevenDaysAgoEnd = new Date(now);
//   sevenDaysAgoEnd.setDate(now.getDate() - 7);
//   sevenDaysAgoEnd.setHours(23, 59, 59, 999);