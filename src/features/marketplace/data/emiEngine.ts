import { EmiPlan } from '../types';

interface PlanTemplate {
  months: number;
  /** Flat annual rate. 0 => no-cost EMI (1Fi subsidised). */
  interestRate: number;
  processingFee: number;
  recommended?: boolean;
}

/**
 * Tenure ladder offered on the marketplace. Longer tenures carry a small
 * interest rate; the 3 and 6 month plans are no-cost.
 */
const PLAN_TEMPLATES: PlanTemplate[] = [
  { months: 3, interestRate: 0, processingFee: 0 },
  { months: 6, interestRate: 0, processingFee: 0, recommended: true },
  { months: 9, interestRate: 12, processingFee: 199 },
  { months: 12, interestRate: 13, processingFee: 199 },
  { months: 18, interestRate: 14, processingFee: 299 },
  { months: 24, interestRate: 15, processingFee: 349 },
];

const roundRupee = (value: number) => Math.round(value);

/**
 * Reducing-balance EMI. For no-cost plans the monthly amount is simply the
 * principal split evenly, so the customer repays exactly the price.
 */
function computePlan(principal: number, template: PlanTemplate): EmiPlan {
  const { months, interestRate, processingFee, recommended } = template;

  if (interestRate === 0) {
    const monthly = roundRupee(principal / months);
    // Absorb rounding drift into the first instalment conceptually; expose the
    // even figure and keep total == principal.
    return {
      id: `plan-${months}m`,
      months,
      monthlyAmount: monthly,
      totalPayable: principal,
      interestRate: 0,
      noCost: true,
      processingFee,
      recommended,
    };
  }

  const monthlyRate = interestRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const monthly = roundRupee(emi);

  return {
    id: `plan-${months}m`,
    months,
    monthlyAmount: monthly,
    totalPayable: monthly * months,
    interestRate,
    noCost: false,
    processingFee,
    recommended,
  };
}

export function buildEmiPlans(principal: number): EmiPlan[] {
  return PLAN_TEMPLATES.filter((t) => principal / t.months >= 500).map((t) =>
    computePlan(principal, t),
  );
}
