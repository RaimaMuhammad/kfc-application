export const COUNTRY = {
  name: "Uganda",
  code: "UG",
  phoneCode: "+256",
  currency: "UGX",
  locale: "en-UG",
  timeZone: "Africa/Kampala",
};

export const formatPrice = (amount) => {
  if (amount === null || amount === undefined || amount === "") {
    return "UGX 0";
  }

  const numericPrice =
    typeof amount === "number"
      ? amount
      : Number(String(amount).replace(/[^0-9.-]/g, ""));

  if (!Number.isFinite(numericPrice)) {
    console.error("Invalid product price:", amount);
    return "UGX 0";
  }

  return `UGX ${new Intl.NumberFormat(COUNTRY.locale, {
    maximumFractionDigits: 0,
  }).format(numericPrice)}`;
};