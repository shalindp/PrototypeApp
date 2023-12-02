import { BadRequestResponse } from '../../api/app/client';

const GENERIC_ERROR = 'Sorry, something went wrong. Please try again.';

export const parseError = (badRequestResponse: BadRequestResponse) => {
   try {
      if (badRequestResponse && badRequestResponse.validationResult?.errorMessage) {
         return badRequestResponse.validationResult.errorMessage;
      } else {
         return GENERIC_ERROR;
      }
   } catch (e) {
      return GENERIC_ERROR;
   }
};