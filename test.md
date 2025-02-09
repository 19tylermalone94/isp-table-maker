| Parameter   | Characteristic | Partition | Value  |
| ----------- | -------------- | --------- | ------ |
| description | null           | true      | null   |
|             |                | false     | "asd"  |
|             | length         | 0         | ""     |
|             |                | 1         | "a"    |
|             |                | > 0       | "aa"   |
| workers     | null           | true      | null   |
|             |                | false     | []     |
|             | length         | 0         | []     |
|             |                | 1         | [a]    |
|             |                | > 1       | [a, b] |
