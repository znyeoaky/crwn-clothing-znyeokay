import { Category } from './categories.types';
import { AnyAction } from "redux";

import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure} from "../../store/categories/categories.action";

export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoryState => {
  if(fetchCategoriesStart.match(action)){
    return { ...state, isLoading: true };
  }
  if(fetchCategoriesSuccess.match(action)){
    return { ...state, isLoading: false, categories: action.payload };
  }
  if(fetchCategoriesFailure.match(action)){
    return { ...state, isLoading: false, error: action.payload };
  }
  return state;


  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return {...state, isLoading: true };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return { ...state, isLoading: false, categories: action.payload };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return { ...state, isLoading: false, error: action.payload };
  //   default:
  //     return state;
  // }
};
