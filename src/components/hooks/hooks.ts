import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, TodosDispatch } from "../../store";

export const useTodosSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTodosDispatch: () => TodosDispatch = useDispatch