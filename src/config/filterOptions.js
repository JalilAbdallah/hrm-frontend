// Filter options for case management
export const violationTypes = [
  { label: "Attack on Medical", value: "attack_on_medical" },
  { label: "War Crimes", value: "war_crimes" },
  { label: "Torture", value: "torture" },
  { label: "Arbitrary Detention", value: "arbitrary_detention" },
  { label: "Attack on Civilians", value: "attack_on_civilians" },
  { label: "Forced Displacement", value: "forced_displacement" },
  { label: "Crimes Against Humanity", value: "crimes_against_humanity" },
  { label: "Chemical Weapons", value: "chemical_weapons" },
];

export const countries = [
  { label: "Syria", value: "Syria" },
  { label: "Iraq", value: "Iraq" },
  { label: "Yemen", value: "Yemen" },
  { label: "Lebanon", value: "Lebanon" },
];

export const regions = [
  { label: "North-West", value: "North-West" },
  { label: "Damascus", value: "Damascus" },
  { label: "Aleppo", value: "Aleppo" },
  { label: "Daraa", value: "Daraa" },
  { label: "Idlib", value: "Idlib" },
  { label: "Homs", value: "Homs" },
  { label: "Hama", value: "Hama" },
];

export const statuses = [
  { label: "Under Investigation", value: "under_investigation" },
  { label: "Active", value: "active" },
  { label: "Closed", value: "closed" },
];

export const priorities = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

// Helper function to get filter label by value
export const getFilterLabel = (filterType, value) => {
  const filterMaps = {
    violationType: violationTypes,
    country: countries,
    region: regions,
    status: statuses,
    priority: priorities,
  };

  const options = filterMaps[filterType];
  if (!options) return value;
  
  const option = options.find(option => option.value === value);
  return option ? option.label : value;
};

// Export all filter options as a single object for convenience
export const filterOptions = {
  violationTypes,
  countries,
  regions,
  statuses,
  priorities,
};
