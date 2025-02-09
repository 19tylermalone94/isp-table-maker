export type Partition = {
  id: number;
  name: string;
  value: string;
};

export type Characteristic = {
  id: number;
  basePartitionId?: number;
  name: string;
  partitions: Partition[];
};

export type Parameter = {
  id: number;
  name: string;
  characteristics: Characteristic[];
};
