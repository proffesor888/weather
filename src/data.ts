export const countries = new Map([
  ["Ukraine", ["Kyiv", "Dnipro", "Odessa"]],
  ["GB", ["London"]],
  ["Netherlands", ["Amsterdam"]],
  ["Italy", ["Venice"]],
  ["Finland", ["Helsinki"]],
  ["Luxembourg", ["Luxembourg"]],
  [
    "All",
    [
      "Kyiv",
      "Dnipro",
      "Odessa",
      "London",
      "Amsterdam",
      "Venice",
      "Helsinki",
      "Luxembourg",
    ],
  ],
]);

export const coordinates = new Map([
  ["Kyiv", { lat: "50.4", long: "30.5" }],
  ["Dnipro", { lat: "48.4", long: "34.9" }],
  ["Odessa", { lat: "46.4", long: "30.7" }],
  ["London", { lat: "51.5", long: "-0.11" }],
  ["Helsinki", { lat: "60.1", long: "24.9" }],
  ["Venice", { lat: "45.4", long: "12.3" }],
  ["Luxembourg", { lat: "49.6", long: "6.1" }],
  ["Amsterdam", { lat: "52.3", long: "4.8" }],
]);

export const getApiUrl = (lat: string = "", long: string = "") => {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&current_weather=true`;
}