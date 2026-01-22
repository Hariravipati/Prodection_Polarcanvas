import { apiClient } from '../services/apiClient'

export const fetchAddressTypes = () => apiClient.get('/api/MasterData/AddressTypes', undefined, {})
