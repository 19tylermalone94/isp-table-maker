const sampleParameters = [
  {
    id: 1001,
    name: 'Weapon',
    characteristics: [
      {
        id: 1101,
        name: 'Damage',
        partitions: [
          {
            id: 1201,
            name: '0',
            value: '0',
          },
          {
            id: 1202,
            name: '1-10',
            value: '5',
          },
          {
            id: 1203,
            name: '> 10',
            value: '15',
          },
        ],
        basePartitionId: 1202,
      },
      {
        id: 1102,
        name: 'Weight',
        partitions: [
          {
            id: 1211,
            name: '0-2 kg',
            value: '1.5',
          },
          {
            id: 1212,
            name: '3-4 kg',
            value: '3.5',
          },
          {
            id: 1213,
            name: '> 4 kg',
            value: '5',
          },
        ],
        basePartitionId: 1212,
      },
    ],
  },
  {
    id: 2001,
    name: 'Shield',
    characteristics: [
      {
        id: 2101,
        name: 'Defense',
        partitions: [
          {
            id: 2201,
            name: '0',
            value: '0',
          },
          {
            id: 2202,
            name: '1-5',
            value: '3',
          },
          {
            id: 2203,
            name: '> 5',
            value: '7',
          },
        ],
        basePartitionId: 2202,
      },
      {
        id: 2102,
        name: 'Durability',
        partitions: [
          {
            id: 2211,
            name: '0-50%',
            value: '25',
          },
          {
            id: 2212,
            name: '51-75%',
            value: '63',
          },
          {
            id: 2213,
            name: '76-100%',
            value: '88',
          },
        ],
        basePartitionId: 2212,
      },
    ],
  },
];

export default sampleParameters;
