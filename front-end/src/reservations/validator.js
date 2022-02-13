export const validateFields = (foundErrors, reservationData) => {
    for(const field in reservationData) {
        if(reservationData[field] === "") {
            foundErrors.push({ message: `${field.split("_").join(" ")} cannot be left blank.`})
        }
    }

    if(reservationData.people <= 0) {
        foundErrors.push({ message: "Party must be a size of at least 1." })
    }

    if(foundErrors.length > 0) {
        return false;
    }
    return true;
}

export const validateDate = (foundErrors, reservationData) => {
    const reserveDate = new Date(`${reservationData.reservation_date}T${reservationData.reservation_time}:00.000`)
    const todaysDate = new Date()
    if (reserveDate.getDay() === 2) {
        foundErrors.push({ message: "Reservations cannot be made on a Tuesday (Restaurant is closed)." });
    }
    if (reserveDate < todaysDate) {
        foundErrors.push({ message: "Reservations cannot be made in the past." });
    }

    if(reserveDate.getHours() < 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)) {
        foundErrors.push({ message: "Reservation cannot be made: Restaurant is not open until 10:30AM." });
    } else if(reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)) {
        foundErrors.push({ message: "Reservation cannot be made: Restaurant is closed after 10:30PM." });
    } else if(reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)) {
        foundErrors.push({ message: "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM)." })
    }
    if(foundErrors.length > 0) {
        return false;
    }
    return true;
}



