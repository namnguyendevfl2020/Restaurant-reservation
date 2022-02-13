import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { editReservation, listReservations } from "../utils/api";
import ReservationForm from "./ReservationForm";
import { validateDate, validateFields } from "./validator";

export default function EditReservation({loadDashboard}) {
    const history = useHistory();
    const { reservation_id } = useParams();
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
	const [reservationsError, setReservationsError] = useState(null);

    useEffect(() => {
        if(!reservation_id) return null;

        loadReservations()
            .then((response) => response.find((reservation) => 
                reservation.reservation_id === Number(reservation_id)))
            .then(fillFields);
		
        function fillFields(foundReservation) {
			if(!foundReservation || foundReservation.status !== "booked") {
				return <p>Only booked reservations can be edited.</p>;
			}

			const date = new Date(foundReservation.reservation_date);
			const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + (date.getDate())).slice(-2)}`;
	
			setReservationData({
				first_name: foundReservation.first_name,
				last_name: foundReservation.last_name,
				mobile_number: foundReservation.mobile_number,
				reservation_date: dateString,
				reservation_time: foundReservation.reservation_time,
				people: foundReservation.people,
			});
		}

		async function loadReservations() {
			const abortController = new AbortController();
			return await listReservations(null, abortController.signal)
				.catch(setReservationsError);
		}
	}, [reservation_id]);

    

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
            editReservation(reservation_id, reservationData, abortController.signal)
                .then(loadDashboard)
                .then(() => history.push(`/dashboard?date=${reservationData.reservation_date}`))
                .catch(setApiError);
        }
        setErrors(foundErrors);
		return () => abortController.abort();
    }
    
    return (
        <ReservationForm 
        handleSubmit = {handleSubmit}
        errors = {errors}
        apiError = {apiError}
        reservationsError = {reservationsError}
        handleChange = {handleChange}
        reservationData = {reservationData}
        />
    )
}