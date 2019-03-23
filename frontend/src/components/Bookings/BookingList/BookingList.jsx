import React from 'react'
import './BookingList.css'

const bookingList = props => {
    return (
        <ul className="bookings__list">
            {props.bookings.map(booking => {
                return  <li key={booking._id} className="bookings__item">
                            <div className="bookings__item-data">{booking.event.title} - {new Date(booking.createdAt).toLocaleDateString()}</div>
                            <div className="bookings__item-action">
                                <button className="btn" onClick={props.onDelete.bind(this, booking._id)}>cancel</button>
                            </div>
                        </li>
            })}
        </ul>
    )
}

export default bookingList