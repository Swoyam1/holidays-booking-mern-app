import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import {
  //PaymentIntentResponse,
  UserType,
} from "../../../../backend/src/shared/types";
import { useParams } from "react-router-dom";
// import {
//   CardElement,
//   //useElements, useStripe
// } from "@stripe/react-stripe-js";

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

type Props = {
  currentUser: UserType;
};

const BookingForm = ({ currentUser }: Props) => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  // const stripe = useStripe();
  // const elements = useElements();
  const { register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      // totalCost: paymentIntent.totalCost,
      // paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            readOnly
            disabled
            {...register("firstName")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            readOnly
            disabled
            {...register("lastName")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            readOnly
            disabled
            {...register("email")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost:
            {/* ${paymentIntent.totalCost.toFixed(2)} */}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      {/* <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div> */}
    </form>
  );
};

export default BookingForm;
