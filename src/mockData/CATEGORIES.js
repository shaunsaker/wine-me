const CATEGORIES = {
  wine: {
    order: 1,
    validation: {
      type: 'number',
      min: 1,
      max: 5,
    },
    name: 'Wine',
    question_text: 'How would you rate the wine?',
    is_rating: true,
  },
  child_friendly: {
    order: 2,
    validation: {
      type: 'string',
    },
    name: 'Child friendly',
    question_text: 'Was it child friendly?',
    options: ['Yes', 'No'],
  },
};

export default CATEGORIES;
