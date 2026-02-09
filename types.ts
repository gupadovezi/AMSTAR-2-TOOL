
export type RatingValue = 'Yes' | 'Partial Yes' | 'No' | 'Not Applicable' | 'Includes only RCTs' | 'Includes only NRSI';

export interface Criterion {
  id: string;
  label: string;
  isRequirement?: boolean;
}

export interface AMSTARQuestion {
  id: number;
  text: string;
  options: RatingValue[];
  criteriaGroups: {
    title: string;
    items: Criterion[];
    appliesTo?: RatingValue;
  }[];
  isCritical: boolean;
  helpText?: string;
}

export interface AssessmentState {
  [key: number]: {
    rating: RatingValue | null;
    notes: string;
    checkedCriteria: string[];
  };
}
