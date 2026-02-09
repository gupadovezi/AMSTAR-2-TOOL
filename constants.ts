
import { AMSTARQuestion } from './types';

export const AMSTAR_QUESTIONS: AMSTARQuestion[] = [
  {
    id: 1,
    text: "Did the research questions and inclusion criteria for the review include the components of PICO?",
    isCritical: false,
    options: ['Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Yes:",
        items: [
          { id: '1-pop', label: 'Population' },
          { id: '1-int', label: 'Intervention' },
          { id: '1-comp', label: 'Comparator group' },
          { id: '1-out', label: 'Outcome' }
        ]
      },
      {
        title: "Optional (recommended):",
        items: [
          { id: '1-follow', label: 'Timeframe for follow-up' }
        ]
      }
    ]
  },
  {
    id: 2,
    text: "Did the report of the review contain an explicit statement that the review methods were established prior to the conduct of the review and did the report justify any significant deviations from the protocol?",
    isCritical: true,
    options: ['Yes', 'Partial Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Partial Yes (ALL the following):",
        appliesTo: 'Partial Yes',
        items: [
          { id: '2-q', label: 'Review question(s)' },
          { id: '2-s', label: 'Search strategy' },
          { id: '2-inc', label: 'Inclusion/exclusion criteria' },
          { id: '2-rob', label: 'Risk of bias assessment' }
        ]
      },
      {
        title: "For Yes (As for partial plus):",
        appliesTo: 'Yes',
        items: [
          { id: '2-reg', label: 'Protocol registered' },
          { id: '2-meta', label: 'Meta-analysis/synthesis plan' },
          { id: '2-het', label: 'Plan for investigating heterogeneity' },
          { id: '2-dev', label: 'Justification for deviations' }
        ]
      }
    ]
  },
  {
    id: 3,
    text: "Did the review authors explain their selection of the study designs for inclusion in the review?",
    isCritical: false,
    options: ['Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Yes (Satisfy ONE):",
        items: [
          { id: '3-rct', label: 'Explanation for including only RCTs' },
          { id: '3-nrsi', label: 'OR Explanation for including only NRSI' },
          { id: '3-both', label: 'OR Explanation for including both RCTs and NRSI' }
        ]
      }
    ]
  },
  {
    id: 4,
    text: "Did the review authors use a comprehensive literature search strategy?",
    isCritical: true,
    options: ['Yes', 'Partial Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Partial Yes (all the following):",
        items: [
          { id: '4-db', label: 'Searched at least 2 databases' },
          { id: '4-kw', label: 'Provided key word and/or search strategy' },
          { id: '4-lr', label: 'Justified publication restrictions (e.g. language)' }
        ]
      },
      {
        title: "For Yes (should also have all):",
        items: [
          { id: '4-ref', label: 'Searched reference lists / bibliographies' },
          { id: '4-reg', label: 'Searched trial/study registries' },
          { id: '4-exp', label: 'Included/consulted content experts' },
          { id: '4-grey', label: 'Searched for grey literature' },
          { id: '4-time', label: 'Search within 24 months of completion' }
        ]
      }
    ]
  },
  {
    id: 5,
    text: "Did the review authors perform study selection in duplicate?",
    isCritical: false,
    options: ['Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Yes (either ONE):",
        items: [
          { id: '5-ind', label: 'At least two reviewers independently agreed on selection' },
          { id: '5-sample', label: 'OR two reviewers selected a sample and achieved good agreement (>=80%)' }
        ]
      }
    ]
  },
  {
    id: 6,
    text: "Did the review authors perform data extraction in duplicate?",
    isCritical: false,
    options: ['Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Yes (either ONE):",
        items: [
          { id: '6-cons', label: 'At least two reviewers achieved consensus on data extraction' },
          { id: '6-sample', label: 'OR two reviewers extracted data from a sample and achieved good agreement (>=80%)' }
        ]
      }
    ]
  },
  {
    id: 7,
    text: "Did the review authors provide a list of excluded studies and justify the exclusions?",
    isCritical: true,
    options: ['Yes', 'Partial Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Partial Yes:",
        items: [
          { id: '7-list', label: 'Provided a list of all potentially relevant studies read in full-text but excluded' }
        ]
      },
      {
        title: "For Yes (must also have):",
        items: [
          { id: '7-just', label: 'Justified the exclusion of each potentially relevant study' }
        ]
      }
    ]
  },
  {
    id: 8,
    text: "Did the review authors describe the included studies in adequate detail?",
    isCritical: false,
    options: ['Yes', 'Partial Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Partial Yes (ALL):",
        items: [
          { id: '8-pop', label: 'Described populations' },
          { id: '8-int', label: 'Described interventions' },
          { id: '8-comp', label: 'Described comparators' },
          { id: '8-out', label: 'Described outcomes' },
          { id: '8-des', label: 'Described research designs' }
        ]
      },
      {
        title: "For Yes (should also have ALL):",
        items: [
          { id: '8-pop-d', label: 'Population in detail' },
          { id: '8-int-d', label: 'Intervention in detail (incl. doses)' },
          { id: '8-comp-d', label: 'Comparator in detail' },
          { id: '8-set', label: 'Study setting' },
          { id: '8-time', label: 'Timeframe for follow-up' }
        ]
      }
    ]
  },
  {
    id: 9,
    text: "Did the review authors use a satisfactory technique for assessing the risk of bias (RoB) in individual studies included in the review?",
    isCritical: true,
    options: ['Yes', 'Partial Yes', 'No'],
    criteriaGroups: [
      {
        title: "For RCTs (Partial Yes - must assess):",
        items: [
          { id: '9-rct-1', label: 'Unconcealed allocation' },
          { id: '9-rct-2', label: 'Lack of blinding of patients and assessors' }
        ]
      },
      {
        title: "For RCTs (Yes - must also assess):",
        items: [
          { id: '9-rct-3', label: 'Allocation sequence was truly random' },
          { id: '9-rct-4', label: 'Selection of reported result' }
        ]
      },
      {
        title: "For NRSI (Partial Yes - must assess):",
        items: [
          { id: '9-nrsi-1', label: 'From confounding' },
          { id: '9-nrsi-2', label: 'From selection bias' }
        ]
      },
      {
        title: "For NRSI (Yes - must also assess):",
        items: [
          { id: '9-nrsi-3', label: 'Methods used to ascertain exposures/outcomes' },
          { id: '9-nrsi-4', label: 'Selection of reported result' }
        ]
      }
    ]
  },
  {
    id: 10,
    text: "Did the review authors report on the sources of funding for the studies included in the review?",
    isCritical: false,
    options: ['Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Yes:",
        items: [
          { id: '10-fund', label: 'Must have reported on sources of funding for individual studies' }
        ]
      }
    ]
  },
  {
    id: 11,
    text: "If meta-analysis was performed did the review authors use appropriate methods for statistical combination of results?",
    isCritical: true,
    options: ['Yes', 'No', 'Not Applicable'],
    criteriaGroups: [
      {
        title: "For RCTs (Yes):",
        items: [
          { id: '11-rct-just', label: 'Justified combining data' },
          { id: '11-rct-tech', label: 'Appropriate weighted technique used' },
          { id: '11-rct-het', label: 'Investigated causes of heterogeneity' }
        ]
      },
      {
        title: "For NRSI (Yes):",
        items: [
          { id: '11-nrsi-just', label: 'Justified combining data' },
          { id: '11-nrsi-tech', label: 'Appropriate weighted technique' },
          { id: '11-nrsi-adj', label: 'Combined adjusted effect estimates' },
          { id: '11-nrsi-sep', label: 'Reported separate summary estimates for RCT/NRSI' }
        ]
      }
    ]
  },
  {
    id: 12,
    text: "If meta-analysis was performed, did the review authors assess the potential impact of RoB in individual studies on the results of the meta-analysis or other evidence synthesis?",
    isCritical: false,
    options: ['Yes', 'No', 'Not Applicable'],
    criteriaGroups: [
      {
        title: "For Yes:",
        items: [
          { id: '12-low', label: 'Included only low risk of bias RCTs' },
          { id: '12-rob', label: 'OR performed analyses to investigate impact of RoB' }
        ]
      }
    ]
  },
  {
    id: 13,
    text: "Did the review authors account for RoB in individual studies when interpreting/discussing the results of the review?",
    isCritical: true,
    options: ['Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Yes:",
        items: [
          { id: '13-low', label: 'Included only low risk of bias RCTs' },
          { id: '13-disc', label: 'OR provided discussion of likely impact of RoB' }
        ]
      }
    ]
  },
  {
    id: 14,
    text: "Did the review authors provide a satisfactory explanation for, and discussion of, any heterogeneity observed in the results of the review?",
    isCritical: false,
    options: ['Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Yes:",
        items: [
          { id: '14-none', label: 'No significant heterogeneity' },
          { id: '14-inv', label: 'OR performed investigation of sources and discussed impact' }
        ]
      }
    ]
  },
  {
    id: 15,
    text: "If they performed quantitative synthesis did the review authors carry out an adequate investigation of publication bias (small study bias) and discuss its likely impact on the results of the review?",
    isCritical: true,
    options: ['Yes', 'No', 'Not Applicable'],
    criteriaGroups: [
      {
        title: "For Yes:",
        items: [
          { id: '15-test', label: 'Performed graphical or statistical tests for publication bias' }
        ]
      }
    ]
  },
  {
    id: 16,
    text: "Did the review authors report any potential sources of conflict of interest, including any funding they received for conducting the review?",
    isCritical: false,
    options: ['Yes', 'No'],
    criteriaGroups: [
      {
        title: "For Yes:",
        items: [
          { id: '16-no-coi', label: 'Reported no competing interests OR' },
          { id: '16-fund', label: 'Described funding sources and management of COI' }
        ]
      }
    ]
  }
];
