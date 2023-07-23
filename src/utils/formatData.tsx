import moment from "moment";

export function formatDate(dateString: moment.MomentInput) {
    const formattedDate = moment(dateString).format("DD-MM-YYYY");
    return formattedDate;
  }