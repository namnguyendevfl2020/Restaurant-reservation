import React from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationForm(props) {
    const history = useHistory()
    const {
        handleSubmit,
        apiError,
        handleChange,
        errors,
        reservationData,
        reservationsError = null
    } = props

    const renderedErrors = () => {
        return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
    }
    return ( 
		<form onSubmit={handleSubmit}>
            {renderedErrors()}
			<ErrorAlert error={apiError} />
			<ErrorAlert error={reservationsError} />

            <div>
                <label className="form-label" htmlFor="first_name">First Name:&nbsp;</label>
                <input 
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    type="text"
                    onChange={handleChange}
                    value={reservationData.first_name}
                    required
                />
            </div>

            <div>
                <label htmlFor="last_name">Last Name:&nbsp;</label>
                <input 
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    type="text"
                    onChange={handleChange}
                    value={reservationData.last_name}
                    required
                />
            </div>

            <div>
                <label htmlFor="mobile_number">Mobile Number:&nbsp;</label>
                <input 
                    className="form-control"
                    name="mobile_number"
                    id="mobile_number"
                    type="text"
                    onChange={handleChange}
                    value={reservationData.mobile_number}
                    required
                />
            </div>
			
            <div>
                <label htmlFor="reservation_date">Reservation Date:&nbsp;</label>
                <input 
                    className="form-control"
                    name="reservation_date" 
                    id="reservation_date"
                    type="date"
                    onChange={handleChange}
                    value={reservationData.reservation_date}
                    required
                />
            </div>
			
            <div>
                <label htmlFor="reservation_time">Reservation Time:&nbsp;</label>
                <input 
                    className="form-control"
                    name="reservation_time" 
                    id="reservation_time"
                    type="time"
                    onChange={handleChange}
                    value={reservationData.reservation_time}
                    required
                />
            </div>
			
            <div>
                <label htmlFor="people">Party Size:&nbsp;</label>
                <input 
                    className="form-control"
                    name="people"
                    id="people"
                    type="number"
                    min="1"
                    onChange={handleChange}
                    value={reservationData.people}
                    required
                />
            </div>

			<button className="btn btn-primary m-1" type="submit" >Submit</button>
			<button className="btn btn-danger m-1" type="button" onClick={history.goBack}>Cancel</button>
		</form>
    )
}