import { countries, getArrayRange } from "@/data";
import "./FilterStyle.css";

interface IFilterProps {
    maxTemperature?: number;
    minTemperature?: number;
    country: string;
    onTemperatureSelect: (type: string, value: string ) => void;
    onCountrySelect: (value: string) => void;
}

const temperatureRange = getArrayRange(-80, 80, 1);

export const Filters = (props: IFilterProps) => {
    const countryList = [...countries.keys()];
    const { maxTemperature, minTemperature, country, onTemperatureSelect, onCountrySelect } = props;
    return(
        <section className="select-filter-container">
            <select className="select-filter" onChange={(e) => onCountrySelect(e.target.value)}>
                <option value="All">Country</option>
                {countryList.map((country, index) => (
                    country !== "All" && <option key={index}>{country}</option>
                ))}
            </select>
            <select className="select-filter" onChange={(e) => onTemperatureSelect("min", e.target.value)}>
                <option value={"undefined"}>Min</option>
                {temperatureRange.map((min) => (
                    <option disabled={maxTemperature !== undefined ? min >= maxTemperature : false} value={min}>{min}</option>
                ))}
            </select>
            <select className="select-filter" onChange={(e) => onTemperatureSelect("max", e.target.value)}>
                <option value={"undefined"}>Max</option>
                {temperatureRange.map((max) => (
                    <option disabled={minTemperature !== undefined  ? max <= minTemperature : false } value={max}>{max}</option>
                ))}
            </select>
        </section>
    )
}