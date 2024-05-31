import { type AbstractAddress, type JsonAbi, Contract } from 'fuels';
import type { FunctionNames, InputsForFunctionName } from 'src/types';

import { useNamedQuery } from '../core/useNamedQuery';
import { QUERY_KEYS } from '../utils';

import { abi as _abi } from './abi-ex';
import { useProvider } from './useProvider';

export const useContractRead = <
  TAbi extends JsonAbi,
  TFunctionName extends FunctionNames<TAbi>
>({address, abi, functionName, args, contract: _contract}: {
  address: AbstractAddress; 
  abi: TAbi; 
  functionName: TFunctionName;
  args: InputsForFunctionName<TAbi, TFunctionName>;
  contract?: never;
} | {
  abi?: never;
  address?: undefined;
  contract: Contract;
  functionName: TFunctionName;
  args: InputsForFunctionName<TAbi, TFunctionName>;
}) => {
  const { provider } = useProvider();
  const chainId = provider?.getChainId();

  return useNamedQuery('contract', {
    queryKey: QUERY_KEYS.contract((_contract?.id || address || '')?.toString(), chainId, args?.toString()),
    queryFn: async () => {
      if (!provider || !chainId) {
        throw new Error('Provider and chainId are required to read the contract');
      };
      if (!_contract && (!address || !abi)) {
        throw new Error('Either contract or address and abi are required to read the contract');
      }
      const contract = _contract || new Contract(address, abi, provider);
      
      const wouldWriteToStorage = Object.values(contract.interface.functions).find((f) => f.name === functionName)?.attributes?.find((attr) => attr.name === 'storage')?.arguments?.includes('write');

      if (wouldWriteToStorage) {
        throw new Error('Methods that write to storage should not be called with useContractRead');
      }

      if (!contract?.functions?.[functionName]) {
        throw new Error(`Function ${functionName || ''} not found on contract`);
      }
      
      return contract.functions[functionName](args);
    },
    enabled: !!provider && !!chainId,
   }
   )
};
