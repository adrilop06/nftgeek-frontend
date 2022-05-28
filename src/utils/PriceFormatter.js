export const PriceFormatter = (price) => {
    const formatConfig = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  
    return formatConfig.format(price);
  }