import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import { validateDate, validateFields } from "./validator";

export default function NewReservation({ loadDashboard}) {
    const history = useHistory();
    const initialReservation = {
        first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
    }
    const [reservationData, setReservationData] = useState(initialReservation)
    const [errors, setErrors] = useState([]);
	const [apiError, setApiError] = useState(null);

    const handleChange = ({target: {name,value}}) => {
        setReservationData(prevData => ({
            ...prevData,
            [name]: name === "people" ? Number(value) : value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
		const abortController = new AbortController();
        const foundErrors = []
        if(validateDate(foundErrors, reservationData) && validateFields(foundErrors, reservationData)) {
            createReservation(reservationData, abortController.signal)
                .then(loadDashboard)
                .then(() => history.push(`/dashboard?date=${reservationData.reservation_date}`))
                .catch(setApiError);
        }
        setErrors(foundErrors);
		return () => abortController.abort();
    }
    return (
hoai        <ReservationForm 
        handleSubmit = {handleSubmit}
        errors = {errors}
        apiError = {apiError}
        handleChange = {handleChange}
        reservationData = {reservationData}
        />
    )
}