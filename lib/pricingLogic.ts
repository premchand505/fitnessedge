type Duration = '1' | '3' | '6' | '12';

const prices: Record<string, Record<Duration, number>> = {
  gym: { '1': 2500, '3': 5500, '6': 7500, '12': 12000 },
  pt: { '1': 2000, '3': 4000, '6': 6000, '12': 8000 },
  nutrition: { '1': 1500, '3': 3500, '6': 5000, '12': 8000 },
};

export interface ServiceSelection {
  gym: boolean;
  pt: boolean;
  nutrition: boolean;
}

export type DurationSelection = Duration;

const BUNDLE_DISCOUNT_PERCENTAGE = 0.12;
const THREE_MONTH_BUNDLE_PRICE = 11500;

export function calculatePrice(
  services: ServiceSelection,
  duration: DurationSelection
) {
  let originalPrice = 0;
  let finalPrice = 0;
  let discount = 0;

  if (services.gym) originalPrice += prices.gym[duration];
  if (services.pt) originalPrice += prices.pt[duration];
  if (services.nutrition) originalPrice += prices.nutrition[duration];

  const isAllInclusive = services.gym && services.pt && services.nutrition;

  if (isAllInclusive) {
    if (duration === '3') {
      finalPrice = THREE_MONTH_BUNDLE_PRICE;
      discount = originalPrice - finalPrice;
    } else {
      discount = originalPrice * BUNDLE_DISCOUNT_PERCENTAGE;
      finalPrice = originalPrice - discount;
    }
  } else {
    finalPrice = originalPrice;
  }

  const isBestValue = duration === '6' || duration === '12';

  return { originalPrice, finalPrice, discount, isBestValue, isAllInclusive };
}

export const durationTabs = [
  { id: '1', name: '1 Month' },
  { id: '3', name: '3 Months' },
  { id: '6', name: '6 Months' },
  { id: '12', name: '12 Months' },
];

export const serviceToggles = [
  { id: 'gym', name: 'Gym Access' },
  { id: 'pt', name: 'Personal Training' },
  { id: 'nutrition', name: 'Nutrition' },
];