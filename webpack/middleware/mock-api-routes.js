const mockApirouterConfig = {
  '/v1/navigator/trips\\?delay=.*&risk=.*&horizon=.*&org=.*&team=.*':
    './mocks/bookings.json',
  '/v1/navigator/trips\\?org=.*&team=.*&flightid=.*': './mocks/bookings.json',
  '/v1/navigator/userinfo': './mocks/userinfo.json',
  '/v1/navigator/tripDetails': './mocks/tripDetails.json',
  '/v1/navigator/flights/search?.*': './mocks/flightSearch.json',
  '/v1/navigator/flights/.*': './mocks/flight.json',
  '/v1/navigator/messages\\?delay=.*&risk=.*&horizon=.*&org=.*&team=.*':
    './mocks/queues.json',
  '/v1/navigator/messages': './mocks/queues.json',
  '/v1/navigator/events/.*': './mocks/events.json',
  '/v1/navigator/traveler/.*': './mocks/traveler.json',
  '/v1/navigator/groups/.*': './mocks/traveler.json',
  '/v1/navigator/summarystats\\?org=.*&team=.*': './mocks/summaryStats.json',
  '/v1/navigator/search\\?org=.*&team=.*&search_text=.*':
    './mocks/searchData.json',
  '/v1/navigator/summarystats\\?org=.*&team=.*&groupBy=.*':
    './mocks/summaryStats.json',
  '/v1/navigator/airports': './mocks/airports.json',
  '/v1/navigator/airlines': './mocks/airlines.json',
  '/v1/navigator/destination': './mocks/destination.json',
  '/v1/navigator/waiver/.*': './mocks/waiver.json',
};
module.exports = mockApirouterConfig;
