import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useSearchContext } from "../contexts/SearchContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../forms/BookingForm/BookingForm";
//import { Elements } from "@stripe/react-stripe-js";
//import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  //const { stripePromise } = useAppContext();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  if (!hotel) {
    return <></>;
  }

  console.log(paymentIntentData);

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-5">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />

      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
