// Функция для форматирования текущей даты
Date.prototype.format = function () {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return this.toLocaleString("ru", options).replace(",", "");
}

// Функция для предовращения уязвимостей
String.prototype.vulnerabilityPrevention = function () {
  return this
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

String.prototype.understandQuote = function () {
  return this
    .replaceAll("QUOTE_BEGIN", '<div class="quote">')
    .replaceAll("QUOTE_END", "</div>")
}

String.prototype.isEmpty = function () {
  return this.trim().length === 0
}
