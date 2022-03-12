/*
 * Counting the overlap of user's process and each template.
 * Here the user comment is not recorded, because this structure is
 * template-centered rather than phase-centered, and user comment is
 * phase-centered.
 */
const conciseResult = {
  tempA: {
    Total: {
      overlappingCount: 99,
      overlappingFraction: 0.26,
    },
    "phaseA-1": {
      overlappingCount: 18,
      overlappingFraction: 0.26,
      userComment: "user said something",
    },
    "phaseA-2": {
      overlappingCount: 1,
      overlappingFraction: 0.03,
    },
  },
};
