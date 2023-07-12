import { useState } from "react";
import { countries, temperatureRange } from "@/utils";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./FilterStyle.css";

interface IFilterProps {
  maxTemperature: number | string;
  minTemperature: number | string;
  country: string[];
  onTemperatureSelect: (type: string, value: string | number) => void;
  onCountrySelect: (value: string[]) => void;
}

export const Filters = (props: IFilterProps) => {
  const [selections, setSelections] = useState<string[]>(["Country"]);
  const countryList = [...countries.keys()];
  const {
    maxTemperature,
    minTemperature,
    onTemperatureSelect,
    onCountrySelect,
  } = props;
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    if (selections.includes("Country")) {
      setSelections(value.slice(1));
    } else {
      setSelections(typeof value === "string" ? value.split(",") : value);
    }
  };
  const submitCountries = () => {
    onCountrySelect(selections);
  };
  return (
    <section className="select-filter-container">
      <Select
        labelId="multiple-name-label"
        id="multiple-name"
        multiple
        value={selections}
        onChange={handleChange}
        onClose={submitCountries}
        className="select-filter"
      >
        {countryList.map((country, index) => (
          <MenuItem value={country} key={index}>
            {country}
          </MenuItem>
        ))}
      </Select>
      <Select
        className="select-filter"
        onChange={(e) => onTemperatureSelect("min", e.target.value)}
        value={minTemperature}
      >
        <MenuItem value="Min">Min</MenuItem>
        {temperatureRange.map((min) => (
          <MenuItem
            disabled={maxTemperature !== "Max" ? min >= +maxTemperature : false}
            value={min}
          >
            {min}
          </MenuItem>
        ))}
      </Select>
      <Select
        className="select-filter"
        onChange={(e) => onTemperatureSelect("max", e.target.value)}
        value={maxTemperature}
      >
        <MenuItem value="Max">Max</MenuItem>
        {temperatureRange.map((max) => (
          <MenuItem
            disabled={minTemperature !== "Min" ? max <= +minTemperature : false}
            value={max}
          >
            {max}
          </MenuItem>
        ))}
      </Select>
    </section>
  );
};
