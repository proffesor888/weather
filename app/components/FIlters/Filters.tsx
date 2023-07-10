import { countries, getArrayRange } from "@/data";

interface IFilterProps {
    maxTemperature: number;
    minTemperature: number;
    onTemperatureSelect: (value: number, type: string) => void;
}

const temperatureRange = getArrayRange(-80, 80, 1);

export const Filters = (props: IFilterProps) => {
    const countryList = [...countries.keys()];
    const { maxTemperature, minTemperature, onTemperatureSelect } = props;
    return(
        <section>
            <select>
                <option value="All">Country</option>
                {countryList.map((country, index) => (
                    country !== "All" && <option key={index}>{country}</option>
                ))}
            </select>
            <select onChange={(e) => onTemperatureSelect(+e.target.value, "min")}>
                <option>Min</option>
                {temperatureRange.map((min) => (
                    <option disabled={min >= maxTemperature} value={min}>{min}</option>
                ))}
            </select>
            <select onChange={(e) => onTemperatureSelect(+e.target.value, "max")}>
                <option>Max</option>
                {temperatureRange.map((max) => (
                    <option disabled={max <= minTemperature} value={max}>{max}</option>
                ))}
            </select>
        </section>
    )
}