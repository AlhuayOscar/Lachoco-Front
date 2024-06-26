import _ from "lodash";
//@ts-ignore
import faker from "faker";
import React from "react";
import { GridColumn, Search, Grid } from "semantic-ui-react";

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, "$"),
}));

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

function SearchExampleStandard() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef: any = React.useRef();
  const handleSearchChange = React.useCallback((e: any, data: any) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });
    console.log(e ? "Searching on searchbar" : "Event didnt pop");
    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), "i");
      const isMatch = (result: any) => re.test(result.title);

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(source, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Grid>
      <GridColumn width={6}>
        <Search
          loading={loading}
          placeholder="Chocolatéa!"
          onResultSelect={(e, data) => (
            dispatch({
              type: "UPDATE_SELECTION",
              selection: data.result.title,
            }),
            console.log(e ? "Got searched on searchbar" : "Event didnt pop")
          )}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </GridColumn>
    </Grid>
  );
}

export default SearchExampleStandard;