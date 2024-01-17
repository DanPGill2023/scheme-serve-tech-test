import { useEffect, useState } from "react";
import { capitaliseWords } from "src/utils/func/string";
import { DataViewTableProps, CrimeData } from "./types";
import LoadingSpinnerWrapper from "src/components/LoadingSpinnerWrapper";

const DataViewTable = ({
  selectedCoordinates = {},
  date = "2023-01",
  postcode,
  loadingCoordinates,
}: DataViewTableProps) => {
  const [crimeTypes, setCrimeTypes] = useState<string[]>([""]);
  const [selectedCrimeType, setSelectedCrimeType] = useState<string>(
    crimeTypes[0]
  );
  const [crimeData, setCrimeData] = useState<CrimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCrimeTypes = (data: CrimeData[]) => {
    const crimeTypes = data.map((datum) => {
      return datum.category;
    });
    const uniqueCrimeTypes = crimeTypes
      .filter((type, i, self) => {
        return i === self.indexOf(type);
      })
      .sort();

    return uniqueCrimeTypes;
  };

  const getTableData = (data: CrimeData[]) => {
    const dataByCrimeType = data.filter((datum) => {
      const crimeTypeToCompare = selectedCrimeType.length
        ? selectedCrimeType
        : crimeTypes[0];
      return datum.category === crimeTypeToCompare;
    });
    const tableData = dataByCrimeType.map((datum) => {
      const { month, location, outcome_status } = datum;
      const date_of_crime = month;
      const street_name = location.street.name;
      const outcome = outcome_status.category || "On Going";

      return {
        postcode,
        date_of_crime,
        street_name,
        outcome,
        id: datum.id,
      };
    });

    return tableData;
  };

  const getTableHeaders = (datum: CrimeData | {} = {}) => {
    const rawHeaders = Object.keys(datum);
    const refinedHeaders = rawHeaders.map((header) => {
      const headerWithoutUnderscore = header.replaceAll("_", " ");
      return capitaliseWords(headerWithoutUnderscore);
    });
    return refinedHeaders.filter((header) => header !== "Id");
  };

  const handleUpdateSelectedCrimeType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCrimeType(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    if (Object.keys(selectedCoordinates).length) {
      const fetchData = async () => {
        const { latitude, longitude } = selectedCoordinates;
        const requestUrl = `https://data.police.uk/api/crimes-at-location?date=${date}&lat=${latitude}&lng=${longitude}`;
        const response = await fetch(requestUrl);
        const jsonResponse = await response.json();
        const crimeTypes = getCrimeTypes(jsonResponse);

        setCrimeTypes(crimeTypes);
        setCrimeData(jsonResponse);
      };
      fetchData().then(() => setLoading(false));
    }
  }, [selectedCoordinates, date]);

  const tableData = getTableData(crimeData);
  const tableHeaders = tableData ? getTableHeaders(tableData[0]) : [];

  return (
    <div className="flex flex-col flex-1">
      <label className="mx-6">
        Select a category of crime:
        <select
          disabled={!crimeTypes.length}
          onChange={(event) => handleUpdateSelectedCrimeType(event)}
          className="mx-6 w-fit bg-theme-purple text-white rounded-md p-2"
        >
          {crimeTypes.map((crime) => {
            const label = capitaliseWords(crime.replaceAll("-", " "));

            return (
              <option key={crime} value={crime}>
                {label}
              </option>
            );
          })}
        </select>
      </label>
      <div className="rounded-md flex flex-1 overflow-auto bg-theme-purple m-6">
        {crimeData.length ? (
          <LoadingSpinnerWrapper
            isLoading={loadingCoordinates || loading}
            spinnerColor={"white"}
          >
            <table className="w-full border-collapse text-white table-fixed">
              <thead>
                <tr className="">
                  {tableHeaders.map((header, i) => {
                    return (
                      <th
                        className="p-2 border border-white text-center"
                        key={`header${i}`}
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="">
                {tableData?.map((datum) => {
                  const values = Object.values(datum);
                  return (
                    <tr className="" key={datum.id}>
                      {values.map((value) => {
                        return value !== datum.id ? (
                          <td
                            className="p-2 border text-center border-white"
                            key={`${value}_${datum.id}`}
                          >
                            {value}
                          </td>
                        ) : null;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </LoadingSpinnerWrapper>
        ) : (
          <div className="flex flex-1 justify-center items-center text-white">
            No Data Available for Current Selection
          </div>
        )}
      </div>
    </div>
  );
};

export default DataViewTable;
