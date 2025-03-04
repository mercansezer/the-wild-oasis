import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { formatISO, subDays } from "date-fns";
//SERVER SIDE FILTERING
//SERVER SIDE FILTERING
//SERVER SIDE FILTERING
//SERVER SIDE FILTERING
//SERVER SIDE FILTERING
//SERVER SIDE FILTERING

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    ); // bookingsdeki foreign key sayesinde cabinId ve guestId falan var onlar sayesinde cabins ve guestsden istediğimizi alabildik ekstra olarak. cabins(*) yapsaydım hepsini çekecekti.

  //second argumant olarak verilen {count:"exact"} kısmı net olarak uzunlugu verir. yani bookings db'sindeki sayıyı verir. await data error ile birlikte countta alıp return edebiliriz.

  /*FILER */
  /*FILER */
  /*FILER */
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }
  /*SORTBY*/
  /*SORTBY */
  /*SORTBY */
  if (sortBy) {
    const [field, value] = sortBy.split("-");
    const isAscending = value === "asc" ? true : false;
    query = query.order(field, { ascending: isAscending });
  }

  //API-SIDE PAGINATION
  //API-SIDE PAGINATION
  //API-SIDE PAGINATION
  if (page) {
    //range kullanacağız, 2 parametre alacak from ve to.
    const from = (page - 1) * PAGE_SIZE;
    const to = PAGE_SIZE * page - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date) //all the bookings after the date
    .lte("created_at", getToday({ end: true })); //add today

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(obj, id) {
  console.log(obj);
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  return data;
}
