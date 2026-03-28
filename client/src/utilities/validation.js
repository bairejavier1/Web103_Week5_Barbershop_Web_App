export const validateBooking = ({ customer_name, haircut_style, beard_service, scalp_treatment }) => {
  if (!customer_name || customer_name.trim() === '')
    return 'Please enter a customer name.'
  if (!haircut_style)
    return 'Please select a haircut style.'
  if (haircut_style === 'buzz' && beard_service === 'shape')
    return 'A buzz cut with beard shaping is not a valid combination.'
  if (haircut_style === 'buzz' && scalp_treatment === 'treatment')
    return 'A scalp treatment is not available with a buzz cut.'
  return null
}