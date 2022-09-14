import { parse } from 'yaml';
import * as path from 'path';
import * as fs from 'fs';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 可以根据传入都变量名获取对应的配置
export const getConfig = (type?: string) => {
  const environment = getEnv();
  // process.cwd()是指当前node命令执行时所在的文件夹目录
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  // 对给定的yaml stream，生成一个events序列。
  const config = parse(file);
  if (type) {
    return config[type];
  }
  return config;
};
