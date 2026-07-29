export type DestinationEditorialSource = {
  label: string;
  url: string;
  supports: string;
};

export type DestinationDayPlan = {
  time: "Mañana" | "Mediodía" | "Tarde-noche";
  title: string;
  detail: string;
};

export type DestinationEditorial = {
  seoTitle: string;
  seoDescription: string;
  localOverview: string;
  coolingFactors: string;
  stayAdvice: string;
  accessAdvice: string;
  dayPlan: readonly [
    DestinationDayPlan,
    DestinationDayPlan,
    DestinationDayPlan,
  ];
  checks: readonly [string, string, string];
  sources: readonly DestinationEditorialSource[];
};
