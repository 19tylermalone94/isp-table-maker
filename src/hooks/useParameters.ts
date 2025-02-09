import { useReducer } from 'react';
import { Parameter, Characteristic, Partition } from '../types/types';

type State = {
  parameters: Parameter[];
};

type Action =
  | { type: 'SET_PARAMETERS'; payload: Parameter[] }
  | { type: 'ADD_PARAMETER' }
  | { type: 'UPDATE_PARAMETER'; payload: { id: number; updated: Partial<Parameter> } }
  | { type: 'DELETE_PARAMETER'; payload: { id: number } }
  | { type: 'ADD_CHARACTERISTIC'; payload: { parameterId: number } }
  | { type: 'UPDATE_CHARACTERISTIC'; payload: { parameterId: number; characteristicId: number; updated: Partial<Characteristic> } }
  | { type: 'DELETE_CHARACTERISTIC'; payload: { parameterId: number; characteristicId: number } }
  | { type: 'ADD_PARTITION'; payload: { parameterId: number; characteristicId: number } }
  | { type: 'UPDATE_PARTITION'; payload: { parameterId: number; characteristicId: number; partitionId: number; updated: Partial<Partition> } }
  | { type: 'DELETE_PARTITION'; payload: { parameterId: number; characteristicId: number; partitionId: number } };

const initialState: State = {
  parameters: [],
};

function parametersReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PARAMETERS': {
      return { ...state, parameters: action.payload };
    }
    case 'ADD_PARAMETER': {
      const newParameter: Parameter = {
        id: Date.now(),
        name: '',
        characteristics: [],
      };
      return { ...state, parameters: [...state.parameters, newParameter] };
    }
    case 'UPDATE_PARAMETER': {
      const { id, updated } = action.payload;
      return {
        ...state,
        parameters: state.parameters.map((param) =>
          param.id === id ? { ...param, ...updated } : param,
        ),
      };
    }
    case 'DELETE_PARAMETER': {
      const { id } = action.payload;
      return {
        ...state,
        parameters: state.parameters.filter((param) => param.id !== id),
      };
    }
    case 'ADD_CHARACTERISTIC': {
      const { parameterId } = action.payload;
      return {
        ...state,
        parameters: state.parameters.map((param) =>
          param.id === parameterId
            ? {
                ...param,
                characteristics: [
                  ...param.characteristics,
                  { id: Date.now(), name: '', partitions: [] },
                ],
              }
            : param,
        ),
      };
    }
    case 'UPDATE_CHARACTERISTIC': {
      const { parameterId, characteristicId, updated } = action.payload;
      return {
        ...state,
        parameters: state.parameters.map((param) =>
          param.id === parameterId
            ? {
                ...param,
                characteristics: param.characteristics.map((char) =>
                  char.id === characteristicId ? { ...char, ...updated } : char,
                ),
              }
            : param,
        ),
      };
    }
    case 'DELETE_CHARACTERISTIC': {
      const { parameterId, characteristicId } = action.payload;
      return {
        ...state,
        parameters: state.parameters.map((param) =>
          param.id === parameterId
            ? {
                ...param,
                characteristics: param.characteristics.filter(
                  (char) => char.id !== characteristicId,
                ),
              }
            : param,
        ),
      };
    }
    case 'ADD_PARTITION': {
      const { parameterId, characteristicId } = action.payload;
      return {
        ...state,
        parameters: state.parameters.map((param) =>
          param.id === parameterId
            ? {
                ...param,
                characteristics: param.characteristics.map((char) =>
                  char.id === characteristicId
                    ? {
                        ...char,
                        partitions: [
                          ...char.partitions,
                          { id: Date.now(), name: '', value: '' },
                        ],
                      }
                    : char,
                ),
              }
            : param,
        ),
      };
    }
    case 'UPDATE_PARTITION': {
      const { parameterId, characteristicId, partitionId, updated } =
        action.payload;
      return {
        ...state,
        parameters: state.parameters.map((param) =>
          param.id === parameterId
            ? {
                ...param,
                characteristics: param.characteristics.map((char) =>
                  char.id === characteristicId
                    ? {
                        ...char,
                        partitions: char.partitions.map((part) =>
                          part.id === partitionId
                            ? { ...part, ...updated }
                            : part,
                        ),
                      }
                    : char,
                ),
              }
            : param,
        ),
      };
    }
    case 'DELETE_PARTITION': {
      const { parameterId, characteristicId, partitionId } = action.payload;
      return {
        ...state,
        parameters: state.parameters.map((param) =>
          param.id === parameterId
            ? {
                ...param,
                characteristics: param.characteristics.map((char) =>
                  char.id === characteristicId
                    ? {
                        ...char,
                        partitions: char.partitions.filter(
                          (part) => part.id !== partitionId,
                        ),
                      }
                    : char,
                ),
              }
            : param,
        ),
      };
    }
    default:
      return state;
  }
}

export const useParameters = () => {
  const [state, dispatch] = useReducer(parametersReducer, initialState);

  const setParameters = (parameters: Parameter[]) =>
    dispatch({ type: 'SET_PARAMETERS', payload: parameters });

  const addParameter = () => dispatch({ type: 'ADD_PARAMETER' });
  const updateParameter = (id: number, updated: Partial<Parameter>) =>
    dispatch({ type: 'UPDATE_PARAMETER', payload: { id, updated } });
  const deleteParameter = (id: number) =>
    dispatch({ type: 'DELETE_PARAMETER', payload: { id } });
  const addCharacteristic = (parameterId: number) =>
    dispatch({ type: 'ADD_CHARACTERISTIC', payload: { parameterId } });
  const updateCharacteristic = (
    parameterId: number,
    characteristicId: number,
    updated: Partial<Characteristic>,
  ) =>
    dispatch({
      type: 'UPDATE_CHARACTERISTIC',
      payload: { parameterId, characteristicId, updated },
    });
  const deleteCharacteristic = (
    parameterId: number,
    characteristicId: number,
  ) =>
    dispatch({
      type: 'DELETE_CHARACTERISTIC',
      payload: { parameterId, characteristicId },
    });
  const addPartition = (parameterId: number, characteristicId: number) =>
    dispatch({
      type: 'ADD_PARTITION',
      payload: { parameterId, characteristicId },
    });
  const updatePartition = (
    parameterId: number,
    characteristicId: number,
    partitionId: number,
    updated: Partial<Partition>,
  ) =>
    dispatch({
      type: 'UPDATE_PARTITION',
      payload: { parameterId, characteristicId, partitionId, updated },
    });
  const deletePartition = (
    parameterId: number,
    characteristicId: number,
    partitionId: number,
  ) =>
    dispatch({
      type: 'DELETE_PARTITION',
      payload: { parameterId, characteristicId, partitionId },
    });

  return {
    parameters: state.parameters,
    setParameters, // 🔥 New function to set the entire parameter list
    addParameter,
    updateParameter,
    deleteParameter,
    addCharacteristic,
    updateCharacteristic,
    deleteCharacteristic,
    addPartition,
    updatePartition,
    deletePartition,
  };
};
