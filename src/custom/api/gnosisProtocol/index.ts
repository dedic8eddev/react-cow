export type { UnsupportedToken, OrderID, OrderMetaData } from './api'
import * as realApi from './api'
import * as mockApi from './mock'

const useMock = process.env.REACT_APP_MOCK === 'true'

// Re-exporting the result, mocked or not.
// Unfortunately, did not find a way to export
// a mix of mock/real implementations
// without manually naming the exports
export const {
  // functions that have a mock
  getAppDataDoc,
  uploadAppDataDoc,
  // functions that do not have a mock
  getOrderLink = realApi.getOrderLink,
  sendSignedOrder = realApi.sendSignedOrder,
  sendSignedOrderCancellation = realApi.sendSignedOrderCancellation,
  getPriceQuote = realApi.getPriceQuote,
  getFeeQuote = realApi.getFeeQuote,
  getOrder = realApi.getOrder,
  // functions that only have a mock
} = useMock ? { ...mockApi } : { ...realApi }
