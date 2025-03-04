import {getRandomArrayElement} from '../utils/common.js';

const mockPoints = [
  {
    id: 'ab11c7ec-63d2-4e49-bb4e-f000db081e9f',
    basePrice: 6284,
    dateFrom: '2025-02-11T09:46:12.970Z',
    dateTo: '2025-02-12T08:12:12.970Z',
    destination: '24514db9-cd07-4129-a377-8c6bd73d2e99',
    isFavorite: true,
    offers: [
      'b8681284-e9c9-4b79-b14b-e33b0acc7591',
      'b892f09d-d7c1-43d5-bb61-c320125af75d'
    ],
    type: 'drive'
  },
  {
    id: '754792f7-52a1-4a8a-93a6-7ce14ca86c14',
    basePrice: 3890,
    dateFrom: '2025-02-13T06:46:12.970Z',
    dateTo: '2025-02-14T12:13:12.970Z',
    destination: 'a8f0f30d-f243-45d0-af43-8d663a40712d',
    isFavorite: false,
    offers: [
      '1108cac6-d5e7-48ec-aebd-2e213444b1ee'
    ],
    type: 'check-in'
  },
  {
    id: 'bc3c49dd-9f9c-426a-ae6d-5f1f6237c35e',
    basePrice: 9509,
    dateFrom: '2025-02-15T03:07:12.970Z',
    dateTo: '2025-02-15T10:44:12.970Z',
    destination: '22fdb8aa-6682-4f67-a2c4-3ba172eeede9',
    isFavorite: true,
    offers: [
      '4406d403-df60-4ede-bc53-cdb424cc40f1'
    ],
    type: 'train'
  },
  {
    id: '5f5d0057-7442-451f-bb14-1041cf12674b',
    basePrice: 6618,
    dateFrom: '2025-02-16T17:02:12.970Z',
    dateTo: '2025-02-17T04:45:12.970Z',
    destination: '24514db9-cd07-4129-a377-8c6bd73d2e99',
    isFavorite: false,
    offers: [
      '70b8b20a-aee2-4716-93a8-6090e90aaa5f',
      'f5ecc997-833b-4794-8a19-c9bf61830e15',
      'a3ebdd4e-9021-43be-ae41-6ba5b1a2c8c7'
    ],
    type: 'bus'
  },
  {
    id: '02a1a91f-d8d7-4f60-8a8b-f0ad309d5298',
    basePrice: 8736,
    dateFrom: '2025-02-17T13:12:12.970Z',
    dateTo: '2025-02-18T05:41:12.970Z',
    destination: '24514db9-cd07-4129-a377-8c6bd73d2e99',
    isFavorite: false,
    offers: [
      'b1bd6cc2-51ce-42b2-99f5-9df12a7f97f9',
      'f91cfb4a-c241-4e22-8bf1-e5e8ab4bb222',
      'c5424871-ab68-48e9-95ae-da33312cb24d',
      'f0484591-cfda-45c8-9286-c222d8e1b701',
      '2fcaf275-8d86-4eb4-b4d8-e12f8c07edf3'
    ],
    type: 'ship'
  },
  {
    id: 'a22a4304-5d7a-436e-83b3-e4e52c5b0987',
    basePrice: 3075,
    dateFrom: '2025-02-20T01:38:12.970Z',
    dateTo: '2025-02-21T07:31:12.970Z',
    destination: '22fdb8aa-6682-4f67-a2c4-3ba172eeede9',
    isFavorite: true,
    offers: [
      '70b8b20a-aee2-4716-93a8-6090e90aaa5f',
      'f5ecc997-833b-4794-8a19-c9bf61830e15',
      'a3ebdd4e-9021-43be-ae41-6ba5b1a2c8c7'
    ],
    type: 'bus'
  },
  {
    id: '848b6def-66dd-4a30-8bc7-868f308c558b',
    basePrice: 9889,
    dateFrom: '2025-02-22T01:34:12.970Z',
    dateTo: '2025-02-23T12:31:12.970Z',
    destination: '88aa152d-9bda-4d6c-b002-81a34dc7914e',
    isFavorite: false,
    offers: [
      'a3ebdd4e-9021-43be-ae41-6ba5b1a2c8c7'
    ],
    type: 'bus'
  },
  {
    id: '8dbbd41b-851d-4ce0-b791-e4c4b5ad9c0b',
    basePrice: 9609,
    dateFrom: '2025-02-23T20:06:12.970Z',
    dateTo: '2025-02-24T07:49:12.970Z',
    destination: '2c2eeb4d-8fe2-4852-ba52-ad3afdf22ca1',
    isFavorite: false,
    offers: [
      '471bf489-5102-4f18-a58e-69291145a936'
    ],
    type: 'flight'
  },
  {
    id: 'f19ad34d-fd8e-4924-88c3-41e1288fd8fd',
    basePrice: 9311,
    dateFrom: '2025-02-26T01:57:12.970Z',
    dateTo: '2025-02-27T23:52:12.970Z',
    destination: '88aa152d-9bda-4d6c-b002-81a34dc7914e',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '584f2b32-c787-4711-8455-e32cfe5322e6',
    basePrice: 8060,
    dateFrom: '2025-02-28T19:39:12.970Z',
    dateTo: '2025-03-02T17:31:12.970Z',
    destination: '4d516e51-d32e-4fee-9c3c-31024699e7c3',
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '99658020-6d08-43fc-bca9-385caf33ebcb',
    basePrice: 2653,
    dateFrom: '2025-03-03T12:47:12.970Z',
    dateTo: '2025-03-04T13:58:12.970Z',
    destination: 'dd43c534-f518-48c1-b3cd-fb4b7b2f787e',
    isFavorite: true,
    offers: [
      'cdd79f71-1520-4b85-9135-98f009f4a5d6',
      'd44375b4-467b-4111-a86e-11a1f6e209a5',
      '6e77caf0-e083-497d-9b05-226272a3c557'
    ],
    type: 'taxi'
  },
  {
    id: '12e7ea0d-e79f-4f3a-8da9-9261eddd4e5b',
    basePrice: 6690,
    dateFrom: '2025-03-06T06:48:12.970Z',
    dateTo: '2025-03-07T06:11:12.970Z',
    destination: '88aa152d-9bda-4d6c-b002-81a34dc7914e',
    isFavorite: true,
    offers: [
      '34adc3d6-9d70-4f96-ad91-5fb75a3a6e6d',
      'f1a1984c-c1a7-4a8d-883d-5c8fcdb2fc84',
      '7daefd03-2d9a-4143-9419-ebba3b2247fd',
      'b75c96ec-f12f-403b-91be-abc0110b643f',
      '1108cac6-d5e7-48ec-aebd-2e213444b1ee'
    ],
    type: 'check-in'
  },
  {
    id: '1b830b3b-ff20-4674-8b0f-c3214cfbae73',
    basePrice: 7284,
    dateFrom: '2025-03-08T16:42:12.970Z',
    dateTo: '2025-03-10T13:09:12.970Z',
    destination: '88aa152d-9bda-4d6c-b002-81a34dc7914e',
    isFavorite: false,
    offers: [],
    type: 'taxi'
  },
  {
    id: '1a0e0ffd-0b1b-4779-bff8-6ca0a32af658',
    basePrice: 3362,
    dateFrom: '2025-03-12T00:38:12.970Z',
    dateTo: '2025-03-13T07:12:12.970Z',
    destination: '24514db9-cd07-4129-a377-8c6bd73d2e99',
    isFavorite: false,
    offers: [
      '6e77caf0-e083-497d-9b05-226272a3c557'
    ],
    type: 'taxi'
  },
  {
    id: '9e8ce435-52f2-40b6-b6f6-10e5b73ba3dc',
    basePrice: 7708,
    dateFrom: '2025-03-13T16:25:12.970Z',
    dateTo: '2025-03-14T19:39:12.970Z',
    destination: '22fdb8aa-6682-4f67-a2c4-3ba172eeede9',
    isFavorite: true,
    offers: [
      'b892f09d-d7c1-43d5-bb61-c320125af75d'
    ],
    type: 'drive'
  },
  {
    id: '6102fd03-5945-4cdf-9045-cc8034827077',
    basePrice: 8632,
    dateFrom: '2025-03-16T06:31:12.970Z',
    dateTo: '2025-03-17T13:30:12.970Z',
    destination: '88aa152d-9bda-4d6c-b002-81a34dc7914e',
    isFavorite: true,
    offers: [],
    type: 'bus'
  },
  {
    id: '00ab297b-0e95-49a5-b671-542ee80b8b56',
    basePrice: 1569,
    dateFrom: '2025-03-18T11:21:12.970Z',
    dateTo: '2025-03-19T09:25:12.970Z',
    destination: '22fdb8aa-6682-4f67-a2c4-3ba172eeede9',
    isFavorite: false,
    offers: [],
    type: 'train'
  },
  {
    id: '00362c5a-5c49-4f32-8ecd-7fda767c5c08',
    basePrice:  4101,
    dateFrom: '2025-03-20T09:33:12.970Z',
    dateTo: '2025-03-21T17:57:12.970Z',
    destination: 'a8f0f30d-f243-45d0-af43-8d663a40712d',
    isFavorite: true,
    offers: [],
    type: 'check-in'
  },
  {
    id: 'a6b37366-b464-4756-9a68-34c3e34d80ae',
    basePrice: 8463,
    dateFrom: '2025-03-23T00:15:12.970Z',
    dateTo: '2025-03-24T00:26:12.970Z',
    destination: '22fdb8aa-6682-4f67-a2c4-3ba172eeede9',
    isFavorite: false,
    offers: [
      '471bf489-5102-4f18-a58e-69291145a936'
    ],
    type: 'flight'
  },
  {
    id: 'b42ff727-a449-4e22-bf89-2334d73f739e',
    basePrice: 6184,
    dateFrom: '2025-03-25T10:12:12.970Z',
    dateTo: '2025-03-27T06:18:12.970Z',
    destination: '24514db9-cd07-4129-a377-8c6bd73d2e99',
    isFavorite: false,
    offers: [
      'd5d70b4c-27bf-4680-9f8c-07e02f10b16e',
      '1ef388a5-0a48-4e27-957f-6e265c8c3958',
      'cdd79f71-1520-4b85-9135-98f009f4a5d6',
      'd44375b4-467b-4111-a86e-11a1f6e209a5',
      '6e77caf0-e083-497d-9b05-226272a3c557'
    ],
    type: 'taxi'
  },
  {
    id: 'a716774c-e921-4ede-bc6e-5c3c49a09d37',
    basePrice: 5781,
    dateFrom: '2025-03-28T03:31:12.970Z',
    dateTo: '2025-03-29T17:57:12.970Z',
    destination: '88aa152d-9bda-4d6c-b002-81a34dc7914e',
    isFavorite: false,
    offers: [
      'f50debc7-c76f-425b-bf31-edd84c5877ad',
      'd64143b4-9527-4470-8ed1-5290d589b96b',
      '0e87c0f3-7abc-4ba4-b4c8-e8774c6b86b0',
      '3968d985-0310-490e-a0c7-f49f5f0b07a1',
      '471bf489-5102-4f18-a58e-69291145a936'
    ],
    type: 'flight'
  },
  {
    id: '01288957-597b-4926-a545-b3506d792081',
    basePrice: 8592,
    dateFrom: '2025-03-31T02:56:12.970Z',
    dateTo: '2025-04-02T02:12:12.970Z',
    destination: 'a8f0f30d-f243-45d0-af43-8d663a40712d',
    isFavorite: false,
    offers: [
      'b1bd6cc2-51ce-42b2-99f5-9df12a7f97f9',
      'f91cfb4a-c241-4e22-8bf1-e5e8ab4bb222',
      'c5424871-ab68-48e9-95ae-da33312cb24d',
      'f0484591-cfda-45c8-9286-c222d8e1b701',
      '2fcaf275-8d86-4eb4-b4d8-e12f8c07edf3'
    ],
    type: 'ship'
  },
  {
    id: '0f705908-1a03-4e67-baa6-5791e3dcc1fc',
    basePrice: 4241,
    dateFrom: '2025-04-02T15:01:12.970Z',
    dateTo: '2025-04-03T23:53:12.970Z',
    destination: '4d516e51-d32e-4fee-9c3c-31024699e7c3',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '26e2447f-f49d-412b-a983-35c0f7770dad',
    basePrice: 698,
    dateFrom: '2025-04-05T20:55:12.970Z',
    dateTo: '2025-04-07T05:36:12.970Z',
    destination: '22fdb8aa-6682-4f67-a2c4-3ba172eeede9',
    isFavorite: true,
    offers: [],
    type: 'train'
  },
  {
    id: '7415e8ca-88eb-43a5-b6d1-dec78f489322',
    basePrice: 39,
    dateFrom: '2025-04-07T23:11:12.970Z',
    dateTo: '2025-04-09T21:34:12.970Z',
    destination: '24514db9-cd07-4129-a377-8c6bd73d2e99',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  }
];

function getRandomPoints() {
  return getRandomArrayElement(mockPoints);
}
export {getRandomPoints};
