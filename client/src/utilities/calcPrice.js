export const PRICES = {
  haircut_style: { fade: 30, taper: 30, buzz: 20, frohawk: 35, caesar: 25 },
  beard_service: { none: 0, trim: 15, shape: 20, lineup: 10 },
  scalp_treatment: { none: 0, shampoo: 10, treatment: 20 },
  stylist: { any: 0, Marcus: 0, Jordan: 5, Casey: 5 }
}

export const calcTotal = ({ haircut_style, beard_service, scalp_treatment, stylist }) =>
  (PRICES.haircut_style[haircut_style]     || 0) +
  (PRICES.beard_service[beard_service]     || 0) +
  (PRICES.scalp_treatment[scalp_treatment] || 0) +
  (PRICES.stylist[stylist]                 || 0)