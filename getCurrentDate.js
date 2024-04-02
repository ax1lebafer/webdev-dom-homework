// Функция для получения текущей даты
export const getCurrentDate = () => {
    const currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // тут я добавляю к месяцу 1, так как отсчет начинается с 0
    let year = currentDate.getFullYear().toString().slice(2);
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
  
    // Добавляем вперед нули, чтобы выглядело красиво
    if (date <= 9) {
      date = "0" + date;
    }
  
    if (month <= 9) {
      month = "0" + month;
    }
  
    if (hour <= 9) {
      hour = "0" + hour;
    }
  
    if (minutes <= 9) {
      minutes = "0" + minutes;
    }
  
    return `${date}.${month}.${year} ${hour}:${minutes}`;
  };