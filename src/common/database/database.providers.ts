import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from 'src/utils/index';
const path = require('path');

// 设置数据库类型  options- 用于创建此数据源的选项
const databaseType: DataSourceOptions['type'] = 'mongodb';

// 获取数据库的配置
const { MONGODB_CONFIG } = getConfig();

const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  type: databaseType,
  entities: [
    // 这个属性配置代表，会以entity.ts结尾的实例类，都会被自动扫描识别，并在数据库中生成对应都实体表
    // 想使用mysql又想用自动注册这个功能都话。一定要区分后缀名，不然会出现混乱注册都情况
    path.join(__dirname, `../../**/*.${MONGODB_CONFIG.entities}.entity{.ts}`),
  ],
};

const MONGODB_DATA_SOURCE = new DataSource(MONGODB_DATABASE_CONFIG);

// 我们需要做的第一步是使用从 typeorm 包导入的 createConnection() 函数建立与数据库的连接。
// createConnection() 函数返回一个 Promise，因此我们必须创建一个异步提供者。

// 数据库注入
// 异步提供者,useFactory 工厂函数
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      // initialize- 初始化数据源并打开到数据库的连接池。
      await MONGODB_DATA_SOURCE.initialize();

      // isInitialized 指示 DataSource 是否已初始化并且与数据库的初始连接/连接池是否已建立。
      const isInitialized: boolean = MONGODB_DATA_SOURCE.isInitialized;
      if (isInitialized) {
        console.log('数据库已建立连接' + isInitialized);
      } else {
        console.log('数据库连接失败' + isInitialized);
      }
      return MONGODB_DATA_SOURCE;
    },
  },
];
