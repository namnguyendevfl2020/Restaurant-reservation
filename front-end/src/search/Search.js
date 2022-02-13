import React, { useState } from "react";
import { ReservationRow } from "../dashboard";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

export default function Search() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const handleChange = ({ target: { value } }) => {
        setMobileNumber(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        setError(null);
        listReservations({ mobile_number: mobileNumber }, abortController.signal)
            .then(setReservations)
            .catch(setError);

        return () => abortController.abort();
    }
    const searchResults = () => {
        return reservations.length > 0 ?
		reservations.map((reservation) => 
			<ReservationRow key={reservation.reservation_id} reservation={reservation} />) :
			<tr><td>No reservations found</td></tr>;
    }
	return (
		<div>
			<form >
                <ErrorAlert error = {error} />
				<label className="form-label" htmlFor="mobile_number">Enter a customer's phone number:</label>
				<input 
					className="form-control"
					name="mobile_number"
					id="mobile_number"
					type="tel"
					onChange={handleChange}
					value={mobileNumber}
					required
				/>

				<button className="btn btn-primary m-1" type="submit" onClick={handleSubmit}>Find</button>
			</form>
            <table className="table m-1">
			<thead className="thead-light">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Mobile Number</th>
					<th scope="col">Time</th>
					<th scope="col">People</th>
					<th scope="col">Status</th>
					<th scope="col">Edit</th>
					<th scope="col">Cancel</th>
					<th scope="col">Seat</th>
				</tr>
			</thead>
				
			<tbody>
				{searchResults()}
			</tbody>
		</table>
		</div>
	);
}