import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateSurveyResponseDto } from './create-survey-response.dto';

describe('CreateSurveyResponseDto', () => {
  const createDto = (data: Partial<CreateSurveyResponseDto>) => {
    return plainToInstance(CreateSurveyResponseDto, data);
  };

  describe('Likert 1-5 integer fields', () => {
    const likertFields = [
      'q1OverallRating',
      'q2ReturnIntent',
      'q5ConnectionDepth',
      'q6LearningValue',
      'q9PreConferenceCommunication',
    ];

    likertFields.forEach((field) => {
      describe(field, () => {
        it('should accept valid values 1-5', async () => {
          for (const value of [1, 2, 3, 4, 5]) {
            const dto = createDto({ [field]: value });
            const errors = await validate(dto);
            const fieldErrors = errors.filter((e) => e.property === field);
            expect(fieldErrors).toHaveLength(0);
          }
        });

        it('should reject value below 1', async () => {
          const dto = createDto({ [field]: 0 });
          const errors = await validate(dto);
          const fieldErrors = errors.filter((e) => e.property === field);
          expect(fieldErrors.length).toBeGreaterThan(0);
        });

        it('should reject value above 5', async () => {
          const dto = createDto({ [field]: 6 });
          const errors = await validate(dto);
          const fieldErrors = errors.filter((e) => e.property === field);
          expect(fieldErrors.length).toBeGreaterThan(0);
        });

        it('should reject non-integer values', async () => {
          const dto = createDto({ [field]: 3.5 });
          const errors = await validate(dto);
          const fieldErrors = errors.filter((e) => e.property === field);
          expect(fieldErrors.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Likert with N/A string fields', () => {
    const likertNAFields = [
      { field: 'q3CoworkingEffectiveness', message: 'q3CoworkingEffectiveness must be 1-5 or NA' },
      { field: 'q8SaturdayWorth', message: 'q8SaturdayWorth must be 1-5 or NA' },
      { field: 'q10AccommodationsVenue', message: 'q10AccommodationsVenue must be 1-5 or NA' },
      { field: 'q13ComparisonToPD', message: 'q13ComparisonToPD must be 1-5 or NA' },
    ];

    likertNAFields.forEach(({ field, message }) => {
      describe(field, () => {
        it('should accept valid values 1-5 as strings', async () => {
          for (const value of ['1', '2', '3', '4', '5']) {
            const dto = createDto({ [field]: value });
            const errors = await validate(dto);
            const fieldErrors = errors.filter((e) => e.property === field);
            expect(fieldErrors).toHaveLength(0);
          }
        });

        it('should accept NA value', async () => {
          const dto = createDto({ [field]: 'NA' });
          const errors = await validate(dto);
          const fieldErrors = errors.filter((e) => e.property === field);
          expect(fieldErrors).toHaveLength(0);
        });

        it('should reject invalid string values', async () => {
          const dto = createDto({ [field]: 'invalid' });
          const errors = await validate(dto);
          const fieldErrors = errors.filter((e) => e.property === field);
          expect(fieldErrors.length).toBeGreaterThan(0);
          expect(fieldErrors[0].constraints?.isIn).toBe(message);
        });

        it('should reject lowercase na', async () => {
          const dto = createDto({ [field]: 'na' });
          const errors = await validate(dto);
          const fieldErrors = errors.filter((e) => e.property === field);
          expect(fieldErrors.length).toBeGreaterThan(0);
        });

        it('should reject numeric 0', async () => {
          const dto = createDto({ [field]: '0' });
          const errors = await validate(dto);
          const fieldErrors = errors.filter((e) => e.property === field);
          expect(fieldErrors.length).toBeGreaterThan(0);
        });

        it('should reject numeric 6', async () => {
          const dto = createDto({ [field]: '6' });
          const errors = await validate(dto);
          const fieldErrors = errors.filter((e) => e.property === field);
          expect(fieldErrors.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('q12ConferenceLength', () => {
    const validValues = ['too_short', 'just_right', 'too_long', 'unsure'];

    it('should accept all valid values', async () => {
      for (const value of validValues) {
        const dto = createDto({ q12ConferenceLength: value });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q12ConferenceLength');
        expect(fieldErrors).toHaveLength(0);
      }
    });

    it('should reject invalid values', async () => {
      const dto = createDto({ q12ConferenceLength: 'perfect' });
      const errors = await validate(dto);
      const fieldErrors = errors.filter((e) => e.property === 'q12ConferenceLength');
      expect(fieldErrors.length).toBeGreaterThan(0);
      expect(fieldErrors[0].constraints?.isIn).toBe(
        'q12ConferenceLength must be too_short, just_right, too_long, or unsure',
      );
    });

    it('should reject camelCase variants', async () => {
      const dto = createDto({ q12ConferenceLength: 'tooShort' });
      const errors = await validate(dto);
      const fieldErrors = errors.filter((e) => e.property === 'q12ConferenceLength');
      expect(fieldErrors.length).toBeGreaterThan(0);
    });
  });

  describe('q16Improvements', () => {
    const validValues = ['yes_clear', 'some', 'no_changes', 'not_sure', 'did_not_attend', 'first_conference'];

    it('should accept all valid values', async () => {
      for (const value of validValues) {
        const dto = createDto({ q16Improvements: value });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q16Improvements');
        expect(fieldErrors).toHaveLength(0);
      }
    });

    it('should reject invalid values', async () => {
      const dto = createDto({ q16Improvements: 'yes' });
      const errors = await validate(dto);
      const fieldErrors = errors.filter((e) => e.property === 'q16Improvements');
      expect(fieldErrors.length).toBeGreaterThan(0);
      expect(fieldErrors[0].constraints?.isIn).toBe(
        'q16Improvements must be yes_clear, some, no_changes, not_sure, did_not_attend, or first_conference',
      );
    });

    it('should reject values not in enum', async () => {
      const invalidValues = ['better_than_last', 'worse', 'same', 'YES_CLEAR'];
      for (const value of invalidValues) {
        const dto = createDto({ q16Improvements: value });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q16Improvements');
        expect(fieldErrors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('q18EmploymentStatus', () => {
    const validValues = ['employee', 'active_associate', 'alumni_associate', 'client', 'prefer_not'];

    it('should accept all valid values', async () => {
      for (const value of validValues) {
        const dto = createDto({ q18EmploymentStatus: value });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q18EmploymentStatus');
        expect(fieldErrors).toHaveLength(0);
      }
    });

    it('should reject invalid values', async () => {
      const dto = createDto({ q18EmploymentStatus: 'contractor' });
      const errors = await validate(dto);
      const fieldErrors = errors.filter((e) => e.property === 'q18EmploymentStatus');
      expect(fieldErrors.length).toBeGreaterThan(0);
      expect(fieldErrors[0].constraints?.isIn).toBe(
        'q18EmploymentStatus must be employee, active_associate, alumni_associate, client, or prefer_not',
      );
    });

    it('should reject uppercase variants', async () => {
      const dto = createDto({ q18EmploymentStatus: 'EMPLOYEE' });
      const errors = await validate(dto);
      const fieldErrors = errors.filter((e) => e.property === 'q18EmploymentStatus');
      expect(fieldErrors.length).toBeGreaterThan(0);
    });
  });

  describe('Array fields', () => {
    describe('q4ConnectionTypes', () => {
      it('should accept string arrays', async () => {
        const dto = createDto({ q4ConnectionTypes: ['colleagues', 'clients'] });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q4ConnectionTypes');
        expect(fieldErrors).toHaveLength(0);
      });

      it('should accept empty arrays', async () => {
        const dto = createDto({ q4ConnectionTypes: [] });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q4ConnectionTypes');
        expect(fieldErrors).toHaveLength(0);
      });

      it('should reject non-array values', async () => {
        const dto = createDto({ q4ConnectionTypes: 'colleagues' as unknown as string[] });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q4ConnectionTypes');
        expect(fieldErrors.length).toBeGreaterThan(0);
      });
    });

    describe('q17FeedbackConfidence', () => {
      it('should accept string arrays', async () => {
        const dto = createDto({ q17FeedbackConfidence: ['public_summary', 'action_plan'] });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q17FeedbackConfidence');
        expect(fieldErrors).toHaveLength(0);
      });

      it('should accept empty arrays', async () => {
        const dto = createDto({ q17FeedbackConfidence: [] });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q17FeedbackConfidence');
        expect(fieldErrors).toHaveLength(0);
      });
    });
  });

  describe('Object fields', () => {
    describe('q11SessionRankings', () => {
      it('should accept valid objects', async () => {
        const dto = createDto({
          q11SessionRankings: { workshops: 1, presentations: 2, panels: 3 },
        });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q11SessionRankings');
        expect(fieldErrors).toHaveLength(0);
      });

      it('should accept empty objects', async () => {
        const dto = createDto({ q11SessionRankings: {} });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q11SessionRankings');
        expect(fieldErrors).toHaveLength(0);
      });

      it('should reject non-object values', async () => {
        const dto = createDto({
          q11SessionRankings: 'not an object' as unknown as Record<string, number>,
        });
        const errors = await validate(dto);
        const fieldErrors = errors.filter((e) => e.property === 'q11SessionRankings');
        expect(fieldErrors.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Optional fields', () => {
    it('should allow all fields to be undefined', async () => {
      const dto = createDto({});
      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should allow string comment fields', async () => {
      const dto = createDto({
        q1Comment: 'Great event',
        q2Comment: 'Would definitely return',
        q3Comment: 'Useful coworking day',
      });
      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });
});
