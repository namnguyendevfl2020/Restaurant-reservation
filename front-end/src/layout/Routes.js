import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import NewTable from "../tables/NewTable";
import { listReservations, listTables } from "../utils/api";
import Search from "../search/Search";
import { EditReservation, NewReservation, SeatReservation } from "../reservations";
import { Dashboard } from "../dashboard";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date") ? query.get("date") : today();
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);
	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();

    setReservationsError(null);

    listReservations({ date: date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal)
			.then((tables) => tables.sort((tableA, tableB) => tableA.table_id - tableB.table_id))
			.then(setTables)
			.catch(setTablesError);
    return () => abortController.abort();

  }

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path = "/reservations/new">
        <NewReservation 
					loadDashboard={loadDashboard}
        />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatReservation
					loadDashboard={loadDashboard}
          tables={tables}
        />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation
          reservations={reservations}
        />
      </Route>
      <Route exact path = "/tables/new">
        <NewTable 
					loadDashboard={loadDashboard}
        />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/dashboard">
        <Dashboard 
          date={date} 
					loadDashboard={loadDashboard}
          reservations={reservations}
          reservationsError={reservationsError}
          tables={tables}
          tablesError={tablesError}
          />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
